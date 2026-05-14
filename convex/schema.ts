import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    name: v.string(),
    price: v.number(),
    image: v.string(),
    category: v.string(), // "Music" | "Merch" | "Accessories"
    description: v.optional(v.string()),
  }),
  artists: defineTable({
    name: v.string(),
    image: v.string(),
    bio: v.string(),
    genre: v.string(),
  }),
  videos: defineTable({
    artist: v.string(),
    title: v.string(),
    image: v.string(),
    url: v.string(),
    lyrics: v.optional(v.array(v.object({
      time: v.number(),
      text: v.string(),
    }))),
  }),
  news: defineTable({
    title: v.string(),
    date: v.string(),
    image: v.optional(v.string()),
  }),
  users: defineTable({
    email: v.string(),
    name: v.string(),
    password: v.string(), // For simulated auth
    isAdmin: v.boolean(),
    address: v.optional(v.string()),
    city: v.optional(v.string()),
    postalCode: v.optional(v.string()),
    country: v.optional(v.string()),
  }).index("by_email", ["email"]),
  orders: defineTable({
    userId: v.id("users"),
    items: v.array(v.object({
      productId: v.id("products"),
      qty: v.number(),
      size: v.optional(v.string()),
    })),
    total: v.number(),
    status: v.string(), // "Pending" | "Shipped" | "Delivered"
    createdAt: v.string(),
  }),
});
