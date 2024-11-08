const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.post("/save-segment", async (req, res) => {
  console.log("Received data:", req.body);
  const data = req.body;

  try {
    const fetch = await import("node-fetch");
    const response = await fetch.default(
      "https://webhook.site/bad71faa-86a3-4bce-b4c8-96d40fc024a3",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    const responseData =
      contentType && contentType.includes("application/json")
        ? await response.json()
        : await response.text(); // Fallback to text if not JSON

    res.json({ responseData });
  } catch (error) {
    console.error("Error saving segment:", error);
    res.status(500).json({ error: "Error saving segment" });
  }
});

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
