import { mutation } from "./_generated/server";
import { ARTISTS, PRODUCTS, VIDEOS } from "../src/constants";

export const seed = mutation({
  handler: async (ctx) => {
    // Clear existing (optional, but good for reset)
    const existingProducts = await ctx.db.query("products").collect();
    for (const p of existingProducts) await ctx.db.delete(p._id);
    
    const existingArtists = await ctx.db.query("artists").collect();
    for (const a of existingArtists) await ctx.db.delete(a._id);

    const existingVideos = await ctx.db.query("videos").collect();
    for (const v of existingVideos) await ctx.db.delete(v._id);

    // Seed Products
    for (const p of PRODUCTS) {
      await ctx.db.insert("products", {
        name: p.name,
        price: p.price,
        image: p.image,
        category: p.category,
        description: p.description
      });
    }

    // Seed Artists
    for (const a of ARTISTS) {
      await ctx.db.insert("artists", {
        name: a.name,
        image: a.image,
        bio: a.bio,
        genre: a.genre
      });
    }

    // Seed Videos
    for (const v of VIDEOS) {
      await ctx.db.insert("videos", {
        artist: v.artist,
        title: v.title,
        image: v.image,
        url: v.url,
        lyrics: v.lyrics
      });
    }

    // Seed Admin User
    await ctx.db.insert("users", {
      email: "admin@1doruz.com",
      name: "ADMIN",
      password: "admin",
      isAdmin: true
    });
  },
});
