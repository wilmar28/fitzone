// src/pages/PagoExitoso.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function PagoExitoso() {
  const navigate          = useNavigate();
  const { clearCart }     = useCart();
  const [estado, setEstado] = useState("verificando");
  const [transaccion, setTransaccion] = useState(null);

  useEffect(() => {
    // Wompi devuelve estos parámetros en la URL
    const params = new URLSearchParams(window.location.search);
    const id     = params.get("id");
    const status = params.get("status");        // APPROVED, DECLINED, PENDING
    const ref    = params.get("reference");

    console.log("Wompi params:", { id, status, ref });

    if (id) {
      if (status) {
        if (status === "APPROVED") {
          clearCart();
          setEstado("aprobado");
          setTransaccion({ id, ref });
        } else if (status === "DECLINED") {
          setEstado("rechazado");
        } else if (status === "PENDING") {
          setEstado("pendiente");
          setTransaccion({ id, ref });
        }
      } else {
        // Si solo viene el id de transacción, consultamos a la API de Wompi
        const publicKey = import.meta.env.VITE_WOMPI_PUBLIC_KEY || "pub_test_SWXiGmK0jWjoVDMDchqlLmo81OEwgmtp";
        const isSandbox = publicKey.startsWith("pub_test");
        const baseUrl = isSandbox ? "https://sandbox.wompi.co/v1" : "https://production.wompi.co/v1";

        fetch(`${baseUrl}/transactions/${id}`)
          .then(res => res.json())
          .then(body => {
            const tx = body.data;
            if (tx) {
              if (tx.status === "APPROVED") {
                clearCart();
                setEstado("aprobado");
                setTransaccion({ id, ref: tx.reference });
              } else if (tx.status === "DECLINED" || tx.status === "VOIDED" || tx.status === "ERROR") {
                setEstado("rechazado");
              } else if (tx.status === "PENDING") {
                setEstado("pendiente");
                setTransaccion({ id, ref: tx.reference });
              }
            } else {
              setEstado("directo");
            }
          })
          .catch(err => {
            console.error("Error fetching Wompi transaction:", err);
            setEstado("directo");
          });
      }
    } else {
      // Sin parámetros — acceso directo a la página
      setEstado("directo");
    }
  }, []);

  return (
    <section className="main-shell" style={{ textAlign: "center", paddingTop: "4rem" }}>

      {estado === "verificando" && (
        <p className="fz-copy">Verificando pago...</p>
      )}

      {estado === "aprobado" && (
        <>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
          <h1 className="fz-big-title">¡Pago aprobado!</h1>
          <p className="fz-copy" style={{ marginBottom: "0.5rem" }}>
            Tu pedido fue procesado exitosamente.
          </p>
          {transaccion && (
            <p style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: "2rem" }}>
              Referencia: {transaccion.ref}
            </p>
          )}
          <button className="gradient-btn" onClick={() => navigate("/tienda")}>
            Seguir comprando
          </button>
        </>
      )}

      {estado === "rechazado" && (
        <>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>❌</div>
          <h1 className="fz-big-title">Pago rechazado</h1>
          <p className="fz-copy" style={{ marginBottom: "2rem" }}>
            Tu pago no fue aprobado. Intenta con otro método.
          </p>
          <button className="gradient-btn" onClick={() => navigate("/checkout")}>
            Intentar de nuevo
          </button>
        </>
      )}

      {estado === "pendiente" && (
        <>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⏳</div>
          <h1 className="fz-big-title">Pago pendiente</h1>
          <p className="fz-copy" style={{ marginBottom: "0.5rem" }}>
            Tu pago está siendo procesado.
          </p>
          {transaccion && (
            <p style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: "2rem" }}>
              Referencia: {transaccion.ref}
            </p>
          )}
          <button className="gradient-btn" onClick={() => navigate("/")}>
            Volver al inicio
          </button>
        </>
      )}

      {estado === "directo" && (
        <>
          <h1 className="fz-big-title">Gracias por tu compra</h1>
          <button className="gradient-btn" onClick={() => navigate("/")}>
            Volver al inicio
          </button>
        </>
      )}

    </section>
  );
}