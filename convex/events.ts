import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("events").order("desc").collect();
  },
});

export const getUpcoming = query({
  args: {},
  handler: async (ctx) => {
    const events = await ctx.db.query("events").collect();
    const now = new Date().toISOString();
    return events.filter((e) => e.date >= now).sort((a, b) => a.date.localeCompare(b.date));
  },
});

export const getById = query({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    date: v.string(),
    location: v.string(),
    venue: v.string(),
    ticketLink: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("events", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("events"),
    title: v.optional(v.string()),
    date: v.optional(v.string()),
    location: v.optional(v.string()),
    venue: v.optional(v.string()),
    ticketLink: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
