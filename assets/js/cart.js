import { getCart, saveCart } from "./storage.js";

function loadCart() {
  let cart = getCart();
  let list = document.getElementById("cartList");

  let total = 0;
  list.innerHTML = "";

  cart.forEach((item, index) => {
    let price = item.calories || 100;
    total += price * item.qty;

    list.innerHTML += `
      <div class="card mb-3 p-3">
        <h6>${item.recipe}</h6>

        <button onclick="changeQty(${index},1)">+</button>
        <span>${item.qty}</span>
        <button onclick="changeQty(${index},-1)">-</button>

        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  list.innerHTML += `<h4>Total Calories: 🔥 ${total}</h4>`;
}

window.changeQty = function(i, val) {
  let cart = getCart();

  cart[i].qty += val;
  if (cart[i].qty <= 0) cart.splice(i,1);

  saveCart(cart);
  loadCart();
};

window.removeItem = function(i) {
  let cart = getCart();
  cart.splice(i,1);

  saveCart(cart);
  loadCart();
};

loadCart();