"use server";

import { formSchema } from "./schemas";
import { formSchemaMain } from "./schemasmain";
import { assertRateLimit } from "./rate-limit";
import {
  escapeHtml,
  escapeHtmlMultiline,
  sanitizeEmailSubject,
} from "./html-escape";
import { Resend } from "resend";
import { getResendApiKey, getResendFromEmail, getYourEmail } from "@/lib/env";

// Lazy Resend client so env is read at call time (no keys at module load).
function getResend() {
  return new Resend(getResendApiKey());
}

// Simple contact form sender
export const send = async (input: unknown) => {
  await assertRateLimit("contact-form");

  const parsed = formSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid form data.");
  }
  const emailFormData = parsed.data;

  getResendApiKey();
  getResendFromEmail();
  getYourEmail();

  const firstName = escapeHtml(emailFormData.firstName);
  const lastName = escapeHtml(emailFormData.lastName);
  const email = escapeHtml(emailFormData.email);
  const message = escapeHtmlMultiline(emailFormData.message);

  try {
    const { data, error } = await getResend().emails.send({
      from: `Contact Form <${getResendFromEmail()}>`,
      to: [getYourEmail()],
      subject: `New Contact Form Submission from ${sanitizeEmailSubject(emailFormData.firstName)} ${sanitizeEmailSubject(emailFormData.lastName)}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    if (error) {
      console.error("Resend API error:", error);
      throw new Error("Failed to send email. Please try again later.");
    }
    
    return data;

  } catch (e) {
    console.error("An unexpected error occurred:", e);
    throw new Error("An unexpected error occurred while sending the email.");
  }
};

// Advanced consultation form sender
export const sendConsultation = async (input: unknown) => {
  await assertRateLimit("consultation-form");

  const parsed = formSchemaMain.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid form data.");
  }
  const emailFormData = parsed.data;

  getResendApiKey();
  getResendFromEmail();
  getYourEmail();

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

  try {
    const { data, error } = await getResend().emails.send({
      from: `Consultation Request <${getResendFromEmail()}>`,
      to: [getYourEmail()],
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
      `
    });

    if (error) {
      console.error("Resend API error:", error);
      throw new Error("Failed to send email. Please try again later.");
    }
    
    return data;

  } catch (e) {
    console.error("An unexpected error occurred:", e);
    throw new Error("An unexpected error occurred while sending the email.");
  }
};
