import express from 'express';

import { postLogin, postRegister } from '../controller/authController.js';
import cors from 'cors';

const router = express.Router();
router.use(cors());

router.post('/auth/register',postRegister);
router.post('/auth/login',postLogin);


export default router;