import React from 'react';

const Hero = () => (
  <section
    style={{
      background: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1500&q=80') center/cover no-repeat",
      color: "#fff",
      padding: "100px 20px",
      textAlign: "center",
      minHeight: "400px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    }}
  >
    <div style={{
      background: "rgba(0,0,0,0.5)",
      padding: "40px",
      borderRadius: "16px",
      maxWidth: "600px"
    }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>
        ¡Bienvenido a ENSALADA DE JUAN Y DIEGO!
      </h1>
      <p style={{ fontSize: "1.5rem", marginBottom: "30px" }}>
        Descubre los mejores platillos de funvalking.
      </p>
      <button
        style={{
          padding: "15px 40px",
          fontSize: "1.2rem",
          background: "#ffb347",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
        onClick={() => window.location.href = "/menu"}
      >
        Ver Menú
      </button>
    </div>
  </section>
);

export function Home() {
  return (
    <div>
      <Hero />
    </div>
  );
}
