import express from 'express';

import { checkToken } from '../middleware/checkToken.js';
import { postLogin, postRegister } from '../controller/authController.js';
import { getUserId } from '../controller/userIdController.js';
import { getFavorites, addFavorite, removeFavorite } from '../controller/favoritesController.js';
import { postEmail} from '../controller/nodemailerController.js';
import {postForgotPassword,getResetPassword} from '../controller/resetPasswordController.js'
import cors from 'cors';

const router = express.Router();
router.use(express.json());
router.use(cors());

//---------------AuthRoutes-------------------
router.post('/auth/register',postRegister);
router.post('/auth/login',postLogin);
//--------------------------------------------

//-----------------UserId-------------------
router.get("/user/:id",checkToken,getUserId);
//------------------------------------------

//----------------Favorites------------------
router.get('/user/:id/favorites', getFavorites);
router.post('/user/:id/favorites', checkToken, addFavorite);
router.delete('/user/:id/favorites', checkToken, removeFavorite);
//-------------------------------------------


//--------------NodeMailer-------------------
router.post('/send-email', postEmail);
//-------------------------------------------

//--------------ResetPassword---------------
router.post('/forgot-password', postForgotPassword); 
router.get('/reset-password/:id/:token', getResetPassword); 
//--------------------------------------------
export default router;