document.querySelectorAll('.tour-contact-form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const nombre = form.elements.nombre.value.trim();
    const telefono = form.elements.telefono.value.trim();
    const tour = form.dataset.tour;
    const fecha = form.dataset.date;
    const precio = form.dataset.price;
    const mensaje = [
      'Hola, me interesa este plan de PDAM Tours.',
      `Plan: ${tour}`,
      `Fecha tentativa: ${fecha}`,
      `Precio publicado: ${precio} por persona`,
      `Nombre: ${nombre}`,
      `Mi número de WhatsApp: ${telefono}`,
      '¿Hay cupos disponibles y me pueden confirmar los detalles?'
    ].join('\n');
    const url = `https://wa.me/573245929902?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
});
