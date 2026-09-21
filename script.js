/**
 * Portfolio JavaScript - Vaidyanath Soni
 * Features: ScrollSpy, Category Filter, Project Modal Dialog,
 * Contact Form validation, Copy to clipboard, Back-to-Top, Mobile toggle.
 */

document.addEventListener("DOMContentLoaded", () => {
  // ---------------------------------------------------------------------------
  // 1. PROJECT DATA STORE FOR DEEP-DIVE MODAL
  // ---------------------------------------------------------------------------
  const projectDetails = {
    spam: {
      title: "Email & SMS Spam Classifier",
      image: "images/esc.png",
      fallbackImage: "images/esc.png",
      tags: ["Python", "NLP", "Scikit-Learn", "Streamlit", "TF-IDF"],
      metrics: [
        { label: "Accuracy", value: "97.1%" },
        { label: "Precision", value: "100%" },
        { label: "Algorithm", value: "Multinomial Naive Bayes" },
        { label: "False Positives", value: "0" }
      ],
      description:
        "An end-to-end Machine Learning web application engineered to safeguard communication channels by accurately distinguishing legitimate messages from fraudulent spam and phishing attempts. Utilizing natural language preprocessing and TF-IDF feature extraction, the model guarantees high precision to ensure critical messages are never misclassified as spam.",
      features: [
        "Text Preprocessing Pipeline: Case folding, tokenization, special character cleaning, and Porter stemming.",
        "TF-IDF Vectorizer with tuned n-grams for high semantic discrimination.",
        "Zero False Positive configuration achieving 100% precision on test data.",
        "Interactive Streamlit web frontend allowing real-time message analysis and instant classification."
      ],
      github: "https://github.com/vaidya21/Email_Spam_Classifier",
      demo: "https://emailspamclassifier-gb3d7uwhx6xfp4db85533d.streamlit.app/"
    },
    maintenance: {
      title: "AI-Powered Industrial Predictive Maintenance Engine",
      image: "images/pmm.png",
      fallbackImage: "images/pmm.png",
      tags: ["Python", "Machine Learning", "Scikit-Learn", "Streamlit", "IoT Telemetry"],
      metrics: [
        { label: "Telemetry Features", value: "5 Inputs" },
        { label: "Inference", value: "Real-Time" },
        { label: "Domain", value: "Smart Industry 4.0" },
        { label: "Risk Scoring", value: "Automated" }
      ],
      description:
        "An end-to-end predictive maintenance solution designed to forecast industrial machinery breakdowns before catastrophic failure occurs. The engine ingests continuous sensor telemetry—such as air temperature, process temperature, rotational speed (rpm), torque, and tool wear time—and provides operational teams with actionable risk levels.",
      features: [
        "Multivariate Sensor Modeling: Analyzes complex interdependencies between thermal stress and rotational torque.",
        "Real-Time Interactive Sliders: Allows engineers to simulate varying machine operating loads and inspect risk predictions live.",
        "Tool Wear Monitoring: Predicts replacement thresholds to avoid costly unplanned factory downtime.",
        "Streamlit Dashboard with intuitive failure status alerts and feature significance feedback."
      ],
      github: "https://github.com/vaidya21/Predictive-Maintenance-Model",
      demo: "https://predictive-maintenance-model-7koeyfbsumfkopxceekldg.streamlit.app/"
    },
    car: {
      title: "Car Price Predictor",
      image: "images/car.png",
      fallbackImage: "images/car.png",
      tags: ["Python", "Machine Learning", "Scikit-Learn", "Pandas", "Flask", "Regression"],
      metrics: [
        { label: "Algorithm", value: "Linear Regression" },
        { label: "Feature Pipeline", value: "OneHotEncoder" },
        { label: "Framework", value: "Flask REST API" },
        { label: "Dataset", value: "Pre-owned Cars" }
      ],
      description:
        "An end-to-end Machine Learning web application that predicts the fair market selling price of used cars by analyzing multiple features including brand/company, model name, manufacturing year, kilometers driven, and fuel type. The project features a complete data wrangling pipeline and interactive web form.",
      features: [
        "Automated Data Pipeline: Cleaned raw car data, handled inconsistencies in odometer strings and price values.",
        "Categorical Encoding: Applied OneHotEncoder on car company, model, and fuel type.",
        "Linear Regression Engine: Evaluated and saved as serialised pickle pipeline for rapid inference.",
        "Interactive Flask Web Interface with dynamic brand-to-model dropdown synchronization."
      ],
      github: "https://github.com/vaidya21/Car-Price-Predictor",
      demo: "https://car-price-predictor-1-8u8k.onrender.com"
    },
    house: {
      title: "House Price Predictor",
      image: "images/house.png",
      fallbackImage: "images/house.png",
      tags: ["Python", "Machine Learning", "Scikit-Learn", "Flask", "Indian Real Estate", "StandardScaler"],
      metrics: [
        { label: "R2 Accuracy", value: "97.4%" },
        { label: "Currency", value: "₹ INR (Lakhs/Cr)" },
        { label: "Dataset", value: "2,000 Records" },
        { label: "Tools", value: "Loan EMI Calc" }
      ],
      description:
        "An end-to-end Machine Learning web application designed to predict residential property prices across Indian real estate markets. Trained on over 2,000 property records with ~97.4% R2 accuracy, the application features an interactive UI with property age, area, and metro distance sliders, BHK selectors, and a built-in monthly home loan EMI estimator.",
      features: [
        "Linear Regression & StandardScaler: Rigorously evaluated machine learning pipeline achieving 97.4% R2 score.",
        "Indian Currency Formatting: Accurately converts predictions into intuitive Lakhs and Crores (₹).",
        "Financial Decision Support: Includes automated monthly Home Loan EMI calculations and price-per-square-foot breakdown.",
        "Modern Glassmorphism Frontend: Live synchronized sliders, locality dropdowns, and quick presets."
      ],
      github: "https://github.com/vaidya21/House-Price-Prediction",
      demo: "https://house-price-prediction-kegh.onrender.com"
    }
  };

  // ---------------------------------------------------------------------------
  // 2. SCROLLSPY & SMOOTH NAVIGATION
  // ---------------------------------------------------------------------------
  const navLinks = document.querySelectorAll("nav a.nav-link");
  const sections = document.querySelectorAll(".content-section");

  function onScroll() {
    const scrollPos = window.scrollY + 140;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });

    // Toggle Back-to-Top Button
    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  // Back to top click
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ---------------------------------------------------------------------------
  // 3. PROJECT CATEGORY FILTER
  // ---------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const categories = card.getAttribute("data-category") || "";
        if (filterValue === "all" || categories.includes(filterValue)) {
          card.style.display = "flex";
          card.style.animation = "fadeIn 0.3s ease";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // ---------------------------------------------------------------------------
  // 4. PROJECT DETAILS MODAL
  // ---------------------------------------------------------------------------
  const modal = document.getElementById("projectModal");
  const modalBody = document.getElementById("modalBody");
  const modalCloseBtn = document.getElementById("modalCloseBtn");

  function openProjectModal(projectId) {
    const data = projectDetails[projectId];
    if (!data || !modal || !modalBody) return;

    modalBody.innerHTML = `
      <img src="${data.image}" alt="${data.title}" class="modal-preview-img" onerror="this.src='${data.fallbackImage}'" />
      
      <div class="modal-header">
        <h2>${data.title}</h2>
      </div>

      <div class="modal-tags">
        ${data.tags.map((t) => `<span>${t}</span>`).join("")}
      </div>

      <div class="modal-metrics">
        ${data.metrics
          .map(
            (m) => `
          <div class="metric-item">
            <div class="metric-val">${m.value}</div>
            <div class="metric-lbl">${m.label}</div>
          </div>
        `
          )
          .join("")}
      </div>

      <p class="modal-desc">${data.description}</p>

      <div class="modal-features">
        <h4>Key Highlights & Architecture:</h4>
        <ul>
          ${data.features.map((f) => `<li>${f}</li>`).join("")}
        </ul>
      </div>

      <div class="modal-links">
        <a href="${data.demo}" target="_blank" rel="noopener noreferrer" class="btn-primary">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
          <span>Live Demo / App</span>
        </a>
        <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn-secondary">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          <span>GitHub Code</span>
        </a>
      </div>
    `;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeProjectModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Trigger buttons
  document.querySelectorAll("[data-project]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const projId = btn.getAttribute("data-project");
      openProjectModal(projId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeProjectModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeProjectModal();
      }
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("open")) {
      closeProjectModal();
    }
  });

  // ---------------------------------------------------------------------------
  // 5. TOAST NOTIFICATION & COPY-TO-CLIPBOARD
  // ---------------------------------------------------------------------------
  const toast = document.getElementById("toastNotification");
  const toastText = document.getElementById("toastText");
  let toastTimer;

  function showToast(message) {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  document.querySelectorAll(".btn-copy").forEach((btn) => {
    btn.addEventListener("click", () => {
      const textToCopy = btn.getAttribute("data-copy");
      if (textToCopy) {
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            showToast(`Copied ${textToCopy} to clipboard!`);
          })
          .catch(() => {
            // Fallback
            const tempInput = document.createElement("input");
            tempInput.value = textToCopy;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand("copy");
            document.body.removeChild(tempInput);
            showToast(`Copied to clipboard!`);
          });
      }
    });
  });

  // ---------------------------------------------------------------------------
  // 6. CONTACT FORM VALIDATION & SUBMISSION
  // ---------------------------------------------------------------------------
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      let isValid = true;
      const nameInput = document.getElementById("userName");
      const emailInput = document.getElementById("userEmail");
      const subjectInput = document.getElementById("userSubject");
      const messageInput = document.getElementById("userMessage");

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.parentElement.classList.add("has-error");
        isValid = false;
      } else {
        nameInput.parentElement.classList.remove("has-error");
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.parentElement.classList.add("has-error");
        isValid = false;
      } else {
        emailInput.parentElement.classList.remove("has-error");
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        subjectInput.parentElement.classList.add("has-error");
        isValid = false;
      } else {
        subjectInput.parentElement.classList.remove("has-error");
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageInput.parentElement.classList.add("has-error");
        isValid = false;
      } else {
        messageInput.parentElement.classList.remove("has-error");
      }

      if (isValid) {
        const mailtoLink = `mailto:vaidya1182@gmail.com?subject=${encodeURIComponent(
          subjectInput.value.trim()
        )}&body=${encodeURIComponent(
          `Hi Vaidyanath,\n\nName: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}`
        )}`;

        showToast("Preparing your email draft...");
        window.location.href = mailtoLink;
        contactForm.reset();
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 7. MOBILE SIDEBAR DETAILS ACCORDION TOGGLE
  // ---------------------------------------------------------------------------
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebarDetails = document.getElementById("sidebarDetails");

  if (sidebarToggle && sidebarDetails) {
    sidebarToggle.addEventListener("click", () => {
      sidebarDetails.classList.toggle("open");
      sidebarToggle.classList.toggle("open");
    });
  }
});
