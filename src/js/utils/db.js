import { ApiRequest } from "../api/api.js";

// gère la casse et les accents lors de la recherche
function normalizeText(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") 
    .toLowerCase(); 
}

export class Datastorage {
  constructor() {
    this.apiRequest = new ApiRequest();
    this.data = new Dexie("recipeDb");
    this.data.version(1).stores({
      recipes: "id++",
    });
    this.data.open();
    this.recipes = this.data.recipes;
  }
  async getRecipes() {
    try {
      return await this.recipes.toArray();
    } catch (error) {
      console.error("Erreur lors de la récupération des recettes :", error);
      return [];
    }
  }

  async getRecipeByName(name) {
    try {
      const recipes = await this.getRecipes();
      let recipe = recipes.filter((r) => normalizeText(r.tag) === normalizeText(name));


      if (recipe.length < 15) {
        const response = await this.apiRequest.fetchData(name);
        if (response && response.length > 0) {
          const formatRecipe = response.map((r, index) => ({
            ...r,
            id: r.id || recipes.length + index,
            tag: name,
          }));


          const missingRecipes = 15 - recipe.length;
          const limitedRecipes = formatRecipe.slice(0, missingRecipes);

          await this.recipes.bulkAdd(limitedRecipes);
          recipe = await this.getRecipes();
          recipe = recipe.filter((r) => r.tag.toLowerCase() === name);
        }
      }

      recipe = recipe.slice(0, 15);

      return recipe;
    } catch (error) {
      console.error("Erreur lors de la récupération de la recette :", error);
      return null;
    }
  }


}
