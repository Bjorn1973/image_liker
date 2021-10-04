import "../css/style.scss";
import { httpClient } from "./helpers";

/**
 * VARS
 */

const searchField = document.getElementById("searchbar");
const form = document.querySelector("form");
const cardTemplate = document.querySelector("template").innerHTML;
const grid = document.getElementById("cards");
const loader = document.querySelector(".loading");

/**
 * EVENTS
 */
function showLoader() {
  grid.innerHTML = "";
  loader.style.display = "block";
  grid.style.display = "none";
  searchfield.disabled = true;
}

function stopLoader() {
  loader.style.display = "none";
  grid.style.display = "block";
  searchfield.disabled = false;
}

form.onsubmit = function (e) {
  e.preventDefault();
  showLoader;
  const { value } = searchField;
  if (value.length > 2) {
    httpClient(`/search/photos?&query=${value}`).then((response) => {
      grid.innerHTML = response.data.results
        .map((unsplashObj) =>
          cardTemplate
            .replace("#CARD_IMAGE_URL", unsplashObj.urls.thumb)
            // .replace("#CARD_PROFILE",)
            .replaceAll("#CARD_TEXT", unsplashObj.alt_description)
        )
        .join("");
    });
  }
  stopLoader;
};
