document.addEventListener("DOMContentLoaded", async () => {
  if (!localStorage.getItem("cartId")) {
    try {
      const res = await fetch("/api/carts", {
        method: "POST",
      });
      const data = await res.json();
      localStorage.setItem("cartId", data._id);
    } catch (err) {
      console.error("Error al crear carrito:", err);
    }
  }

  const formDetails = document.getElementById("addToCartForm");
  if (formDetails) {
    formDetails.addEventListener("submit", async (e) => {
      e.preventDefault();

      const cartId = localStorage.getItem("cartId");
      const productId = formDetails.dataset.id; 
      // const productId = "{{product._id}}";

      const res = await fetch(`/api/carts/${cartId}/products/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: 1 }),
      });

      const data = await res.json();
      if (data.error) {
        alert("Error: " + data.error);
      } else {
        alert("Producto agregado al carrito");
      }
    });
  }
});

