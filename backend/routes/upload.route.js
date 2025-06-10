import express from 'express';
import { uploadAudio } from '../controllers/upload.controller.js';

const router = express.Router();

router.post('/', uploadAudio);

export default router;
