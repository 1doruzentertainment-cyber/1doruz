import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Users
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
  },
});

export const createUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    password: v.string(),
    isAdmin: v.boolean(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
    if (existing) return existing._id;
    return await ctx.db.insert("users", args);
  },
});

export const updateUser = mutation({
  args: {
    id: v.id("users"),
    address: v.optional(v.string()),
    city: v.optional(v.string()),
    postalCode: v.optional(v.string()),
    country: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

// Orders
export const createOrder = mutation({
  args: {
    userId: v.id("users"),
    items: v.array(v.object({
      productId: v.id("products"),
      qty: v.number(),
      size: v.optional(v.string()),
    })),
    total: v.number(),
    status: v.string(),
    createdAt: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("orders", args);
  },
});

export const getOrders = query({
  handler: async (ctx) => {
    return await ctx.db.query("orders").order("desc").collect();
  },
});
