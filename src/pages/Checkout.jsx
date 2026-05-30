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

  const loadWompiScript = () => {
    return new Promise((resolve) => {
      if (window.WidgetCheckout) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.wompi.co/widget.js";
      script.async = true;
      script.onload = () => resolve(true);
      document.body.appendChild(script);
    });
  };

  const pagarConWompi = async () => {
    try {
      setLoading(true);

      const reference     = "FITZONE_" + Date.now();
      const parsedPrice = (priceVal) => {
        if (typeof priceVal === "number") return priceVal;
        if (!priceVal) return 0;
        let clean = priceVal.toString().replace(/[^0-9kK]/g, "");
        if (clean.toLowerCase().includes("k")) {
          return parseInt(clean) * 1000;
        }
        return parseInt(clean) || 0;
      };
      const amountInCents = parsedPrice(totalPrice) * 100;
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

      // 2. Obtener firma y configuracion del checkout desde Laravel
      const response = await apiCall("/api/wompi/checkout", {
        method: "POST",
        body: JSON.stringify({
          reference,
          amount_in_cents: amountInCents,
          currency,
        }),
      });

      const { publicKey, signature } = response;

      // Cargar script de Wompi dinamicamente
      await loadWompiScript();

      if (!window.WidgetCheckout) {
        throw new Error("No se pudo cargar el SDK de Wompi.");
      }

      // 3. Inicializar y abrir el widget
      const checkout = new window.WidgetCheckout({
        currency: currency,
        amountInCents: amountInCents,
        reference: reference,
        publicKey: publicKey,
        signature: {
          integrity: signature
        },
        redirectUrl: "http://localhost:5173/pago-exitoso"
      });

      checkout.open((result) => {
        const transaction = result.transaction;
        console.log("Wompi widget callback:", transaction);
        if (transaction) {
          navigate(`/pago-exitoso?id=${transaction.id}&status=${transaction.status}&reference=${reference}`);
        } else {
          navigate(`/pago-exitoso?reference=${reference}`);
        }
      });

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