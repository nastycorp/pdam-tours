// Pa' Donde Apunte la Moto — interacciones de la versión inicial.
// Antes de publicar: cambie WHATSAPP_NUMBER por el número oficial, con indicativo de país
// y sin espacios, signos + ni guiones. Ejemplo colombiano: 573001234567.
const WHATSAPP_NUMBER = "573000000000";

document.getElementById("year").textContent = new Date().getFullYear();

// Menú móvil
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    menuToggle.textContent = "☰";
  });
});

// Filtros del catálogo
const filterButtons = document.querySelectorAll(".filter-chip");
const tourCards = document.querySelectorAll(".tour-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    tourCards.forEach((card) => {
      card.hidden = filter !== "todos" && card.dataset.category !== filter;
    });
  });
});

// Formulario de interés: en esta demo prepara un mensaje para WhatsApp.
// No procesa pagos ni guarda datos en un servidor.
const requestForm = document.getElementById("request-form");
const formStatus = document.getElementById("form-status");

requestForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!requestForm.reportValidity()) return;

  if (WHATSAPP_NUMBER === "573000000000") {
    formStatus.textContent = "Antes de usar este formulario, abra script.js y reemplace WHATSAPP_NUMBER por el número oficial de WhatsApp de PDAM.";
    return;
  }

  const data = new FormData(requestForm);
  const lines = [
    "Hola, quiero información sobre una experiencia de Pa' Donde Apunte la Moto.",
    "",
    `Nombre: ${data.get("name")}`,
    `Correo: ${data.get("email")}`,
    `Interés: ${data.get("type")}`,
    `Tamaño del grupo: ${data.get("people")}`,
    `Destino o idea: ${data.get("destination") || "Por definir"}`,
    `Grabación de video: ${data.get("video")}`,
    `Detalles: ${data.get("message") || "Sin detalles adicionales"}`
  ];
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  formStatus.textContent = "Se abrirá WhatsApp con la solicitud preparada. Revise el mensaje antes de enviarlo.";
  window.open(url, "_blank", "noopener,noreferrer");
});
