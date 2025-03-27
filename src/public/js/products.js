const socket = io();

let cartId = null;

const createCart = async () => {
  try {
    const res = await fetch("/api/carts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data._id;
  } catch (err) {
    console.error("Error al crear carrito:", err);
    return null;
  }
};

const linkCart = () => {
  const cart = document.getElementById("cart");
  if (cart && cartId) {
    cart.href = `/cart/${cartId}`;
  }
};

function cartUrl (){
  const params = new URLSearchParams(window.location.search);
  return params.get('cartId');
}




document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("productContainer");
  if (!container) return;

  cartId = cartUrl();
  linkCart();

  container.addEventListener("click", async (e) => {

    if (e.target.classList.contains("btn-cart")) {
      const productId = e.target.dataset.id;
      const quantity = 1;

      if (!cartId) {
        cartId = await createCart();
        linkCart();

        const url = new URL(window.location);
        url.searchParams.set('cartId', cartId);
        window.history.pushState({}, '', url);
      }

      try {
        const res = await fetch(`/api/carts/${cartId}/products/${productId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity }),
        });

        const data = await res.json();
        if (data.error) {
          alert("Error: " + data.error);
        } else {
          alert(`Producto agregado al carrito ${cartId}`);
        }
      }
      catch (err) {
        console.error("Error:", err);
        alert("Error al agregar producto al carrito");
      }





      // if (!cartId) {
      //   alert("No se pudo crear el carrito");
      //   return;
      // }

      // if (cartId) {
      //   document.getElementById("cart").href = `/cart/${cartId}`;
      // }

     
    }

    if (e.target.classList.contains("btn-delete")) {
      const id = e.target.dataset.id;
      console.log("Eliminando producto:", id);
      socket.emit("delete-product", id);
    }
  });
});

socket.on("products", (products) => {
  console.log("Productos recibidos:", products);
  renderProducts(products);
});
