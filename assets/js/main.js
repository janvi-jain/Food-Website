import { getRecipes } from "./api.js";
import { displayRecipes } from "./ui.js";
import { getFav, saveFav, getCart, saveCart } from "./storage.js";

let container = document.getElementById("recipes");
let searchInput = document.getElementById("search");

let allData = [];

async function init() {
  allData = await getRecipes();

  window.handlers = {
    addToFav,
    addToCart,
    openModal
  };

  displayRecipes(container, allData, window.handlers);
}

function addToFav(index) {
  let fav = getFav();
  let item = allData[index];

  if (!fav.find(i => i.recipe === item.recipe)) {
    fav.push(item);
    saveFav(fav);
    alert("Added ❤️");
  }
}

function addToCart(index) {
  let cart = getCart();
  let item = allData[index];

  let exist = cart.find(i => i.recipe === item.recipe);

  if (exist) {
    exist.qty += 1;
  } else {
    item.qty = 1;
    cart.push(item);
  }

  saveCart(cart);
  alert("Added 🛒");
}

function openModal(index) {
  let item = allData[index];

  document.getElementById("modalTitle").innerText = item.recipe;

  document.getElementById("modalBody").innerHTML = `
    <img src="${item.image}" class="img-fluid mb-2">
    <p>🔥 ${item.calories}</p>
    <p>🥑 ${item.fat}</p>
    <p>🍗 ${item.protein}</p>
    <p>🍞 ${item.carbohydrates}</p>
  `;

  new bootstrap.Modal(document.getElementById("recipeModal")).show();
}

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    let val = e.target.value.toLowerCase();

    let filtered = allData.filter(item =>
      item.recipe.toLowerCase().includes(val)
    );

    displayRecipes(container, filtered, window.handlers);
  });
}

window.filterCategory = function(cat) {
  if (cat === "all") {
    displayRecipes(container, allData, window.handlers);
  } else {
    let filtered = allData.filter(item => item.category === cat);
    displayRecipes(container, filtered, window.handlers);
  }
};

init();