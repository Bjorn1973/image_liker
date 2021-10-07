import "../css/style.scss";
import { httpClient, preloadImage, preloadImages } from "./helpers";

/**
 * VARS
 */

const searchField = document.getElementById("searchbar");
const form = document.querySelector("form");
const cardTemplate = document.querySelector("template").innerHTML;
const grid = document.getElementById("cards");
const loader = document.querySelector(".loader");

/**
 * EVENTS
 */

form.onsubmit = async function (e) {
  e.preventDefault();
  const { value } = searchField;
  if (value.length > 2) {
    const response = await httpClient(`/search/photos?&query=${value}`);
    loader.classList.add("loading");
    searchField.disabled = true;
    await preloadImages(
      response.data.results.map((unsplashObj) => unsplashObj.urls.thumb)
    );
    loader.classList.remove("loading");
    searchField.disabled = false;
    searchField.value = "";
    grid.innerHTML = response.data.results
      .map((unsplashObj) =>
        cardTemplate
          .replace("#CARD_IMAGE_URL", unsplashObj.urls.thumb)
          // .replace("#CARD_PROFILE",)
          .replaceAll("#CARD_TEXT", unsplashObj.alt_description)
      )
      .join("");
  }
};
