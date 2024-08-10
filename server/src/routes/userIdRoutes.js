import express from 'express';
import { checkToken } from '../middleware/checkToken.js';
import { getUserId } from '../controller/userIdController.js';
import cors from 'cors';

const router = express.Router();
router.use(express.json());
router.use(cors());

router.get("/user/:id",checkToken,getUserId);

export default router;