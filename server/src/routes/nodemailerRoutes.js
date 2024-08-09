import express from 'express';
import { postEmail} from '../controller/nodemailerController.js';
import cors from 'cors';

const router = express.Router();
router.use(express.json());
router.use(cors());

router.post('/send-email', postEmail);

export default router;