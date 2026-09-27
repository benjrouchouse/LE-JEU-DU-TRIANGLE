export async function onRequestPatch({ env, request, params }) {
  const id = params.id;
  const body = await request.json();

  const cur = await env.DB.prepare("SELECT * FROM members WHERE id=?").bind(id).first();
  if (!cur) return new Response(JSON.stringify({ error: "introuvable" }), { status: 404 });

  const fields = [];
  const values = [];
  if (body.grade !== undefined) { fields.push("grade = ?"); values.push(body.grade); }
  if (body.name !== undefined) { fields.push("name = ?"); values.push(body.name); }
  if (body.group !== undefined) { fields.push("grp = ?"); values.push(body.group); }
  if (body.level !== undefined) { fields.push("level = ?"); values.push(body.level); }
  if (body.active !== undefined) { fields.push("active = ?"); values.push(body.active ? 1 : 0); }

  if (fields.length) {
    values.push(id);
    await env.DB.prepare(`UPDATE members SET ${fields.join(", ")} WHERE id=?`).bind(...values).run();
  }

  if (body.logMovement) {
    const mv = body.logMovement;
    await env.DB.prepare(
      "INSERT INTO movements (id, ts, month, member_id, member_label, type, from_group, from_level, to_group, to_level, note) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
    )
      .bind(
        crypto.randomUUID(),
        new Date().toISOString(),
        mv.month || null,
        id,
        mv.memberLabel || "",
        mv.type,
        mv.fromGroup ?? null,
        mv.fromLevel ?? null,
        mv.toGroup ?? null,
        mv.toLevel ?? null,
        mv.note || ""
      )
      .run();
  }

  return Response.json({ ok: true });
}
