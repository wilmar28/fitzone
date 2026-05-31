import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiCall, createSale } from "../services/api";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const location   = useLocation();
  const navigate   = useNavigate();
  const { clearCart } = useCart();

  const { items, totalPrice } = location.state || {
    items: [],
    totalPrice: 0,
  };

  const parsedPrice = (priceVal) => {
    if (typeof priceVal === "number") return priceVal;
    if (!priceVal) return 0;
    let clean = priceVal.toString().replace(/[^0-9kK]/g, "");
    if (clean.toLowerCase().includes("k")) return parseInt(clean) * 1000;
    return parseInt(clean) || 0;
  };

  const amountInCents = parsedPrice(totalPrice) * 100;
  const currency      = "COP";

  const [loading, setLoading]   = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // ── Al hacer clic: guardar venta y abrir widget ───────
  const pagarConWompi = async () => {
    if (loading || amountInCents <= 0) return;
    setLoading(true);
    setErrorMsg(null);
    const reference = "FITZONE_" + Date.now();

    try {
      // 1. Guardar la venta en la base de datos (Supabase)
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
      }).catch(err => console.warn("Venta no registrada:", err.message));

      // 2. Obtener firma y configuración del backend Laravel
      const response = await apiCall("/api/wompi/checkout", {
        method: "POST",
        body: JSON.stringify({
          reference,
          amount_in_cents: amountInCents,
          currency,
        }),
      });

      // 3. Abrir el Widget de Wompi (sin redirectUrl, manejado con callback)
      if (!window.WidgetCheckout) {
        throw new Error("El script de pago de Wompi no se ha cargado. Por favor, recarga la página o desactiva tu bloqueador de publicidad.");
      }

      const checkout = new window.WidgetCheckout({
        currency,
        amountInCents,
        reference,
        publicKey: response.publicKey,
        signature: { integrity: response.signature },
      });

      checkout.open((result) => {
        setLoading(false);
        const transaction = result.transaction;
        if (transaction) {
          navigate(`/pago-exitoso?id=${transaction.id}&status=${transaction.status}&reference=${reference}`);
        } else {
          navigate(`/pago-exitoso?reference=${reference}`);
        }
      });
    } catch (err) {
      console.error("Error al iniciar el pago:", err);
      setErrorMsg(err.message || "Ocurrió un error al procesar la solicitud de pago.");
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

        {/* Error de carga */}
        {errorMsg && (
          <p style={{ color: "#f87171", fontSize: "0.82rem", marginBottom: "1rem" }}>
            ⚠️ {errorMsg}
          </p>
        )}

        {/* Botón pagar */}
        <button
          onClick={pagarConWompi}
          disabled={loading || amountInCents <= 0}
          className="gradient-btn"
          style={{
            width:        "100%",
            padding:      "1rem",
            border:       "none",
            borderRadius: 10,
            cursor:       (loading || amountInCents <= 0) ? "not-allowed" : "pointer",
            opacity:      (loading || amountInCents <= 0) ? 0.7 : 1,
          }}
        >
          {loading ? "Procesando..." : "Pagar con Wompi"}
        </button>

      </div>
    </section>
  );
}  // ← cierre del componente