document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("header").innerHTML = `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow sticky-top">
    <div class="container">

      <a class="navbar-brand fw-bold text-danger" href="index.html">
        KetoBite 🍽️
      </a>

      <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="nav">
        <ul class="navbar-nav ms-auto">

          <li class="nav-item">
            <a class="nav-link" href="index.html">Home</a>
          </li>

          <li class="nav-item">
            <a class="nav-link btn btn-outline-light me-2" href="favorites.html">❤️ Favorites</a>
          </li>

          <li class="nav-item">
            <a class="nav-link btn btn-danger" href="cart.html">🛒 Cart</a>
          </li>

        </ul>
      </div>

    </div>
  </nav>
  `;
});
