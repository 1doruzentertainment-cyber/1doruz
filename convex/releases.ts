import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("releases").order("desc").collect();
  },
});

export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("releases")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .collect();
  },
});

export const getByArtist = query({
  args: { artistId: v.id("artists") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("releases")
      .withIndex("by_artist", (q) => q.eq("artistId", args.artistId))
      .collect();
  },
});

export const getById = query({
  args: { id: v.id("releases") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    artistId: v.id("artists"),
    artistName: v.string(),
    releaseDate: v.string(),
    coverArtUrl: v.string(),
    type: v.union(v.literal("Single"), v.literal("EP"), v.literal("Album")),
    streamingLinks: v.object({
      spotify: v.optional(v.string()),
      appleMusic: v.optional(v.string()),
      youtube: v.optional(v.string()),
      soundcloud: v.optional(v.string()),
      beatport: v.optional(v.string()),
      bandcamp: v.optional(v.string()),
      tidal: v.optional(v.string()),
    }),
    featured: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("releases", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("releases"),
    title: v.optional(v.string()),
    artistId: v.optional(v.id("artists")),
    artistName: v.optional(v.string()),
    releaseDate: v.optional(v.string()),
    coverArtUrl: v.optional(v.string()),
    type: v.optional(v.union(v.literal("Single"), v.literal("EP"), v.literal("Album"))),
    streamingLinks: v.optional(v.object({
      spotify: v.optional(v.string()),
      appleMusic: v.optional(v.string()),
      youtube: v.optional(v.string()),
      soundcloud: v.optional(v.string()),
      beatport: v.optional(v.string()),
      bandcamp: v.optional(v.string()),
      tidal: v.optional(v.string()),
    })),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("releases") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
