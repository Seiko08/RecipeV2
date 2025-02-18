import { AppDom } from "./dom.utils.js";
import { ApiRequest } from "../api/api.js";

export class AppPage {
  constructor() {
    this.cachePages = new Map(); 
    this.defaultPage = "accueil";
    this.appDom = new AppDom(document.querySelector("main")); 
    this.request = new ApiRequest();
  }


  async init() {
    location.href = `#${this.defaultPage}`; 
    await this.loadPage(this.defaultPage); 
    window.addEventListener("hashchange", async (e) => {
      
      const url = new URL(e.newURL); 
      const hash = url.hash.replace("#", ""); 
      if (hash) {
        
        await this.loadPage(hash); 
      }
    });
  }


  async loadPage(page) {
    
    if (this.cachePages.has(page)) {
      const cachedPage = this.cachePages.get(page); 
      this.appDom.updateContent(cachedPage.html); 
      try {
        if (cachedPage.script) {
          
          this.appDom.executeScript(cachedPage.script, page); 
        }
      } catch (error) {
        console.error(
          "Une erreur est survenue lors de l'exécution du script:",
          error
        );
      }
      return;
    }

    try {

      const htmlResponse = await axios.get(`src/pages/${page}.html`); 
      const scriptResponse = await axios
        .get(`src/js/pages/${page}.js`)
        .catch(() => null); 

      if (htmlResponse.status === 200) {
        const scriptContent = scriptResponse?.data || null;
        this.cachePages.set(page, {
          html: htmlResponse.data, 
          script: scriptContent, 
        });
        this.appDom.updateContent(htmlResponse.data); 

        try {
          if (scriptContent) {
            
            this.appDom.executeScript(scriptContent, page); 
          }
        } catch (error) {
          console.error(
            "Une erreur est survenue lors de l'exécution du script:",
            error
          );
        }
      }
    } catch (error) {
      console.error(`Erreur lors du chargement de la page '${page}':`, error);
      location.href = "#404";
    }
  }
}
