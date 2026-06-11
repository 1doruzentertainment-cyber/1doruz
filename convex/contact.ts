import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { internal } from "./_generated/api";

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    subject: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("contacts", args);

    await ctx.scheduler.runAfter(0, internal.emails.sendContactNotification, {
      name: args.name,
      email: args.email,
      message: args.message,
    });
  },
});
