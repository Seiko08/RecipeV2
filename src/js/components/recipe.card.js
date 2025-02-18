export const RecipeCard = (recipes) => {
  const container = document.getElementById("recipes-container"); 
  container.innerHTML = "";

  for (const recipe of recipes) {
    const div = document.createElement("div"); 
    div.classList.add("col-md-4", "mt-3", "p-3");

    const innerHTML = `
      <div class="plat">${recipe.title}</div>
      <button class="btn btn-primary mt-2 see-more" data-id="${recipe.id}" 
        data-title="${recipe.title}" 
        data-ingredients="${recipe.ingredients}" 
        data-instructions="${recipe.instructions}" 
        data-bs-toggle="modal" data-bs-target="#recipeModal">
        See more
      </button>
    `; 

    div.innerHTML = innerHTML;
    container.appendChild(div);
  }

  // Gérer l'affichage des détails dans le modal
  document.querySelectorAll(".see-more").forEach(button => {
    button.addEventListener("click", function () {
      const title = this.getAttribute("data-title");
      const ingredients = this.getAttribute("data-ingredients");
      const instructions = this.getAttribute("data-instructions");

      // Mettre à jour le contenu du modal
      document.getElementById("modal-title").textContent = title;
      document.getElementById("modal-ingredients").textContent = ingredients;
      document.getElementById("modal-instructions").textContent = instructions;
    });
  });
};
