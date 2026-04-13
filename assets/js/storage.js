export function getFav() {
  return JSON.parse(localStorage.getItem("fav")) || [];
}

export function saveFav(data) {
  localStorage.setItem("fav", JSON.stringify(data));
}

export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

export function saveCart(data) {
  localStorage.setItem("cart", JSON.stringify(data));
}