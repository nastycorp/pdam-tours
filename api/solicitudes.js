export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método no permitido.' });
  }

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: 'El servidor aún no está conectado a la base de datos.' });
  }

  const body = req.body || {};
  const nombre = String(body.name || '').trim().slice(0, 120);
  const correo = String(body.email || '').trim().slice(0, 254);
  const telefono = String(body.phone || '').trim().slice(0, 40);
  const tipo = String(body.type || '').trim().slice(0, 100);
  const destino = String(body.destination || '').trim().slice(0, 180);
  const personas = String(body.people || '').trim().slice(0, 40);
  const video = String(body.video || '').trim().slice(0, 100);
  const mensaje = String(body.message || '').trim().slice(0, 1500);
  const consent = body.consent === true;

  if (!nombre || !correo || !telefono || !tipo || !consent) {
    return res.status(400).json({ error: 'Complete nombre, correo, WhatsApp y consentimiento.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    return res.status(400).json({ error: 'Escriba un correo válido.' });
  }

  const record = {
    nombre,
    correo,
    telefono,
    tour: [tipo, destino && `Destino: ${destino}`, personas && `Grupo: ${personas}`, video && `Video: ${video}`, mensaje && `Detalle: ${mensaje}`].filter(Boolean).join(' | '),
    estado_pago: 'no_aplica',
    referencia_wompi: null
  };

  try {
    const response = await fetch(`${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/reservas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(record)
    });
    if (!response.ok) {
      const detail = await response.text();
      console.error('Supabase insert failed:', response.status, detail);
      return res.status(500).json({ error: 'No se pudo guardar la solicitud. Revise la configuración de la tabla.' });
    }
    return res.status(201).json({ ok: true, message: 'Solicitud guardada correctamente.' });
  } catch (error) {
    console.error('Database request failed:', error);
    return res.status(500).json({ error: 'No fue posible conectar con la base de datos.' });
  }
}
