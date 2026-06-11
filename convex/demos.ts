import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { internal } from "./_generated/api";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("demos").order("desc").collect();
  },
});

export const getByStatus = query({
  args: { status: v.union(v.literal("pending"), v.literal("reviewed"), v.literal("accepted"), v.literal("rejected")) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("demos")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .collect();
  },
});

export const create = mutation({
  args: {
    artistName: v.string(),
    email: v.string(),
    demoUrl: v.optional(v.string()),
    audioFileUrl: v.optional(v.string()),
    bio: v.string(),
    status: v.optional(v.union(
      v.literal("pending"),
      v.literal("reviewed"),
      v.literal("accepted"),
      v.literal("rejected"),
    )),
  },
  handler: async (ctx, args) => {
    const demoId = await ctx.db.insert("demos", {
      artistName: args.artistName,
      email: args.email,
      demoUrl: args.demoUrl,
      audioFileUrl: args.audioFileUrl,
      bio: args.bio,
      status: args.status ?? "pending",
    });

    await ctx.scheduler.runAfter(0, internal.emails.sendDemoNotification, {
      artistName: args.artistName,
      email: args.email,
      bio: args.bio,
    });

    return demoId;
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("demos"),
    status: v.union(v.literal("pending"), v.literal("reviewed"), v.literal("accepted"), v.literal("rejected")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const remove = mutation({
  args: { id: v.id("demos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
