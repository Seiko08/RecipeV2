import { Datastorage } from "./db.js";
import { RecipeCard } from "../components/recipe.card.js";
export class AppDom {
  constructor(appElement) {
    this.contentElement = appElement;
    this.storage = new Datastorage();
  }
  clearContent() {
    this.contentElement.innerHTML = "";
  }
  updateContent(html) {
    if (typeof html === "string") this.contentElement.innerHTML = html;
  }
  executeScript(scriptContent, page) {
    document
      .querySelectorAll(`[data-script="${page}"]`)
      .forEach((el) => el.remove());
    const scriptElement = document.createElement("script");
    scriptElement.textContent = scriptContent;
    scriptElement.setAttribute("data-script", page);
    document.body.appendChild(scriptElement);

    if (typeof initModule === "function") {
      initModule();
    }
  }
  async displayRecipeCard(search) {
    const recipes = await this.storage.getRecipeByName(search);
    if (recipes && recipes.length > 0) {
      RecipeCard(recipes);
    } else {
      console.warn("Aucune recette trouvée.");
    }
  }
}
