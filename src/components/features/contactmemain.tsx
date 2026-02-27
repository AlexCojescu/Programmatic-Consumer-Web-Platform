"use client";

import { Button } from "@/components/contactui/button";
import { Card, CardContent } from "@/components/contactui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/contactui/form";
import { z } from 'zod';
import { sendConsultation } from "@/lib/email";
import { formSchemaMain } from "@/lib/schemasmain";
import { useState, useTransition } from "react";
import { Send } from "lucide-react";

export default function ContactFormMain() {
  const [isPending, startTransition] = useTransition();
  const [submissionStatus, setSubmissionStatus] = useState<{ success: boolean; message: string } | null>(null);

  const form = useForm<z.infer<typeof formSchemaMain>>({
    resolver: zodResolver(formSchemaMain),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      jobTitle: "",
      companySize: "",
      solutionInterest: "",
      currentChallenge: "",
      existingSystems: "",
      timeline: "",
      transactionVolume: "",
      projectDetails: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchemaMain>) {
    setSubmissionStatus(null);
    startTransition(async () => {
      try {
        await sendConsultation(values);
        setSubmissionStatus({ 
          success: true, 
          message: "Thank you! Our team will reach out within 24 hours to discuss your automation needs." 
        });
        form.reset();
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmissionStatus({ 
          success: false, 
          message: "Failed to send message. Please try again or email us directly." 
        });
      }
    });
  }

  return (
    <Card className="w-full border border-gray-100 bg-white shadow-xl hover:shadow-2xl transition-shadow">
      <CardContent className="px-3 sm:px-6 md:px-8 py-5 sm:py-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
            
            {/* Row 1: Name and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <input 
                          {...field}
                          id="name"
                          placeholder=" "
                          disabled={isPending}
                          className="peer h-11 sm:h-12 w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-1 text-sm text-gray-900 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                        />
                        <label 
                          htmlFor="name"
                          className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-700 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none"
                        >
                          Full Name <span className="text-red-500">*</span>
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <input 
                          {...field}
                          id="email"
                          type="email"
                          placeholder=" "
                          disabled={isPending}
                          className="peer h-11 sm:h-12 w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-1 text-sm text-gray-900 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                        />
                        <label 
                          htmlFor="email"
                          className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-700 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none"
                        >
                          Work Email <span className="text-red-500">*</span>
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs mt-1" />
                  </FormItem>
                )}
              />
            </div>

            {/* Row 2: Company and Job Title */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <input 
                          {...field}
                          id="company"
                          placeholder=" "
                          disabled={isPending}
                          className="peer h-11 sm:h-12 w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-1 text-sm text-gray-900 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                        />
                        <label 
                          htmlFor="company"
                          className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-700 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none"
                        >
                          Company
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <input 
                          {...field}
                          id="jobTitle"
                          placeholder=" "
                          disabled={isPending}
                          className="peer h-11 sm:h-12 w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-1 text-sm text-gray-900 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                        />
                        <label 
                          htmlFor="jobTitle"
                          className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-700 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none"
                        >
                          Job Title
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs mt-1" />
                  </FormItem>
                )}
              />
            </div>

            {/* Row 3: All 4 Dropdowns in 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
              {/* Company Size */}
              <FormField
                control={form.control}
                name="companySize"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <select 
                          {...field}
                          id="companySize"
                          disabled={isPending}
                          className="h-11 sm:h-12 w-full rounded-md border border-gray-300 bg-white px-3 pt-4 pb-1 text-sm text-gray-900 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 appearance-none transition-all"
                        >
                          <option value=""></option>
                          <option value="1-50">1-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-500">201-500 employees</option>
                          <option value="501-1000">501-1,000 employees</option>
                          <option value="1000+">1,000+ employees</option>
                        </select>
                        <label 
                          htmlFor="companySize"
                          className="absolute left-3 top-1 text-gray-700 text-xs transition-all duration-200 pointer-events-none"
                        >
                          Company Size
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

              {/* Primary Solution Interest */}
              <FormField
                control={form.control}
                name="solutionInterest"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <select 
                          {...field}
                          id="solutionInterest"
                          disabled={isPending}
                          className="h-11 sm:h-12 w-full rounded-md border border-gray-300 bg-white px-3 pt-4 pb-1 text-sm text-gray-900 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 appearance-none transition-all"
                        >
                          <option value=""></option>
                          <option value="workflow-automation">Digital Workflow Automation</option>
                          <option value="process-automation">Custom Process Automation</option>
                          <option value="chatbots">AI Chatbots & Conversational AI</option>
                          <option value="voice-agents">Voice Agents & IVR Systems</option>
                          <option value="rag-infrastructure">RAG Infrastructure & Knowledge Systems</option>
                          <option value="multi-solution">Multi-Solution Integration</option>
                          <option value="consultation">Not sure - need consultation</option>
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

              {/* Monthly Transaction Volume */}
              <FormField
                control={form.control}
                name="transactionVolume"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <select 
                          {...field}
                          id="transactionVolume"
                          disabled={isPending}
                          className="h-11 sm:h-12 w-full rounded-md border border-gray-300 bg-white px-3 pt-4 pb-1 text-sm text-gray-900 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 appearance-none transition-all"
                        >
                          <option value=""></option>
                          <option value="under-1k">Under 1,000</option>
                          <option value="1k-10k">1,000 - 10,000</option>
                          <option value="10k-100k">10,000 - 100,000</option>
                          <option value="100k-1m">100,000 - 1M</option>
                          <option value="over-1m">Over 1M</option>
                          <option value="not-applicable">Not applicable</option>
                        </select>
                        <label 
                          htmlFor="transactionVolume"
                          className="absolute left-3 top-1 text-gray-700 text-xs transition-all duration-200 pointer-events-none"
                        >
                          Monthly Transaction/Interaction Volume
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

              {/* Timeline */}
              <FormField
                control={form.control}
                name="timeline"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <select 
                          {...field}
                          id="timeline"
                          disabled={isPending}
                          className="h-11 sm:h-12 w-full rounded-md border border-gray-300 bg-white px-3 pt-4 pb-1 text-sm text-gray-900 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 appearance-none transition-all"
                        >
                          <option value=""></option>
                          <option value="immediate">Immediate (0-30 days)</option>
                          <option value="short-term">Short-term (1-3 months)</option>
                          <option value="mid-term">Mid-term (3-6 months)</option>
                          <option value="long-term">Long-term (6+ months)</option>
                          <option value="exploring">Exploring options</option>
                        </select>
                        <label 
                          htmlFor="timeline"
                          className="absolute left-3 top-1 text-gray-700 text-xs transition-all duration-200 pointer-events-none"
                        >
                          Timeline
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
            </div>

            {/* Row 4: Current Challenge (Full Width) */}
            <FormField
              control={form.control}
              name="currentChallenge"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <input 
                        {...field}
                        id="currentChallenge"
                        placeholder=" "
                        disabled={isPending}
                        className="peer h-11 sm:h-12 w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-1 text-sm text-gray-900 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                      />
                      <label 
                        htmlFor="currentChallenge"
                        className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-700 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none"
                      >
                        Current Challenge
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs mt-1" />
                </FormItem>
              )}
            />

            {/* Row 5: Existing Systems (Full Width) */}
            <FormField
              control={form.control}
              name="existingSystems"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <input 
                        {...field}
                        id="existingSystems"
                        placeholder=" "
                        disabled={isPending}
                        className="peer h-11 sm:h-12 w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-1 text-sm text-gray-900 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                      />
                      <label 
                        htmlFor="existingSystems"
                        className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-700 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none"
                      >
                        Existing Systems/Integrations
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs mt-1" />
                </FormItem>
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
                disabled={isPending}
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
