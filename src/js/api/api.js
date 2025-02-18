export class ApiRequest {
  constructor() {
    this.recipe = "https://api.api-ninjas.com/v1/recipe?query=";
    this.apiKey = "bXAr028/UExb8LVXSVb7Ig==eFlQjjW3i5fxPH8m";
  }

  async fetchData(query) {
    try {
      const response = await axios.get(this.recipe + query, {
        headers: { "X-Api-Key": this.apiKey },
      });

      return response.data && response.data.length > 0 ? response.data : null;
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      return null;
    }
  }
}
