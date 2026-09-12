"use client";

import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Textarea } from "@/shared/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { z } from "zod";
import { formSchema } from "@/features/contact/schemas/contact.schema";
import { useState } from "react";
import { ContactTextField } from "@/features/contact/components/contact-text-field";

export default function ContactForm() {
  const isPending = false;
  const [submissionStatus, setSubmissionStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(_values: z.infer<typeof formSchema>) {
    setSubmissionStatus({
      success: false,
      message:
        "This form is retired. Use the consultation form on the contact page.",
    });
  }

  return (
    <Card className="mx-auto w-full max-w-xl rounded-3xl border border-neutral-200 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.16)] backdrop-blur-sm">
      <CardHeader className="px-5 pb-3 pt-6 text-center sm:px-8 sm:pt-7">
        <CardTitle className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Share a snapshot of your ops.
        </CardTitle>
        <CardDescription className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-neutral-700 sm:text-[0.95rem]">
          Tell us how your NMS, billing, CRM, and support are wired today, plus where tickets get
          stuck. We’ll review your note before the call so we can skip the generic discovery.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-5 pb-6 sm:px-8 sm:pb-7">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-5"
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <ContactTextField
                    label="First name"
                    placeholder="Alex"
                    field={field}
                    disabled={isPending}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <ContactTextField
                    label="Last name"
                    placeholder="Rivera"
                    field={field}
                    disabled={isPending}
                  />
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <ContactTextField
                  label="Work email"
                  placeholder="you@isp.com"
                  field={field}
                  disabled={isPending}
                />
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium text-neutral-700 sm:text-sm">
                    Briefly describe your stack & bottlenecks
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., NMS + Sonar + HubSpot, stuck tickets between install & billing, no single view of subscriber status…"
                      className="min-h-[140px] resize-none bg-white text-sm text-neutral-900 placeholder-neutral-400 border-neutral-200 focus:border-neutral-400 focus:ring-neutral-200 sm:min-h-[170px]"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {submissionStatus && (
              <div
                className={`text-xs sm:text-sm p-3 rounded-md ${
                  submissionStatus.success
                    ? "border border-emerald-100 bg-emerald-50 text-emerald-800"
                    : "border border-rose-100 bg-rose-50 text-rose-800"
                }`}
              >
                {submissionStatus.message}
              </div>
            )}

            <div className="flex flex-col items-center gap-2 pt-2 sm:flex-row sm:justify-between">
              <p className="text-[0.7rem] text-neutral-500 sm:text-xs">
                We’ll reply within one business day with next steps.
              </p>
              <Button
                type="submit"
                className="w-full rounded-full bg-neutral-900 px-6 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-black sm:w-auto sm:px-7 sm:py-2.5"
                disabled={isPending}
              >
                {isPending ? "Sending…" : "Send snapshot"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
