// Pa' Donde Apunte la Moto — interacciones de la página.
document.getElementById("year").textContent = new Date().getFullYear();

// Menú móvil
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    menuToggle.textContent = isOpen ? "×" : "☰";
  });
  mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    menuToggle.textContent = "☰";
  }));
}

// Filtros del catálogo
const filterButtons = document.querySelectorAll(".filter-chip");
const tourCards = document.querySelectorAll(".tour-card");
filterButtons.forEach((button) => button.addEventListener("click", () => {
  filterButtons.forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  const filter = button.dataset.filter;
  tourCards.forEach((card) => { card.hidden = filter !== "todos" && card.dataset.category !== filter; });
}));

// Guarda la solicitud en Supabase mediante una función privada de Vercel.
const requestForm = document.getElementById("request-form");
const formStatus = document.getElementById("form-status");
if (requestForm && formStatus) {
  requestForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!requestForm.reportValidity()) return;
    const button = requestForm.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    button.disabled = true;
    button.textContent = "Enviando…";
    formStatus.textContent = "Guardando su solicitud…";
    const form = new FormData(requestForm);
    const payload = Object.fromEntries(form.entries());
    payload.consent = form.get("consent") === "on";
    try {
      const response = await fetch("/api/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "No se pudo guardar la solicitud.");
      formStatus.textContent = "Solicitud guardada correctamente. PDAM podrá contactarle. Esto no confirma una reserva ni un pago.";
      requestForm.reset();
    } catch (error) {
      formStatus.textContent = `${error.message} Inténtelo más tarde o contáctenos por otro medio.`;
    } finally {
      button.disabled = false;
      button.innerHTML = originalText;
    }
  });
}
