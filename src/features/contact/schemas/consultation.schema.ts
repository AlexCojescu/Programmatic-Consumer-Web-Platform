import { z } from "zod";

export const formSchemaMain = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid work email").max(254),
  company: z.string().max(100).optional(),
  jobTitle: z.string().max(100).optional(),
  solutionInterest: z.string().min(1, "Please select a solution").max(64),
  currentChallenge: z.string().max(500).optional(),
  existingSystems: z.string().max(500).optional(),
  projectDetails: z
    .string()
    .min(1, "Please tell us about your project")
    .max(5000),
});
