import { z } from "zod";

export const formSchemaMain = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid work email"),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  solutionInterest: z.string().min(1, "Please select a solution"),
  currentChallenge: z.string().optional(),
  existingSystems: z.string().optional(),
  projectDetails: z.string().min(1, "Please tell us about your project"),
});
