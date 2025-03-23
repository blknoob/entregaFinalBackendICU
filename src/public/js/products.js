const socket = io();
const list = document.getElementById("productList");
const container = document.getElementById("productContainer");

document.addEventListener("DOMContentLoaded", () => {
  if (!list && !container) {
    return;
  }

  function renderProducts(products) {
    if (window.location.pathname === "/realtimeproducts") {
      if (!container) {
        return;
      }


      container.innerHTML = "";

      products.forEach((product) => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");

        // let imgSrc = product.thumbnail;
        // if (imgSrc.startsWith("http")) {
        //   imgSrc = `/images/${product.thumbnail}`;
        // }

        productItem.innerHTML = `
          <img src="/images/default.png" alt="${product.title}" width="100" height="100">
          <strong>${product.title}</strong>
          <p>${product.description}</p>
          <p><strong>Código:</strong> ${product.code}</p>
          <p><strong>Precio:</strong> $${product.price}</p>
          <p><strong>Stock:</strong> ${product.stock}</p>
          <p><strong>Categoría:</strong> ${product.category}</p>
          <button class="btn btn-delete" onclick="deleteProduct(${product._id})">Eliminar</button>

        `;
        container.appendChild(productItem);
      });
    } else {
      if (!list) {
        return;
      }
      list.innerHTML = "";

      products.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("card");

        // let imgSrc = product.thumbnail;
        // if (imgSrc.startsWith("http")) {
        //   imgSrc = `/images/${product.thumbnail}`;
        // }

        card.innerHTML = `
        <img src="/images/default.png" alt="${product.title}" width="100" height="100">
        <div class="card-content">
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <p><strong>Código:</strong> ${product.code}</p>
          <p><strong>Precio:</strong> $${product.price}</p>
          <p><strong>Stock:</strong> ${product.stock}</p>
          <p><strong>Categoría:</strong> ${product.category}</p>
        </div>
      `;

        list.appendChild(card);
      });
    }
  }

  socket.on("products", (products) => {
    console.log("Productos recibidos:", products);
    renderProducts(products);
  });
});

function deleteProduct(id) {
  console.log("Eliminando producto:", id);
  socket.emit("delete-product", id);
}
