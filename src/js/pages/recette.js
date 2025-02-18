initModule = async () => {
  app.appDom.displayRecipeCard("italian");
  const searchButton = document.getElementById("search-button");
  const searchBar = document.getElementById("search-bar");

  if (searchButton) {
    searchButton.addEventListener("mouseover", function () {
      searchButton.style.transition = "transform 0.3s ease-in-out";
      searchButton.style.transform = "scale(1.2)";
    });

    searchButton.addEventListener("mouseout", function () {
      searchButton.style.transform = "scale(1)";
    });

    searchButton.addEventListener("click", async () => {
      const query = searchBar.value.trim();
      if (query) {
        app.appDom.displayRecipeCard(query);
      }
    });
  }
};
