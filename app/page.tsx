"use client";

import { useEffect, useState } from "react";

// ponytail: uses NEXT_PUBLIC_API_URL or falls back to localhost:8000
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  icon: string;
  tag: string;
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Juego de Tazas Tutu",
    category: "Cerámica",
    price: "S/ 48.00",
    description: "Juego artesanal de 2 tazas de cerámica esmaltada a mano.",
    icon: "☕",
    tag: "Nuevo",
  },
  {
    id: 2,
    name: "Manta Suave de Lana",
    category: "Textiles",
    price: "S/ 89.00",
    description: "Manta tejida con fibras naturales, ideal para sillón o cama.",
    icon: "🧶",
    tag: "Próximamente",
  },
  {
    id: 3,
    name: "Vela Botánica Vainilla",
    category: "Aromaterapia",
    price: "S/ 36.00",
    description: "Vela 100% cera de soja con aceites esenciales naturales.",
    icon: "🕯️",
    tag: "Destacado",
  },
  {
    id: 4,
    name: "Cojín Bordado Casa",
    category: "Textiles",
    price: "S/ 42.00",
    description: "Funda de cojín con textura cálida y cierre invisible.",
    icon: "🛋️",
    tag: "Próximamente",
  },
  {
    id: 5,
    name: "Jarrón Rústico Artesanal",
    category: "Cerámica",
    price: "S/ 75.00",
    description: "Pieza decorativa de arcilla cocida con acabado rústico.",
    icon: "🏺",
    tag: "Edición Limitada",
  },
  {
    id: 6,
    name: "Difusor de Aromas Bamboo",
    category: "Aromaterapia",
    price: "S/ 58.00",
    description: "Difusor ultrasónico silencioso con luz cálida ambiental.",
    icon: "🌿",
    tag: "Próximamente",
  },
];

const CATEGORIES = ["Todos", "Cerámica", "Textiles", "Aromaterapia"];

