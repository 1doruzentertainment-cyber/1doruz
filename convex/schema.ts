import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const GENDERS = ["Electronic", "Soul", "Future Bass", "R&B", "Neo-Soul", "Trap", "Hip-Hop", "Industrial Techno", "Dream Pop", "Dark Ambient", "Retrowave", "Experimental"] as const;
export const RELEASE_TYPES = ["Single", "EP", "Album"] as const;
export const DEMO_STATUSES = ["pending", "reviewed", "accepted", "rejected"] as const;
export const GALLERY_TYPES = ["image", "video"] as const;

export default defineSchema({
  artists: defineTable({
    name: v.string(),
    bio: v.string(),
    imageUrl: v.string(),
    genres: v.array(v.string()),
    socialLinks: v.object({
      instagram: v.optional(v.string()),
      twitter: v.optional(v.string()),
      spotify: v.optional(v.string()),
      youtube: v.optional(v.string()),
      tiktok: v.optional(v.string()),
      facebook: v.optional(v.string()),
      soundcloud: v.optional(v.string()),
    }),
    bookingEmail: v.string(),
    featured: v.boolean(),
  })
    .index("by_featured", ["featured"])
    .index("by_name", ["name"]),

  releases: defineTable({
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
  })
    .index("by_artist", ["artistId"])
    .index("by_featured", ["featured"])
    .index("by_date", ["releaseDate"]),

  events: defineTable({
    title: v.string(),
    date: v.string(),
    location: v.string(),
    venue: v.string(),
    ticketLink: v.string(),
    imageUrl: v.string(),
  })
    .index("by_date", ["date"]),

  news: defineTable({
    title: v.string(),
    excerpt: v.string(),
    content: v.string(),
    imageUrl: v.string(),
    author: v.string(),
    publishedAt: v.string(),
  })
    .index("by_published", ["publishedAt"]),

  gallery: defineTable({
    type: v.union(v.literal("image"), v.literal("video")),
    url: v.string(),
    caption: v.string(),
  }),

  demos: defineTable({
    artistName: v.string(),
    email: v.string(),
    demoUrl: v.optional(v.string()),
    audioFileUrl: v.optional(v.string()),
    bio: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("reviewed"),
      v.literal("accepted"),
      v.literal("rejected"),
    ),
  })
    .index("by_status", ["status"])
    .index("by_email", ["email"]),

  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    subject: v.optional(v.string()),
    message: v.string(),
  }),

  users: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    role: v.union(v.literal("admin"), v.literal("user")),
    emailVerified: v.boolean(),
    passwordHash: v.optional(v.string()),
    passwordSalt: v.optional(v.string()),
  })
    .index("by_email", ["email"]),

  magicLinkTokens: defineTable({
    email: v.string(),
    token: v.string(),
    expiresAt: v.number(),
  })
    .index("by_token", ["token"])
    .index("by_email", ["email"]),

  siteConfig: defineTable({
    logoUrl: v.optional(v.string()),
    logoText: v.string(),
    primaryColor: v.string(),
    siteTitle: v.string(),
    siteDescription: v.string(),
  }),
});
