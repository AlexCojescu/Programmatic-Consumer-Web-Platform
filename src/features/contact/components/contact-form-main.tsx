"use client";

import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/form";
import { sendConsultation } from "@/features/contact/api/send-email";
import {
  formSchemaMain,
  SOLUTION_INTEREST_OPTIONS,
  type ConsultationFormValues,
} from "@/features/contact/schemas/consultation.schema";
import { useState, useTransition } from "react";
import { Send } from "lucide-react";
import { ContactFormRow } from "@/features/contact/components/contact-form-row";
import { FloatingLabelField } from "@/features/contact/components/floating-label-field";
import { TurnstileField } from "@/features/contact/components/turnstile-field";

const GENERIC_ERROR =
  "Failed to send message. Please try again or email us directly.";

const CLIENT_SAFE_ERRORS = new Set([
  "Too many submissions. Please wait a few minutes before trying again.",
  "Invalid form data.",
  "Please complete the verification challenge.",
  GENERIC_ERROR,
  "Failed to send message. Please try again later.",
]);

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

function clientErrorMessage(error: unknown): string {
  if (error instanceof Error && CLIENT_SAFE_ERRORS.has(error.message)) {
    return error.message;
  }
  return GENERIC_ERROR;
}

export default function ContactFormMain() {
  const [isPending, startTransition] = useTransition();
  const [challengeKey, setChallengeKey] = useState(0);
  const [submissionStatus, setSubmissionStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(formSchemaMain),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      jobTitle: "",
      solutionInterest: "" as ConsultationFormValues["solutionInterest"],
      currentChallenge: "",
      existingSystems: "",
      projectDetails: "",
      turnstileToken: "",
    },
  });

  async function onSubmit(values: ConsultationFormValues) {
    setSubmissionStatus(null);
    startTransition(async () => {
      try {
        await sendConsultation(values);
        setSubmissionStatus({
          success: true,
          message:
            "Thank you! Our team will reach out within 24 hours to discuss your automation needs.",
        });
        form.reset();
        setChallengeKey((key) => key + 1);
      } catch (error) {
        setSubmissionStatus({
          success: false,
          message: clientErrorMessage(error),
        });
        setChallengeKey((key) => key + 1);
      }
    });
  }

  return (
    <Card className="w-full border border-gray-100 bg-white shadow-xl hover:shadow-2xl transition-shadow">
      <CardContent className="px-3 sm:px-6 md:px-8 py-5 sm:py-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
            
            {/* Row 1: Name and Email */}
            <ContactFormRow>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FloatingLabelField
                    field={field}
                    id="name"
                    disabled={isPending}
                    label={<>Full Name <span className="text-red-500">*</span></>}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FloatingLabelField
                    field={field}
                    id="email"
                    type="email"
                    disabled={isPending}
                    label={<>Work Email <span className="text-red-500">*</span></>}
                  />
                )}
              />
            </ContactFormRow>

            {/* Row 2: Company and Job Title */}
            <ContactFormRow>
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FloatingLabelField
                    field={field}
                    id="company"
                    disabled={isPending}
                    label="Company"
                  />
                )}
              />
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FloatingLabelField
                    field={field}
                    id="jobTitle"
                    disabled={isPending}
                    label="Job Title"
                  />
                )}
              />
            </ContactFormRow>

            {/* Row 3: Primary Solution Interest (Full Width) */}
            <FormField
              control={form.control}
              name="solutionInterest"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <select 
                        {...field}
                        value={field.value ?? ""}
                        id="solutionInterest"
                        disabled={isPending}
                        className="h-11 sm:h-12 w-full rounded-md border border-gray-300 bg-white px-3 pt-4 pb-1 text-sm text-gray-900 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 appearance-none transition-all"
                      >
                        <option value=""></option>
                        {SOLUTION_INTEREST_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <label 
                        htmlFor="solutionInterest"
                        className="absolute left-3 top-1 text-gray-700 text-xs transition-all duration-200 pointer-events-none"
                      >
                        Primary Solution Interest <span className="text-red-500">*</span>
                      </label>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs mt-1" />
                </FormItem>
              )}
            />

            {/* Row 4: Current Challenge (Full Width) */}
            <FormField
              control={form.control}
              name="currentChallenge"
              render={({ field }) => (
                <FloatingLabelField
                  field={field}
                  id="currentChallenge"
                  disabled={isPending}
                  label={<>Current Challenge <span className="text-gray-400">*</span></>}
                />
              )}
            />

            {/* Row 5: Existing Systems (Full Width) */}
            <FormField
              control={form.control}
              name="existingSystems"
              render={({ field }) => (
                <FloatingLabelField
                  field={field}
                  id="existingSystems"
                  disabled={isPending}
                  label={<>Existing Systems/Integrations <span className="text-gray-400">*</span></>}
                />
              )}
            />

            {/* Row 6: Project Details (Full Width) */}
            <FormField
              control={form.control}
              name="projectDetails"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <textarea
                        {...field}
                        id="projectDetails"
                        placeholder=" "
                        disabled={isPending}
                        rows={4}
                        className="peer w-full rounded-md border border-gray-300 bg-white px-3 pt-6 pb-2 text-sm text-gray-900 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all"
                      />
                      <label 
                        htmlFor="projectDetails"
                        className="absolute left-3 top-4 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-700 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none"
                      >
                        Tell Us About Your Project <span className="text-red-500">*</span>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs mt-1" />
                </FormItem>
              )}
            />

            {TURNSTILE_SITE_KEY ? (
              <TurnstileField
                key={challengeKey}
                siteKey={TURNSTILE_SITE_KEY}
                onToken={(token) => form.setValue("turnstileToken", token)}
              />
            ) : process.env.NODE_ENV !== "production" ? (
              <p className="text-xs text-center text-gray-500">
                Bot verification is skipped in local development when
                NEXT_PUBLIC_TURNSTILE_SITE_KEY is unset.
              </p>
            ) : (
              <p className="text-xs text-center text-rose-700">
                This form is temporarily unavailable.
              </p>
            )}

            {/* Submission Status */}
            {submissionStatus && (
              <div className={`text-xs sm:text-sm p-3 sm:p-4 rounded-lg border-l-4 ${
                submissionStatus.success 
                  ? 'text-emerald-800 bg-emerald-50 border-emerald-500' 
                  : 'text-rose-800 bg-rose-50 border-rose-500'
              }`}>
                {submissionStatus.message}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-2">
              <Button 
                type="submit" 
                className="w-full sm:w-2/3 md:w-1/2 h-11 sm:h-12 text-sm sm:text-base font-semibold bg-gray-900 hover:bg-gray-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2" 
                disabled={
                  isPending ||
                  (process.env.NODE_ENV === "production" && !TURNSTILE_SITE_KEY)
                }
              >
                {isPending ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    <span className="hidden sm:inline">Sending...</span>
                    <span className="sm:hidden">Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span className="hidden sm:inline">Schedule Technical Consultation</span>
                    <span className="sm:hidden">Get Started</span>
                  </>
                )}
              </Button>
            </div>

            <p className="text-xs text-center text-gray-500 mt-3 sm:mt-4">
              We typically respond within 24 hours during business days
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
