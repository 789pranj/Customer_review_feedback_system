import fs from "fs";
import path from "path";
import multer from "multer";
import dotenv from "dotenv";
import { GoogleGenAI, createUserContent, createPartFromUri } from "@google/genai";

dotenv.config();

// Setup upload folder
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Setup multer
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Controller
export const uploadAudio = [
  upload.single("audio"),
  async (req, res) => {
    try {
      const filePath = req.file.path;
      const mimeType = req.file.mimetype;

      // Upload to Gemini File API
      const uploadedFile = await ai.files.upload({
        file: filePath,
        config: { mimeType },
      });

      // Generate transcription
      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: createUserContent([
          createPartFromUri(uploadedFile.uri, uploadedFile.mimeType),
          "Generate a transcript of the speech.",
        ]),
      });


      console.log(result.text);
      
      // const text =
      //   result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      //   "No transcript found.";

      fs.unlinkSync(filePath); // Clean up file

      return res.status(200).json({text: result.text});
    } catch (error) {
      console.error("Gemini API error:", error?.response?.data || error.message);
      res.status(500).json({ error: "Failed to transcribe audio" });
    }
  },
];
