export function displayRecipes(container, data, handlers) {
  container.innerHTML = "";

  data.forEach((item, index) => {
    container.innerHTML += `
      <div class="col-md-3">
        <div class="card">
          <img src="${item.image || 'https://via.placeholder.com/300'}">

          <div class="card-body">
            <h6>${item.recipe}</h6>
            <p>${item.category}</p>
            <p class="text-danger">🔥 ${item.calories}</p>

            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-outline-danger"
                onclick="window.handlers.addToFav(${index})">❤️</button>

              <button class="btn btn-sm btn-danger"
                onclick="window.handlers.addToCart(${index})">🛒</button>

              <button class="btn btn-dark w-100"
                onclick="window.handlers.openModal(${index})">View</button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}