import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  },
});

export const add = mutation({
  args: {
    name: v.string(),
    price: v.number(),
    image: v.string(),
    category: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("products", args);
  },
});
