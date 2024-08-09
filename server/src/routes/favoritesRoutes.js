import express from 'express';
import { checkToken } from '../middleware/checkToken.js';
import { getFavorites, addFavorite, removeFavorite } from '../controller/favoritesController.js';
import cors from 'cors';

const router = express.Router();
router.use(express.json());
router.use(cors());

router.get('/user/:id/favorites', getFavorites);
router.post('/user/:id/favorites', checkToken, addFavorite);
router.delete('/user/:id/favorites', checkToken, removeFavorite);

export default router;