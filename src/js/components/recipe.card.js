export const RecipeCard = (recipes) => {
  const container = document.getElementById("recipes-container"); 
  container.innerHTML = "";
  for (const recipe of recipes) {
    const div = document.createElement("div"); 
    div.classList.add("col-md-4", "mt-3", "p-3");
    const innerHTML = `
            <div class="plat">${recipe.title}</div>
            <button class="btn btn-primary mt-2">See more</button>
`; 
    div.innerHTML = innerHTML;
    container.appendChild(div);
  }
};
