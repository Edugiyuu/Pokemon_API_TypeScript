import express from "express";

import User from '../models/User.js';
import { checkToken } from "../app.js";

const router = express.Router();
router.use(express.json());
// Adiciona ou remove favoritos
router.post("/user/:id/favorites", checkToken, async (req, res) => {
    const userId = req.params.id;
    const { favorite } = req.body;
  
    try {
      const user = await User.findById(userId);
  
      //verifica se o array já tem o pokemon e retorna true se tem, e false se não tem
      const Favorited = user.favorites.includes(favorite);
  
      //se já tem
      if (Favorited) {
        return res.status(400).json({ msg: 'Este Pokémon já está nos favoritos' });
      } else {
        
        user.favorites.push(favorite);
      }
  
      await user.save();
      res.status(200).json({ msg: 'Favoritos atualizados com sucesso', user });
    } catch (error) {
      res.status(500).json({ msg: 'Erro ao atualizar os favoritos', error });
    }
  });
  
  
  router.delete("/user/:id/favorites", checkToken, async (req, res) => {
    const userId = req.params.id;
    const { favorite } = req.body;
  
    try {
      const user = await User.findById(userId);
  
      //verifica se no array já tem o pokemon favorito e retorna true se tem, e false se não tem
      const Favorited = user.favorites.includes(favorite);
      //se não tem
      if (!Favorited) {
        return res.status(400).json({ msg: 'este Pokémon não está nos favoritos' });
      }
  
      const updatedFavorites = [];
      for (let i = 0; i < user.favorites.length; i++) {
          if (user.favorites[i] !== favorite) {
              updatedFavorites.push(user.favorites[i]);
          }
      }

      // atualiza o array de favoritos
      user.favorites = updatedFavorites;
      await user.save();
  
      res.status(200).json({ msg: 'Favorito removido com sucesso', user });
    } catch (error) {
      res.status(500).json({ msg: 'Erro ao remover o favorito', error });
    }
  });
  export default router;