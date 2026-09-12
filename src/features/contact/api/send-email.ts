"use server";

import { formSchemaMain } from "../schemas/consultation.schema";
import { assertRateLimit, RateLimitError } from "@/core/security/rate-limit";
import { assertSameOrigin } from "@/core/security/origin";
import { verifyTurnstile } from "@/core/security/turnstile";
import { getClientIdentifier } from "@/core/security/rate-limit";
import {
  escapeHtml,
  escapeHtmlMultiline,
  sanitizeEmailSubject,
} from "@/core/security/html-escape";
import { Resend } from "resend";
import { headers } from "next/headers";
import {
  getResendApiKey,
  getResendFromEmail,
  getYourEmail,
} from "@/core/env/env";

const GENERIC_FAILURE = "Failed to send message. Please try again later.";

let resendClient: Resend | null = null;

function getResend() {
  if (!resendClient) {
    resendClient = new Resend(getResendApiKey());
  }
  return resendClient;
}

function toClientError(error: unknown): never {
  if (error instanceof RateLimitError) {
    throw error;
  }

  if (
    error instanceof Error &&
    (error.message === "Invalid form data." ||
      error.message === "Please complete the verification challenge." ||
      error.message === GENERIC_FAILURE)
  ) {
    throw error;
  }

  console.error("Consultation send failed");
  throw new Error(GENERIC_FAILURE);
}

export const sendConsultation = async (input: unknown) => {
  try {
    await assertSameOrigin();
    await assertRateLimit("consultation-form");

    const parsed = formSchemaMain.safeParse(input);
    if (!parsed.success) {
      throw new Error("Invalid form data.");
    }

    const headerList = await headers();
    await verifyTurnstile(
      parsed.data.turnstileToken,
      getClientIdentifier(headerList)
    );

    const emailFormData = parsed.data;
    const fromEmail = getResendFromEmail();
    const toEmail = getYourEmail();

    const name = escapeHtml(emailFormData.name);
    const email = escapeHtml(emailFormData.email);
    const company = escapeHtml(emailFormData.company ?? "");
    const jobTitle = escapeHtml(emailFormData.jobTitle ?? "");
    const solutionInterest = escapeHtml(emailFormData.solutionInterest);
    const currentChallenge = emailFormData.currentChallenge
      ? escapeHtml(emailFormData.currentChallenge)
      : "";
    const existingSystems = emailFormData.existingSystems
      ? escapeHtml(emailFormData.existingSystems)
      : "";
    const projectDetails = escapeHtmlMultiline(emailFormData.projectDetails);

    const subjectCompany = emailFormData.company
      ? ` - ${sanitizeEmailSubject(emailFormData.company)}`
      : "";

    const { error } = await getResend().emails.send({
      from: `Consultation Request <${fromEmail}>`,
      to: [toEmail],
      subject: `New Consultation Request from ${sanitizeEmailSubject(emailFormData.name)}${subjectCompany}`,
      html: `
        <h2>New Technical Consultation Request</h2>
        
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Job Title:</strong> ${jobTitle}</p>
        
        <h3>Project Details</h3>
        <p><strong>Solution Interest:</strong> ${solutionInterest}</p>
        ${currentChallenge ? `<p><strong>Current Challenge:</strong> ${currentChallenge}</p>` : ""}
        ${existingSystems ? `<p><strong>Existing Systems:</strong> ${existingSystems}</p>` : ""}
        
        <h3>Project Description</h3>
        <p>${projectDetails}</p>
      `,
    });

    if (error) {
      console.error("Resend API error");
      throw new Error(GENERIC_FAILURE);
    }

    return { ok: true as const };
  } catch (error) {
    toClientError(error);
  }
};
