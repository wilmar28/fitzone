import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiCall, createSale, getCurrentUser } from "../services/api";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const location   = useLocation();
  const navigate   = useNavigate();
  const { clearCart } = useCart();

  const { items, totalPrice } = location.state || {
    items: [],
    totalPrice: 0,
  };

  const [loading, setLoading] = useState(false);

  const pagarConWompi = async () => {
  try {
    setLoading(true);

    const reference     = "FITZONE_" + Date.now();
    const amountInCents = totalPrice * 100;
    const currency      = "COP";

    // 1. Guardar venta
    await createSale({
      total:     totalPrice,
      estado:    "pendiente",
      canal:     "wompi",
      reference,
      items: items.map(i => ({
        product_id: i.id,
        quantity:   i.qty,
        price:      i.precio,
      })),
    });

    // 2. Obtener firma
    const response = await apiCall("/api/wompi/signature", {
      method: "POST",
      body: JSON.stringify({
        reference,
        amount_in_cents: amountInCents,
        currency,
      }),
    });

    const signature = response.signature;
    const publicKey = import.meta.env.VITE_WOMPI_PUBLIC_KEY;

    // 3. Construir URL manualmente — NO usar URLSearchParams
    //    porque codifica ":" a "%3A" y Wompi lo rechaza
    const wompiUrl =
      `https://checkout.wompi.co/p/?` +
      `public-key=${publicKey}` +
      `&currency=${currency}` +
      `&amount-in-cents=${amountInCents}` +
      `&reference=${reference}` +
      `&signature:integrity=${signature}` +
      `&redirect-url=${encodeURIComponent("http://localhost:5173/pago-exitoso")}`;

    console.log("Redirigiendo a:", wompiUrl);
    window.location.href = wompiUrl;

  } catch (error) {
    console.error("ERROR WOMPI:", error);
    alert("Error al iniciar el pago: " + error.message);
    setLoading(false);
  }
};

  // ── Render ──────────────────────────────────────────
  return (
    <section className="main-shell">

      <span className="fz-kicker">Checkout</span>

      <h1 className="fz-big-title" style={{ marginBottom: "2rem" }}>
        Confirmar pedido
      </h1>

      <div className="card">

        {/* Lista de productos */}
        {items.map(item => (
          <div
            key={item.id}
            style={{
              display:        "flex",
              justifyContent: "space-between",
              marginBottom:   "1rem",
            }}
          >
            <span>{item.nombre} x {item.qty}</span>
            <span>${(item.precio * item.qty).toLocaleString("es-CO")}</span>
          </div>
        ))}

        <hr />

        {/* Total */}
        <div
          style={{
            display:        "flex",
            justifyContent: "space-between",
            marginTop:      "1rem",
            marginBottom:   "2rem",
            fontWeight:     700,
          }}
        >
          <span>Total</span>
          <span>${totalPrice.toLocaleString("es-CO")}</span>
        </div>

        {/* Botón pagar */}
        <button
          onClick={pagarConWompi}
          disabled={loading}
          className="gradient-btn"
          style={{
            width:        "100%",
            padding:      "1rem",
            border:       "none",
            borderRadius: 10,
            cursor:       loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Procesando..." : "Pagar con Wompi"}
        </button>

      </div>
    </section>
  );
}  // ← cierre del componente