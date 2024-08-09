import User from '../models/User.js';

//lembrando que é a a mesma coisa que
//router.get("/user/:id/favorites", async (req, res) => {
// ou 
//app.get("/user/:id/favorites", async (req, res) => {
export const getFavorites = async (req, res) => {
  //pega o id no parametro
  const userId = req.params.id;

  try {
    //função do moongose que acha o ID do usuario pelo parametro da rota
    const user = await User.findById(userId);

    const favorites = user.favorites;

    res.status(200).json({ favorites });
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao obter os favoritos', error });
  }
};

//É a mesma coisa que
//router.post("/user/:id/favorites", checkToken, async (req, res) => {
export const addFavorite = async (req, res) => {
  const userId = req.params.id;
  const { favorite } = req.body;

  try {
    const user = await User.findById(userId);

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${favorite.name}`);
    const pokemonData = await response.json();

    console.log(pokemonData.sprites.other.home.front_default);
    console.log(pokemonData.types[0].type.name);

    for (let i = 0; i < pokemonData.types.length; i++) {
      console.log(pokemonData.types[i].type.name);
    }

    //verifica se o array de objetos do usuario se já tem o pokemon 
    for (let i = 0; i < user.favorites.length; i++) {
      //se já tem o pokemon..
      if (user.favorites[i].name === favorite.name) {
        return res.status(400).json({ msg: 'Este Pokémon já está nos favoritos', pokemonData });
      }

    }
    user.favorites.push({ name: favorite.name, img: pokemonData.sprites.other.home.front_default, types: pokemonData.types.map(typeInfo => typeInfo.type.name) });

    await user.save();
    res.status(200).json({ msg: 'Favoritos atualizados com sucesso', user });
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao atualizar os favoritos', error });
  }
};

//mesma coisa que
//router.delete("/user/:id/favorites", checkToken, async (req, res) => {
export const removeFavorite = async (req, res) => {
  //pega o id da rota
  const userId = req.params.id;

  const { favorite } = req.body;

  try {
    const user = await User.findById(userId);
    let favoriteFound = false;

    // percorre a lista de favoritos e remove o Pokémon se encontrar
    for (let i = 0; i < user.favorites.length; i++) {
      // se achar o mesmo nome..
      if (user.favorites[i].name === favorite.name) {
        // tira o nome igual
        user.favorites.splice(i, 1);
        favoriteFound = true;
        break;
      }
    }

    if (!favoriteFound) {
      return res.status(400).json({ msg: 'Este Pokémon não está nos favoritos' });
    }

    await user.save();

    res.status(200).json({ msg: 'Favorito removido com sucesso', user });
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao remover o favorito', error });
  }
};
