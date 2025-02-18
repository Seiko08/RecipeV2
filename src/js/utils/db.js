import { ApiRequest } from "../api/api.js";
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
      let recipe = recipes.filter((r) => r.tag.toLowerCase() === name);
      if (recipe.length <= 0) {
       
        const response = await this.apiRequest.fetchData(name); 
        if (response && response.length > 0) {
          const formatRecipe = response.map((r, index) => ({
            ...r, 
            id: r.id || recipes.length + index, 
            tag: name, 
          }));
          await this.recipes.bulkAdd(formatRecipe);
          recipe = formatRecipe;
        }
      }
      return recipe;
    } catch (error) {
      console.error("Erreur lors de la récupération de la recette :", error);
      return null;
    }
  }
}
