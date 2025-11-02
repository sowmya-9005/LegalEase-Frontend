import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaSearch,
  FaGavel,
  FaLanguage,
  FaRobot,
  FaBookOpen,
  FaEye,
  FaBullseye,
  FaUsers,
  FaLightbulb,
} from "react-icons/fa";
import "./Home.css";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1400&q=80";

const Home = () => {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  // ✅ Dynamically inject Font Awesome CDN once
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
    link.integrity =
      "sha512-4oVap6zkD6n3p6WwXPGKX2bIayG/0U6V3qVSmGQnB1EoO+oXvPz2UVDfqVfFjUjH7QynvR7cmVQtRDbwOvlQAA==";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  }, []);

  const onSearch = (e) => {
  e.preventDefault();
  const search = (q || "").trim();

  // ✅ Redirect only if something is entered
  if (search.length > 0) {
    navigate(`/rights?search=${encodeURIComponent(search)}`);
  } else {
    alert("Please enter a keyword before searching.");
  }
};

  return (
    <div className="home-root">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div
          className="hero-image"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          role="img"
          aria-label="Lady justice"
        >
          <div className="hero-overlay" />
          <div className="hero-center">
            <h1 className="hero-title">Know Your Rights, Protect Yourself</h1>
            <p className="hero-sub">
              LegalEase provides simple, accessible information about your legal
              rights in multiple languages. Empower yourself with knowledge.
            </p>

            <form className="hero-search" onSubmit={onSearch}>
              <div className="search-input-wrap">
                <input
                  type="search"
                  aria-label="Search rights"
                  placeholder="Search by topic, law, or keyword..."
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>
              <button className="btn-primary" type="submit" aria-label="Search">
                <FaSearch />
              </button>
            </form>

            <div className="hero-cta-row">
              <Link to="/rights" className="btn-ghost">
                <i className="fa-solid fa-scale-balanced"></i> Explore Rights
              </Link>
              <button
                className="explore-btn"
                onClick={() =>
                  window.scrollTo({ top: 600, behavior: "smooth" })
                }
              >
                Learn more ↓
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <h2 className="section-title">What we offer</h2>
        <div className="features-grid">
          <article className="feature-card animate-up">
            <div className="icon">
              <FaGavel />
            </div>
            <h3>Simplified Legal Info</h3>
            <p>
              Easy-to-understand explanations of your rights without complex
              legal jargon.
            </p>
          </article>

          <article className="feature-card animate-up">
            <div className="icon">
              <FaLanguage />
            </div>
            <h3>Multiple Languages</h3>
            <p>
              Available in regional languages so everyone can access the
              information.
            </p>
          </article>

          <article className="feature-card animate-up">
            <div className="icon">
              <FaRobot />
            </div>
            <h3>Legal Chatbot</h3>
            <p>
              Get quick answers to common questions through our automated
              assistant.
            </p>
          </article>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories-section">
        <h2 className="section-title">Quick Links</h2>
        <div className="categories-grid">
          <Link to="/rights" className="category-card animate-up">
            <div className="cat-icon">
              <i className="fa-solid fa-book-open"></i>
            </div>
            <div className="cat-title">Fundamental Rights</div>
            <div className="cat-desc">
              Articles, explanations and examples to help you understand your
              core rights.
            </div>
          </Link>

          <Link to="/rights" className="category-card animate-up">
            <div className="cat-icon">
              <i className="fa-solid fa-scale-balanced"></i>
            </div>
            <div className="cat-title">Consumer Rights</div>
            <div className="cat-desc">
              Guidance for filing complaints, refunds and product/service
              disputes.
            </div>
          </Link>

          <Link to="/rights" className="category-card animate-up">
            <div className="cat-icon">
              <i className="fa-solid fa-people-group"></i>
            </div>
            <div className="cat-title">Women & Child Rights</div>
            <div className="cat-desc">
              Protection against abuse, domestic violence and child welfare
              resources.
            </div>
          </Link>
        </div>
      </section>

      {/* EMERGENCY HELP */}
      <section className="categories-section">
        <h2 className="section-title">Emergency Help</h2>
        <div className="categories-grid">
          <div className="category-card animate-up">
            <div className="cat-icon">
              <i className="fa-solid fa-phone-volume"></i>
            </div>
            <div className="cat-title">Immediate Assistance</div>
            <div className="cat-desc">
              If you are in danger, call the local emergency services right
              away.
            </div>
          </div>

          <div className="category-card animate-up">
            <div className="cat-icon">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <div className="cat-title">Legal Helpline</div>
            <div className="cat-desc">
              Hotline: <strong>1-800-LEGAL-HELP</strong> — guidance for urgent
              legal concerns.
            </div>
          </div>

          <div className="category-card animate-up">
            <div className="cat-icon">
              <i className="fa-solid fa-hospital"></i>
            </div>
            <div className="cat-title">Support Services</div>
            <div className="cat-desc">
              NGO partners, shelters and medical referrals for victims and
              vulnerable people.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