export default function StorePage() {
  const [backendStatus, setBackendStatus] = useState<string>("Verificando...");
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [cartCount, setCartCount] = useState<number>(0);
  const [emailInput, setEmailInput] = useState<string>("");
  const [notified, setNotified] = useState<boolean>(false);

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

  const filteredProducts =
    selectedCategory === "Todos"
      ? SAMPLE_PRODUCTS
      : SAMPLE_PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setNotified(true);
      setEmailInput("");
    }
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <>
      {/* ================================================================== */}
      {/* HEADER DE LA TIENDA                                                */}
      {/* ================================================================== */}
      <header className="store-header">
        <div className="header-inner">
          <a href="#" className="brand-link">
            <div className="brand-icon-box" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="22"
                height="22"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div>
              <span className="brand-name">La Casa Tutu</span>
              <span className="brand-tag">Tienda Oficial</span>
            </div>
          </a>

          <nav>
            <ul className="store-nav">
              <li className="nav-item">
                <a href="#catalogo" className="active">
                  Catálogo
                </a>
              </li>
              <li className="nav-item">
                <a href="#categorias">Categorías</a>
              </li>
              <li className="nav-item">
                <a href="#beneficios">Beneficios</a>
              </li>
              <li className="nav-item">
                <a href="#contacto">Contacto</a>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <span className="wip-tag">
              <span className="pulse-dot" />
              En Creación
            </span>
            <button
              type="button"
              className="cart-button"
              onClick={handleAddToCart}
              title="Carrito de compras"
            >
              <span>🛒</span>
              <span>Carrito</span>
              <span className="cart-badge">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================================================================== */}
      {/* CUERPO DE LA TIENDA                                               */}
      {/* ================================================================== */}
      <main className="store-main">
        {/* Banner de Tienda en Creación */}
        <section className="store-hero">
          <div className="hero-pill">
            <span className="pulse-dot" />
            <span>Tienda en Proceso de Creación</span>
          </div>

          <h1>Todo para tu hogar con el sello de La Casa Tutu</h1>
          <p>
            Estamos seleccionando cuidadosamente cada producto de nuestro
            catálogo. Muy pronto abriremos nuestra tienda virtual para que puedas
            realizar tus compras online de forma segura y sencilla.
          </p>

          {/* Formulario de notificación */}
          {notified ? (
            <p style={{ color: "#34d399", fontWeight: 600, fontSize: "0.9rem" }}>
              ✓ ¡Gracias! Te avisaremos apenas abramos la tienda.
            </p>
          ) : (
            <form onSubmit={handleNotify} className="hero-notify">
              <input
                type="email"
                required
                placeholder="Ingresa tu correo para avisarte..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <button type="submit">Avisarme</button>
            </form>
          )}
        </section>

        {/* Categorías y Filtros */}
        <section id="categorias" className="category-bar">
          <h2 className="category-title" id="catalogo">
            Catálogo de Productos
          </h2>
          <div className="category-chips">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`chip ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Grid de Productos */}
        <section className="product-grid">
          {filteredProducts.map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-thumb">
                <span className="product-icon">{product.icon}</span>
                <span className="product-badge">{product.tag}</span>
              </div>
              <div className="product-content">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.description}</p>
                <div className="product-footer">
                  <span className="product-price">{product.price}</span>
                  <button
                    type="button"
                    className="product-btn"
                    onClick={handleAddToCart}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Beneficios de la Tienda */}
        <section id="beneficios" className="benefits-grid">
          <div className="benefit-card">
            <span className="benefit-icon">🚚</span>
            <h3 className="benefit-title">Envíos Cuidadosos</h3>
            <p className="benefit-text">
              Embalaje seguro y entregas protegidas directamente a tu domicilio.
            </p>
          </div>
          <div className="benefit-card">
            <span className="benefit-icon">🛡️</span>
            <h3 className="benefit-title">Compra 100% Protegida</h3>
            <p className="benefit-text">
              Transacciones seguras mediante pasarelas de pago y billeteras
              digitales.
            </p>
          </div>
          <div className="benefit-card">
            <span className="benefit-icon">💬</span>
            <h3 className="benefit-title">Atención Personalizada</h3>
            <p className="benefit-text">
              ¿Tienes dudas? Te atendemos directamente para ayudarte con tu
              pedido.
            </p>
          </div>
        </section>

        {/* Barra de Estado del Backend (VPS / Localhost) */}
        <div className="dev-status-card">
          <div
            className={`backend-badge ${isOnline ? "badge-ok" : "badge-wait"}`}
          >
            <span className="badge-dot" />
            <span>Servicios de Tienda / Backend: {backendStatus}</span>
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

      {/* ================================================================== */}
      {/* FOOTER DE LA TIENDA                                                */}
      {/* ================================================================== */}
      <footer id="contacto" className="store-footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <h3>🏡 La Casa Tutu</h3>
              <p>
                Tienda online en proceso de creación. Artículos especiales y
                acogedores pensados para transformar cada rincón de tu hogar.
              </p>
            </div>

            <div className="footer-col">
              <h4>Tienda</h4>
              <ul className="footer-links">
                <li>
                  <a href="#catalogo">Catálogo Completo</a>
                </li>
                <li>
                  <a href="#categorias">Categorías</a>
                </li>
                <li>
                  <a href="#beneficios">Cómo Comprar</a>
                </li>
                <li>
                  <a href="#">Preguntas Frecuentes</a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Atención al Cliente</h4>
              <ul className="footer-links">
                <li>
                  <a href="#">Políticas de Envío</a>
                </li>
                <li>
                  <a href="#">Cambios y Devoluciones</a>
                </li>
                <li>
                  <a href="#">Libro de Reclamaciones</a>
                </li>
                <li>
                  <a href="#">Términos y Condiciones</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              &copy; {new Date().getFullYear()} La Casa Tutu &bull; Tienda
              virtual en desarrollo. Todos los derechos reservados.
            </p>
            <div className="payment-tags">
              <span className="pay-badge">Visa</span>
              <span className="pay-badge">Mastercard</span>
              <span className="pay-badge">Yape</span>
              <span className="pay-badge">Plin</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
