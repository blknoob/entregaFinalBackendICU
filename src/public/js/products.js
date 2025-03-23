const socket = io();

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("productContainer");

  if (!container) return;

  container.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-delete")) {
      const id = e.target.dataset.id;
      console.log("Eliminando producto:", id);
      socket.emit("delete-product", id);
    }
  });

  socket.on("products", (products) => {
    console.log("Productos recibidos:", products);
    location.reload();
  });
});


















// const socket = io();
// const list = document.getElementById("productList");
// const container = document.getElementById("productContainer");

// document.addEventListener("DOMContentLoaded", () => {
//   if (!list && !container) return;

//   function renderProducts(products) {
//     const vistaAct = window.location.pathname.includes("/api/realtimeproducts");
//     const pages = vistaAct ? container : list;

//     if (!pages) return;

//     pages.innerHTML = "";

//     const docsPages = Array.isArray(products.docs)
//       ? products.docs
//       : Array.isArray(products)
//       ? products
//       : [];

//     docsPages.forEach((product) => {
//       const productItem = document.createElement("div");
//       productItem.classList.add(vistaAct ? "product-item" : "card");

//       productItem.innerHTML = `
//         <img src="" alt="${product.title}" width="100" height="100">
//         <strong>${product.title}</strong>
//         <p>${product.description}</p>
//         <p><strong>Código:</strong> ${product.code}</p>
//         <p><strong>Precio:</strong> $${product.price}</p>
//         <p><strong>Stock:</strong> ${product.stock}</p>
//         <p><strong>Categoría:</strong> ${product.category}</p>
//         ${
//           vistaAct
//             ? `<button class="btn btn-delete" onclick="deleteProduct('${product._id}')">Eliminar</button>`
//             : ""
//         }
//       `;
//       pages.appendChild(productItem);
//     });

//     if (products.prevLink || products.nextLink) {
//       const paginate = document.createElement("div");
//       paginate.classList.add("pagination");

//       if (products.prevLink) {
//         const prevLink = document.createElement("a");
//         prevLink.href = products.prevLink;
//         prevLink.innerText = "Anterior";
//         paginate.appendChild(prevLink);
//       }

//       if (products.nextLink) {
//         const nextLink = document.createElement("a");
//         nextLink.href = products.nextLink;
//         nextLink.innerText = "Siguiente";
//         paginate.appendChild(nextLink);
//       }

//       pages.appendChild(paginate);
//     }
//   }

//   socket.on("products", (products) => {
//     console.log("Productos recibidos:", products);
//     renderProducts(products);
//   });
// });

// function deleteProduct(id) {
//   console.log("Eliminando producto:", id);
//   socket.emit("delete-product", id);
// }

//   function renderProducts(products) {
//     if (window.location.pathname.includes("/api/realtimeproducts")) {
//       if (!container) {
//         return;
//       }

//     const vistaAct = window.location.pathname.includes("/api/realtimeproducts");

//     const pages = vistaAct ? container : list;

//     if (!pages) {
//       return;
//     }

//     pages.innerHTML = "";

// const docsPages = Array.isArray(products.docs) ? products.docs : [products.docs];

//       // container.innerHTML = "";

//       docsPages.forEach((product) => {
//         const productItem = document.createElement("div");
//         productItem.classList.add(vistaAct ?  "product-item" : "card");

//         // let imgSrc = product.thumbnail;
//         // if (imgSrc.startsWith("http")) {
//         //   imgSrc = `/images/${product.thumbnail}`;
//         // }

//         productItem.innerHTML = `
//           <img src="" alt="${product.title}" width="100" height="100">
//           <strong>${product.title}</strong>
//           <p>${product.description}</p>
//           <p><strong>Código:</strong> ${product.code}</p>
//           <p><strong>Precio:</strong> $${product.price}</p>
//           <p><strong>Stock:</strong> ${product.stock}</p>
//           <p><strong>Categoría:</strong> ${product.category}</p>
//           <button class="btn btn-delete" onclick="deleteProduct(${product._id})">Eliminar</button>

//         `;
//         pages.appendChild(productItem);
//       });
//     } else {
//       if (!list) {
//         return;
//       }
//       list.innerHTML = "";

//       products.forEach((product) => {
//         const card = document.createElement("div");
//         card.classList.add("card");

//         // let imgSrc = product.thumbnail;
//         // if (imgSrc.startsWith("http")) {
//         //   imgSrc = `/images/${product.thumbnail}`;
//         // }

//         card.innerHTML = `
//         <img src="" alt="${product.title}" width="100" height="100">
//         <div class="card-content">
//           <h3>${product.title}</h3>
//           <p>${product.description}</p>
//           <p><strong>Código:</strong> ${product.code}</p>
//           <p><strong>Precio:</strong> $${product.price}</p>
//           <p><strong>Stock:</strong> ${product.stock}</p>
//           <p><strong>Categoría:</strong> ${product.category}</p>
//         </div>
//       `;

//         list.appendChild(card);
//       });
//     }
//   }

//   if (products.prevLink || products.nextLink) {
//     const paginate = document.createElement("div");
//     paginate.classList.add("pagination");

//     if (products.prevLink) {
//       const prevLink = document.createElement("a");
//       prevLink.href = products.prevLink;
//       prevLink.innerText = "Anterior";
//       paginate.appendChild(prevLink);
//     }

//     if (products.nextLink) {
//       const nextLink = document.createElement("a");
//       nextLink.href = products.nextLink;
//       nextLink.innerText = "Siguiente";
//       paginate.appendChild(nextLink);
//     }

//     pages.appendChild(paginate);}

//   socket.on("products", (products) => {
//     console.log("Productos recibidos:", products);
//     renderProducts(products);
//   });
// });

// function deleteProduct(id) {
//   console.log("Eliminando producto:", id);
//   socket.emit("delete-product", id);
// }
