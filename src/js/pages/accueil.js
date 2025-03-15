document.addEventListener("DOMContentLoaded", function () {

    function waitForTitle() {
        const title = document.getElementById("animated-title");

        if (!title) {
            console.warn("⏳ Attente de #animated-title...");
            setTimeout(waitForTitle, 500); 
            return;
        }

        const text = title.innerText;
        title.innerText = "";

        let i = 0;
        function typeEffect() {
            if (i < text.length) {
                title.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeEffect, 100);
            }
        }
        typeEffect();
    }

    waitForTitle();
});

document.addEventListener("DOMContentLoaded", function () {

    function verifierElements() {
        const ideeTitre = document.getElementById("idee-titre");
        const ideeDescription = document.getElementById("idee-description");

        if (!ideeTitre || !ideeDescription) {
            console.warn("⏳ Attente des éléments HTML de l'idée du jour...");
            setTimeout(verifierElements, 500); 
            return;
        }

        afficherIdeeDuJour();
    }

    function afficherIdeeDuJour() {
        const ideeTitre = document.getElementById("idee-titre");
        const ideeDescription = document.getElementById("idee-description");
        const ideeContainer = document.querySelector(".idee-jour");

        const idees = [
            { titre: "Essayez une nouvelle recette italienne 🍝", description: "Pourquoi ne pas cuisiner des pâtes maison ce soir ?" },
            { titre: "Organisez un dîner à thème 🌎", description: "Choisissez une cuisine du monde et préparez un menu spécial." },
            { titre: "Découvrez un dessert original 🍰", description: "Essayez une recette de cheesecake japonais ou de mochi." },
            { titre: "Cuisinez en famille 👨‍👩‍👧‍👦", description: "Préparez un plat ensemble pour un moment convivial." },
            { titre: "Expérimentez avec des épices 🌶️", description: "Ajoutez du peps à vos plats en testant de nouvelles saveurs." },
            { titre: "Préparez un brunch maison 🥐", description: "Crêpes, œufs brouillés, smoothie… Faites-vous plaisir !" },
            { titre: "Testez un plat végétarien 🥗", description: "Remplacez la viande par des protéines végétales pour un repas sain." },
            { titre: "Faites du batch cooking 🍱", description: "Préparez plusieurs repas à l'avance pour gagner du temps." }
        ];

        const ideeAleatoire = idees[Math.floor(Math.random() * idees.length)];

        ideeTitre.textContent = ideeAleatoire.titre;
        ideeDescription.textContent = ideeAleatoire.description;

        setTimeout(() => {
            ideeContainer.classList.add("visible");
        }, 500);
    }

    verifierElements(); 
});





