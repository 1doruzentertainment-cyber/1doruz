import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const configs = await ctx.db.query("siteConfig").collect();
    return configs[0] ?? null;
  },
});

export const update = mutation({
  args: {
    callerId: v.id("users"),
    logoUrl: v.optional(v.string()),
    logoText: v.optional(v.string()),
    primaryColor: v.optional(v.string()),
    siteTitle: v.optional(v.string()),
    siteDescription: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const caller = await ctx.db.get(args.callerId);
    if (!caller || caller.role !== "admin") {
      throw new Error("Only admins can update site configuration.");
    }

    const { callerId, ...updates } = args;
    const cleaned = Object.fromEntries(
      Object.entries(updates).filter(([_, v]) => v !== undefined)
    );

    const configs = await ctx.db.query("siteConfig").collect();
    if (configs.length === 0) {
      await ctx.db.insert("siteConfig", {
        logoUrl: cleaned.logoUrl,
        logoText: cleaned.logoText ?? "1DORUZ",
        primaryColor: cleaned.primaryColor ?? "#C5A059",
        siteTitle: cleaned.siteTitle ?? "1DORUZ RECORDS",
        siteDescription: cleaned.siteDescription ?? "",
      });
    } else {
      await ctx.db.patch(configs[0]._id, cleaned);
    }
  },
});

export const generateUploadUrl = mutation({
  args: { callerId: v.id("users") },
  handler: async (ctx, args) => {
    const caller = await ctx.db.get(args.callerId);
    if (!caller || caller.role !== "admin") {
      throw new Error("Only admins can upload files.");
    }
    return await ctx.storage.generateUploadUrl();
  },
});

export const saveLogo = mutation({
  args: {
    callerId: v.id("users"),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const caller = await ctx.db.get(args.callerId);
    if (!caller || caller.role !== "admin") {
      throw new Error("Only admins can update the logo.");
    }
    const logoUrl = await ctx.storage.getUrl(args.storageId);
    if (!logoUrl) throw new Error("Failed to retrieve uploaded file URL.");

    const configs = await ctx.db.query("siteConfig").collect();
    if (configs.length === 0) {
      await ctx.db.insert("siteConfig", {
        logoUrl,
        logoText: "1DORUZ",
        primaryColor: "#C5A059",
        siteTitle: "1DORUZ RECORDS",
        siteDescription: "",
      });
    } else {
      await ctx.db.patch(configs[0]._id, { logoUrl });
    }
  },
});
