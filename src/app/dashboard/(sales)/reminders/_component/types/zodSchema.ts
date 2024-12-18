import { z } from "zod";

export const ReminderDiscussionSchema = z.object({
    discussion: z.string().min(1, "Discussion is required"),
  });
  
  export const reminderReminderSchema = z.object({
    reminderType: z.enum(["Call", "Follow_Up", "WhatsApp", "Email"]),
    dueDate: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "Due date must be in the format 'yyyy-MM-dd'."
      ),
    subject: z.string().min(1, "Subject is required."),
    body: z.string().min(1, "Body is required."),
  });