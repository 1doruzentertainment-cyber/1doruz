import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("gallery").order("desc").collect();
  },
});

export const create = mutation({
  args: {
    type: v.union(v.literal("image"), v.literal("video")),
    url: v.string(),
    caption: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("gallery", args);
  },
});

export const remove = mutation({
  args: { id: v.id("gallery") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
