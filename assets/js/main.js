// const container = document.getElementById("recipes");
// let allData = [];

// async function getRecipes() {
//   let res = await fetch("https://keto-diet.p.rapidapi.com/", {
//     headers: {
//       "X-RapidAPI-Key": "e6dd26342bmsh458b3f0d70b2d02p1d9736jsn8a73d9fae75a",
//       "X-RapidAPI-Host": "keto-diet.p.rapidapi.com"
//     }
//   });

//   let data = await res.json();

//   data = data.map(item => ({
//     ...item,
//     category: ["breakfast", "snacks", "dinner"][Math.floor(Math.random()*3)]
//   }));

//   allData = data;
//   displayRecipes(data);
// }

// function displayRecipes(data) {
//   if (!container) return;
//   container.innerHTML = "";

//   data.forEach((item, index) => {
//     container.innerHTML += `
//     <div class="col-md-3">
//       <div class="card">

//         <img src="${item.image || 'https://via.placeholder.com/300'}">

//         <div class="card-body">
//           <h6>${item.recipe}</h6>
//           <p>${item.category}</p>

//           <p class="text-danger">🔥 ${item.calories}</p>

//             <div class="d-flex gap-2 justify-content-between">
//                 <button class="btn btn-sm btn-outline-danger"
//                     onclick="addToFav(${index})">❤️</button>

//                 <button class="btn btn-sm btn-danger"
//                     onclick="addToCart(${index})">🛒</button>

//                 <button class="btn btn-dark w-100"
//                         onclick="openModal(${index})">View</button>
//             </div>
//         </div>
//       </div>
//     </div>
//     `;
//   });
// }

// function filterCategory(cat) {
//   if (cat === "all") return displayRecipes(allData);

//   let filtered = allData.filter(item => item.category === cat);
//   displayRecipes(filtered);
// }

// let searchInput = document.getElementById("search");

// if (searchInput) {
//   searchInput.addEventListener("input", (e) => {
//     let val = e.target.value.toLowerCase();

//     let filtered = allData.filter(item =>
//       item.recipe.toLowerCase().includes(val)
//     );

//     displayRecipes(filtered);
//   });
// }

// function removeItem(i) {
//   let cart = JSON.parse(localStorage.getItem("cart"));
//   cart.splice(i,1);

//   localStorage.setItem("cart", JSON.stringify(cart));
//   loadCart();
// }

// function addToFav(index) {
//   let item = allData[index];

//   let fav = JSON.parse(localStorage.getItem("fav")) || [];

//   let exist = fav.find(i => i.recipe === item.recipe);

//   if (!exist) {
//     fav.push(item);
//     localStorage.setItem("fav", JSON.stringify(fav));
//     alert("Added ❤️");
//   }
// }

// function addToCart(index) {
//   let item = allData[index];

//   let cart = JSON.parse(localStorage.getItem("cart")) || [];

//   let exist = cart.find(i => i.recipe === item.recipe);

//   if (exist) {
//     exist.qty += 1;
//   } else {
//     item.qty = 1;
//     cart.push(item);
//   }

//   localStorage.setItem("cart", JSON.stringify(cart));
//   alert("Added to Cart 🛒");
// }

// function openModal(index) {
//   let item = allData[index];

//   document.getElementById("modalTitle").innerText = item.recipe || "No Name";

//   document.getElementById("modalBody").innerHTML = `
//     <img src="${item.image || 'https://via.placeholder.com/300'}" class="img-fluid rounded mb-3">

//     <p><b>🔥 Calories:</b> ${item.calories || "N/A"}</p>
//     <p><b>🥑 Fat:</b> ${item.fat || "N/A"}</p>
//     <p><b>🍗 Protein:</b> ${item.protein || "N/A"}</p>
//     <p><b>🍞 Carbs:</b> ${item.carbohydrates || "N/A"}</p>

//     <hr>

//     <p><b>📖 Description:</b></p>
//     <p>${item.description || "Healthy keto recipe perfect for diet."}</p>
//   `;

//   new bootstrap.Modal(document.getElementById("recipeModal")).show();
// }

// getRecipes();

import { getRecipes } from "./api.js";
import { displayRecipes } from "./ui.js";
import { getFav, saveFav, getCart, saveCart } from "./storage.js";

let container = document.getElementById("recipes");
let searchInput = document.getElementById("search");

let allData = [];

// INIT
async function init() {
  allData = await getRecipes();

  window.handlers = {
    addToFav,
    addToCart,
    openModal
  };

  displayRecipes(container, allData, window.handlers);
}

// FAVORITES
function addToFav(index) {
  let fav = getFav();
  let item = allData[index];

  if (!fav.find(i => i.recipe === item.recipe)) {
    fav.push(item);
    saveFav(fav);
    alert("Added ❤️");
  }
}

// CART
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

// MODAL
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

// SEARCH
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    let val = e.target.value.toLowerCase();

    let filtered = allData.filter(item =>
      item.recipe.toLowerCase().includes(val)
    );

    displayRecipes(container, filtered, window.handlers);
  });
}

// FILTER
window.filterCategory = function(cat) {
  if (cat === "all") {
    displayRecipes(container, allData, window.handlers);
  } else {
    let filtered = allData.filter(item => item.category === cat);
    displayRecipes(container, filtered, window.handlers);
  }
};

init();