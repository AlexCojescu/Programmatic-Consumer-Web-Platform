import { z } from "zod";

export const SOLUTION_INTEREST_VALUES = [
  "workflow-automation",
  "process-automation",
  "chatbots",
  "voice-agents",
  "rag-infrastructure",
  "multi-solution",
  "consultation",
] as const;

export const SOLUTION_INTEREST_OPTIONS: {
  value: (typeof SOLUTION_INTEREST_VALUES)[number];
  label: string;
}[] = [
  { value: "workflow-automation", label: "Digital Workflow Automation" },
  { value: "process-automation", label: "Custom Process Automation" },
  { value: "chatbots", label: "AI Chatbots & Conversational AI" },
  { value: "voice-agents", label: "Voice Agents & IVR Systems" },
  {
    value: "rag-infrastructure",
    label: "RAG Infrastructure & Knowledge Systems",
  },
  { value: "multi-solution", label: "Multi-Solution Integration" },
  { value: "consultation", label: "Not sure - need consultation" },
];

export const formSchemaMain = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid work email").max(254),
  company: z.string().max(100).optional(),
  jobTitle: z.string().max(100).optional(),
  solutionInterest: z.enum(SOLUTION_INTEREST_VALUES, {
    errorMap: () => ({ message: "Please select a solution" }),
  }),
  currentChallenge: z.string().max(500).optional(),
  existingSystems: z.string().max(500).optional(),
  projectDetails: z
    .string()
    .min(1, "Please tell us about your project")
    .max(5000),
  turnstileToken: z.string().max(2048).optional(),
});

export type ConsultationFormValues = z.infer<typeof formSchemaMain>;
