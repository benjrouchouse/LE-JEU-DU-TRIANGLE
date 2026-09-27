function rowToMember(r) {
  return {
    id: r.id,
    grade: r.grade || "",
    name: r.name,
    group: r.grp,
    level: r.level,
    active: !!r.active,
    createdAt: r.created_at,
  };
}

export async function onRequestGet({ env }) {
  const { results } = await env.DB.prepare(
    'SELECT * FROM members ORDER BY grp, level, name'
  ).all();
  return Response.json(results.map(rowToMember));
}

export async function onRequestPost({ env, request }) {
  const body = await request.json();
  if (!body || !body.name || !body.group || !body.level) {
    return new Response(JSON.stringify({ error: "champs manquants" }), { status: 400 });
  }
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  await env.DB.prepare(
    "INSERT INTO members (id, grade, name, grp, level, active, created_at) VALUES (?,?,?,?,?,1,?)"
  )
    .bind(id, body.grade || "", body.name, body.group, body.level, now)
    .run();

  await env.DB.prepare(
    "INSERT INTO movements (id, ts, month, member_id, member_label, type, to_group, to_level, note) VALUES (?,?,?,?,?,?,?,?,?)"
  )
    .bind(
      crypto.randomUUID(),
      now,
      body.month || null,
      id,
      (body.grade ? body.grade + " " : "") + body.name,
      "ajout",
      body.group,
      body.level,
      body.note || ""
    )
    .run();

  return Response.json({ id });
}
