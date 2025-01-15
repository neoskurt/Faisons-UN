// Insérez votre clé API
const API_KEY = "AIzaSyDWO3fzDHIRhB5WYH-SdnGQucZ1PxMibqM";
const SHEET_ID = "1ydX4qCt7za91olgGbsNwu_MiiP-vTbX70yedeHRi8yg";

// URL de l'API pour récupérer les données
const SHEET_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Feuille%201?key=${API_KEY}`;

// Gestion des erreurs globales
window.onerror = function (message, source, lineno, colno, error) {
  console.error(`Error: ${message} at ${source}:${lineno}:${colno}`);
  alert("Une erreur s'est produite. Veuillez vérifier la console pour plus de détails.");
  return true; // Empêche l'affichage de l'alerte native
};

document.addEventListener("DOMContentLoaded", function() {
  const portfolioContainer = document.querySelector(".portfolio-grids");

  // Vérifier si l'élément portfolio-grids existe avant de continuer
  if (!portfolioContainer) {
    console.error("L'élément portfolio-grids est introuvable.");
    return;
  }

  // Afficher un message de chargement pendant le processus
  portfolioContainer.innerHTML = "<div class='loading-spinner'>Chargement...</div>";

  // Fetch des données depuis Google Sheets
  fetch(SHEET_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const rows = data.values; // Récupère les lignes de la feuille

      portfolioContainer.innerHTML = ""; // Vidage du conteneur avant d'ajouter du contenu

      // Vérification des données reçues
      if (rows && rows.length > 1) {
        let gridItems = ''; // Variable pour stocker tous les éléments HTML

        rows.slice(1).forEach((row) => {
          const [Nom, Année, image, link] = row;

          // Créer un élément de portfolio avec les données de la feuille
          gridItems += `
            <div class="portfolio-item">
              <div class="kb-row-layout-wrap kb-row-layout-id14168_fbd7cb-a5 alignnone wp-block-kadence-rowlayout">
                <div class="kt-row-column-wrap kt-has-1-columns kt-row-layout-equal kt-tab-layout-inherit kt-mobile-layout-row kt-row-valign-top">
                  <div class="wp-block-kadence-column kadence-column14168_1ff967-5d">
                    <div class="kt-inside-inner-col">
                      <div class="kb-row-layout-wrap kb-row-layout-id14168_0c1eb1-c3 alignnone kt-row-has-bg corner animated fadeIn wp-block-kadence-rowlayout">
                        <div class="kt-row-layout-overlay kt-row-overlay-gradient"></div>
                        <div class="kt-row-column-wrap kt-has-1-columns kt-row-layout-equal kt-tab-layout-inherit kt-mobile-layout-row kt-row-valign-top">
                          <div class="wp-block-kadence-column kadence-column14168_8b2ddf-2f inner-column-1">
                            <div class="kt-inside-inner-col">
                              <div class="wp-block-kadence-advancedbtn kb-buttons-wrap kb-btns14168_7cb13d-84">
                                <a class="kb-button kt-button button kb-btn14168_feda5e-9d kt-btn-size-small kt-btn-width-type-auto kb-btn-global-outline kt-btn-has-text-false kt-btn-has-svg-true ktblocksvideopop animated fadeIn delay-200ms slow wp-block-kadence-singlebtn" href="${image}">
                                  <span class="kb-svg-icon-wrap kb-svg-icon-fe_play kt-btn-icon-side-right">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                      <polygon points="5 3 19 12 5 21 5 3" />
                                    </svg>
                                  </span>
                                </a>
                              </div>
                              <p class="kt-adv-heading14168_c8d33b-2e wp-block-kadence-advancedheading has-theme-palette-9-color has-text-color" data-kb-block="kb-adv-heading14168_c8d33b-2e">
                                ${Nom}
                              </p>
                              <p class="has-text-align-center has-theme-palette-9-color has-text-color has-link-color has-small-font-size wp-elements-d579fe7e06c249a8f15cca9f8b74263e" style="text-transform:uppercase">
                                ${Année}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
        });

        // Ajout des éléments générés au conteneur
        portfolioContainer.innerHTML = gridItems;

      } else {
        portfolioContainer.innerHTML = "<p>Aucune donnée à afficher.</p>";
      }
    })
    .catch((error) => {
      console.error("Erreur de chargement des données :", error);
      portfolioContainer.innerHTML = "<p>Erreur de chargement des données.</p>"; // Message d'erreur si problème
    });
});
