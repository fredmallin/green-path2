import express from "express";
import multer from "multer";
import { analyzeCrop } from "../controllers/cropController.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/scan", upload.single("image"), analyzeCrop);

export default router;