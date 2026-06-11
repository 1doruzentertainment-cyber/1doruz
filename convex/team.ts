import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { internal } from "./_generated/api";

const TOKEN_EXPIRY_MS = 15 * 60 * 1000;

export const listMembers = query({
  args: { callerId: v.id("users") },
  handler: async (ctx, args) => {
    const caller = await ctx.db.get(args.callerId);
    if (!caller || caller.role !== "admin") {
      throw new Error("Only admins can view team members.");
    }
    return await ctx.db.query("users").collect();
  },
});

export const inviteMember = mutation({
  args: {
    callerId: v.id("users"),
    email: v.string(),
    role: v.union(v.literal("admin"), v.literal("user")),
  },
  handler: async (ctx, args) => {
    const caller = await ctx.db.get(args.callerId);
    if (!caller || caller.role !== "admin") {
      throw new Error("Only admins can invite members.");
    }

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!existingUser) {
      await ctx.db.insert("users", {
        email: args.email,
        role: args.role,
        emailVerified: false,
      });
    } else {
      await ctx.db.patch(existingUser._id, { role: args.role });
    }

    const token = crypto.randomUUID();
    const expiresAt = Date.now() + TOKEN_EXPIRY_MS;
    await ctx.db.insert("magicLinkTokens", { email: args.email, token, expiresAt });
    await ctx.scheduler.runAfter(0, internal.emails.sendMagicLink, { email: args.email, token });
  },
});

export const updateRole = mutation({
  args: {
    callerId: v.id("users"),
    userId: v.id("users"),
    role: v.union(v.literal("admin"), v.literal("user")),
  },
  handler: async (ctx, args) => {
    const caller = await ctx.db.get(args.callerId);
    if (!caller || caller.role !== "admin") {
      throw new Error("Only admins can change roles.");
    }
    await ctx.db.patch(args.userId, { role: args.role });
  },
});

export const removeMember = mutation({
  args: {
    callerId: v.id("users"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const caller = await ctx.db.get(args.callerId);
    if (!caller || caller.role !== "admin") {
      throw new Error("Only admins can remove members.");
    }
    if (args.callerId === args.userId) {
      throw new Error("You cannot remove yourself.");
    }
    await ctx.db.delete(args.userId);
  },
});
