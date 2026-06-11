import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/demos", (req, res) => {
    const { artistName, email, demoUrl, bio } = req.body;
    console.log("Demo submitted:", { artistName, email, demoUrl, bio });
    // In a real app, this would save to a database
    res.json({ success: true, message: "Demo submitted successfully!" });
  });

  app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    console.log("Contact form submittion:", { name, email, message });
    res.json({ success: true, message: "Message sent successfully!" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
