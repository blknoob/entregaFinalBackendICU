document.addEventListener("DOMContentLoaded", () => {
  const cartList = document.getElementById("cart-list");
  if (!cartList) return;

  const cartId = cartList.dataset.cartId;

  const btnClear = document.getElementById("btn-clear-cart");
  if (btnClear) {
    btnClear.addEventListener("click", async () => {
      if (!confirm("¿Vaciar todo el carrito?")) return;

      try {
        const res = await fetch(`/api/carts/${cartId}/clear`, {
          method: "DELETE",
        });
        const data = await res.json();
        alert("Carrito vaciado");
        location.reload();
      } catch (err) {
        alert("Error al vaciar carrito");
      }
    });
  }

  const deleteButtons = document.querySelectorAll(".btn-delete");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const pid = btn.dataset.pid;
      if (!confirm("¿Eliminar este producto?")) return;

      try {
        const res = await fetch(`/api/carts/${cartId}/products/${pid}`, {
          method: "DELETE",
        });
        const data = await res.json();
        alert("Producto eliminado");
        location.reload();
      } catch (err) {
        alert("Error al eliminar producto");
      }
    });
  });
});
