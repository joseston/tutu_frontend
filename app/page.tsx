"use client";

import { useEffect, useState } from "react";

// ponytail: direct fetch to localhost:8000 for minimal basic setup
// ceiling: hardcoded URL. Upgrade path: use NEXT_PUBLIC_API_URL env var.
export default function Home() {
  const [backendStatus, setBackendStatus] = useState<string>("Verificando...");
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/health")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "healthy") {
          setBackendStatus("Conectado (FastAPI en línea)");
          setIsOnline(true);
        } else {
          setBackendStatus("Respuesta desconocida");
          setIsOnline(false);
        }
      })
      .catch(() => {
        setBackendStatus("Desconectado (inicia el backend en :8000)");
        setIsOnline(false);
      });
  }, []);

  return (
    <main className="card">
      <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>
        🏡 La Casa Tutu
      </h1>
      <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
        Frontend en Next.js &amp; Backend en FastAPI.
      </p>

      <div style={{ marginTop: "1.5rem" }}>
        <p style={{ fontSize: "0.85rem", color: "#cbd5e1" }}>
          Estado del Backend:
        </p>
        <span
          className={`badge ${isOnline ? "badge-ok" : "badge-wait"}`}
        >
          {backendStatus}
        </span>
      </div>

      <div style={{ marginTop: "1.5rem", borderTop: "1px solid #334155", paddingTop: "1rem" }}>
        <a
          href="http://localhost:8000/docs"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#38bdf8", fontSize: "0.85rem", textDecoration: "none" }}
        >
          Ver documentación de la API &rarr;
        </a>
      </div>
    </main>
  );
}
