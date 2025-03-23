// src/js/components/recipe.card.js

export const RecipeCard = (recipes) => {
  const container = document.getElementById("recipes-container");
  container.innerHTML = "";

  recipes.forEach((recipe) => {
    // Valeurs par défaut
    const title = recipe.title || "Titre inconnu";
    // Pour l'extrait, on peut utiliser les 100 premiers caractères de instructions
    const instructionsExcerpt = recipe.instructions
      ? recipe.instructions.substring(0, 100) + "..."
      : "Aucune instruction disponible.";
    
    // Création de la carte
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("col-md-4", "mt-3");

    cardDiv.innerHTML = `
      <div class="recipe-card p-3 shadow-sm bg-white rounded">
        <h4>${title}</h4>
        <p class="small">${instructionsExcerpt}</p>
        <button class="btn btn-primary mt-2 btn-see-more">
          Voir la recette
        </button>
      </div>
    `;
    container.appendChild(cardDiv);

    // Ajouter un listener pour ouvrir la modale
    const btn = cardDiv.querySelector(".btn-see-more");
    btn.addEventListener("click", () => {
      // On prépare un objet avec les données nécessaires
      const recipeData = {
        title: title,
        instructions: recipe.instructions || "Aucune instruction disponible.",
        // Convertir la chaîne ingredients en tableau en la scindant sur le caractère "|"
        ingredients: recipe.ingredients ? recipe.ingredients.split("|") : [],
        servings: recipe.servings || ""
      };

      showRecipeDetails(recipeData);

      // Ouvrir la modale avec Bootstrap
      const modalEl = document.getElementById("recipeModal");
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    });
  });
};

// Fonction globale pour remplir la modale avec les données d'une recette
window.showRecipeDetails = (recipe) => {
  document.getElementById("recipeModalLabel").textContent = recipe.title;
  document.getElementById("recipeInstructions").textContent = recipe.instructions;

  const ingredientsContainer = document.getElementById("recipeIngredients");
  ingredientsContainer.innerHTML = "";

  if (recipe.ingredients.length > 0) {
    recipe.ingredients.forEach((ing) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = ing.trim();
      ingredientsContainer.appendChild(li);
    });
  } else {
    ingredientsContainer.innerHTML = "<li class='list-group-item'>Aucun ingrédient listé.</li>";
  }

  // Afficher les servings (si disponibles)
  const servingsEl = document.getElementById("recipeServings");
  servingsEl.textContent = recipe.servings ? `For ${recipe.servings}` : "";
};
