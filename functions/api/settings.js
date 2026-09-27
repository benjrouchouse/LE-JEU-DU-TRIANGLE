const DEFAULT_TARGETS = { N4: 13, N3: 17, N2PL: 4, N12: 21 };

export async function onRequestGet({ env }) {
  const row = await env.DB.prepare("SELECT value FROM settings WHERE key='targets'").first();
  return Response.json(row ? JSON.parse(row.value) : DEFAULT_TARGETS);
}

export async function onRequestPut({ env, request }) {
  const body = await request.json();
  const targets = { ...DEFAULT_TARGETS, ...body };
  await env.DB.prepare(
    "INSERT INTO settings (key, value) VALUES ('targets', ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value"
  )
    .bind(JSON.stringify(targets))
    .run();
  return Response.json(targets);
}
