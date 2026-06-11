import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { internal } from "./_generated/api";

const TOKEN_EXPIRY_MS = 15 * 60 * 1000;
const ADMIN_EMAILS = ["riderezzy.gg@gmail.com", "riderezzy@gmail.com"];

async function hashPassword(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export const sendMagicLink = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const token = crypto.randomUUID();
    const expiresAt = Date.now() + TOKEN_EXPIRY_MS;

    await ctx.db.insert("magicLinkTokens", { email: args.email, token, expiresAt });
    await ctx.scheduler.runAfter(0, internal.emails.sendMagicLink, { email: args.email, token });
  },
});

export const verifyMagicLink = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const doc = await ctx.db
      .query("magicLinkTokens")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (!doc) {
      throw new Error("Invalid or expired magic link.");
    }
    if (Date.now() > doc.expiresAt) {
      await ctx.db.delete(doc._id);
      throw new Error("Magic link has expired.");
    }

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", doc.email))
      .first();

    let user = existingUser;
    let isNewUser = false;

    if (!user) {
      const role = ADMIN_EMAILS.includes(doc.email) ? "admin" : "user";
      const userId = await ctx.db.insert("users", {
        email: doc.email,
        role,
        emailVerified: true,
      });
      user = await ctx.db.get(userId);
      isNewUser = true;
    } else if (!user.emailVerified) {
      await ctx.db.patch(user._id, { emailVerified: true });
    }

    if (ADMIN_EMAILS.includes(doc.email) && user!.role !== "admin") {
      await ctx.db.patch(user!._id, { role: "admin" });
      user!.role = "admin";
    }

    await ctx.db.delete(doc._id);

    return { id: user!._id, email: user!.email, role: user!.role, isNewUser, name: user!.name };
  },
});

export const setPassword = mutation({
  args: {
    userId: v.id("users"),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const salt = crypto.randomUUID();
    const passwordHash = await hashPassword(args.password, salt);
    await ctx.db.patch(args.userId, { passwordHash, passwordSalt: salt });
  },
});

export const loginWithPassword = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user || !user.passwordHash || !user.passwordSalt) {
      throw new Error("Invalid email or password, or account has no password set.");
    }

    const hash = await hashPassword(args.password, user.passwordSalt);
    if (hash !== user.passwordHash) {
      throw new Error("Invalid email or password.");
    }

    if (ADMIN_EMAILS.includes(user.email) && user.role !== "admin") {
      await ctx.db.patch(user._id, { role: "admin" });
      user.role = "admin";
    }

    return { id: user._id, email: user.email, role: user.role, isNewUser: false, name: user.name };
  },
});
