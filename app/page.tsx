"use client";

import { useEffect, useState } from "react";

// ponytail: uses NEXT_PUBLIC_API_URL or falls back to localhost:8000
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function Home() {
  const [backendStatus, setBackendStatus] = useState<string>("Verificando...");
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/health`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "healthy") {
          setBackendStatus("Conectado (FastAPI)");
          setIsOnline(true);
        } else {
          setBackendStatus("Respuesta desconocida");
          setIsOnline(false);
        }
      })
      .catch(() => {
        setBackendStatus("Desconectado");
        setIsOnline(false);
      });
  }, []);

  return (
    <div className="container">
      <main className="card">
        {/* Badge en proceso de creación */}
        <div>
          <span className="status-pill">
            <span className="pulse-dot" />
            Página en proceso de creación
          </span>
        </div>

        {/* Brand Icon & Heading */}
        <div className="brand-icon-wrapper" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>

        <h1 className="brand-title">La Casa Tutu</h1>
        <p className="brand-subtitle">Estamos construyendo algo especial</p>
        <p className="brand-desc">
          Nuestro nuevo espacio digital está tomando forma. Estamos cuidando
          cada detalle para ofrecerte una experiencia cálida, moderna y pensada
          para ti. Muy pronto estaremos en línea.
        </p>

        {/* Estado del desarrollo */}
        <div className="progress-section">
          <div className="progress-meta">
            <span>Fase de construcción</span>
            <span className="progress-tag">En desarrollo</span>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-valuenow={70}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progreso de desarrollo"
          >
            <div className="progress-bar" />
          </div>
        </div>

        {/* Pilares / Teasers */}
        <div className="feature-grid">
          <div className="feature-item">
            <span className="feature-icon">✨</span>
            <h2 className="feature-title">Diseño Cuidado</h2>
            <p className="feature-text">
              Interfaz acogedora y optimizada para cualquier pantalla.
            </p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <h2 className="feature-title">Rendimiento</h2>
            <p className="feature-text">
              Desarrollado con Next.js y FastAPI para máxima velocidad.
            </p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🚀</span>
            <h2 className="feature-title">Próximamente</h2>
            <p className="feature-text">
              Apertura en camino. Gracias por acompañar el proceso.
            </p>
          </div>
        </div>

        {/* Estado técnico del Backend */}
        <div className="dev-status-bar">
          <div
            className={`backend-badge ${isOnline ? "badge-ok" : "badge-wait"}`}
          >
            <span className="badge-dot" />
            <span>Backend: {backendStatus}</span>
          </div>
          <a
            href={`${API_URL}/docs`}
            target="_blank"
            rel="noreferrer"
            className="api-link"
          >
            Documentación API &rarr;
          </a>
        </div>
      </main>

      <footer className="page-footer">
        <p>
          &copy; {new Date().getFullYear()} La Casa Tutu &bull; Todos los
          derechos reservados
        </p>
      </footer>
    </div>
  );
}
