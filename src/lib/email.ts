"use server";

import { z } from "zod";
import { formSchema } from "./schemas";
import { formSchemaMain } from "./schemasmain";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple contact form sender
export const send = async (emailFormData: z.infer<typeof formSchema>) => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY environment variable is not set");
  }
  if (!process.env.RESEND_FROM_EMAIL) {
    throw new Error("RESEND_FROM_EMAIL environment variable is not set");
  }
  if (!process.env.YOUR_EMAIL) {
    throw new Error("YOUR_EMAIL environment variable is not set");
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `Contact Form <${process.env.RESEND_FROM_EMAIL}>`,
      to: [process.env.YOUR_EMAIL],
      subject: `New Contact Form Submission from ${emailFormData.firstName} ${emailFormData.lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${emailFormData.firstName} ${emailFormData.lastName}</p>
        <p><strong>Email:</strong> ${emailFormData.email}</p>
        <p><strong>Message:</strong></p>
        <p>${emailFormData.message}</p>
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
export const sendConsultation = async (emailFormData: z.infer<typeof formSchemaMain>) => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY environment variable is not set");
  }
  if (!process.env.RESEND_FROM_EMAIL) {
    throw new Error("RESEND_FROM_EMAIL environment variable is not set");
  }
  if (!process.env.YOUR_EMAIL) {
    throw new Error("YOUR_EMAIL environment variable is not set");
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `Consultation Request <${process.env.RESEND_FROM_EMAIL}>`,
      to: [process.env.YOUR_EMAIL],
      subject: `New Consultation Request from ${emailFormData.name} - ${emailFormData.company}`,
      html: `
        <h2>New Technical Consultation Request</h2>
        
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${emailFormData.name}</p>
        <p><strong>Email:</strong> ${emailFormData.email}</p>
        <p><strong>Company:</strong> ${emailFormData.company}</p>
        <p><strong>Job Title:</strong> ${emailFormData.jobTitle}</p>
        
        <h3>Project Details</h3>
        <p><strong>Solution Interest:</strong> ${emailFormData.solutionInterest}</p>
        ${emailFormData.currentChallenge ? `<p><strong>Current Challenge:</strong> ${emailFormData.currentChallenge}</p>` : ''}
        ${emailFormData.existingSystems ? `<p><strong>Existing Systems:</strong> ${emailFormData.existingSystems}</p>` : ''}
        
        <h3>Project Description</h3>
        <p>${emailFormData.projectDetails.replace(/\n/g, '<br>')}</p>
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
