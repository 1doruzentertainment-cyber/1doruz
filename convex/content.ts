import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Artists
export const getArtists = query({
  handler: async (ctx) => {
    return await ctx.db.query("artists").collect();
  },
});

// Videos
export const getVideos = query({
  handler: async (ctx) => {
    return await ctx.db.query("videos").collect();
  },
});

// News
export const getNews = query({
  handler: async (ctx) => {
    return await ctx.db.query("news").order("desc").collect();
  },
});

export const addNews = mutation({
  args: {
    title: v.string(),
    date: v.string(),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("news", args);
  },
});

export const removeNews = mutation({
  args: { id: v.id("news") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
