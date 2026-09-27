function rowToMovement(r) {
  return {
    id: r.id,
    ts: r.ts,
    month: r.month,
    memberId: r.member_id,
    memberLabel: r.member_label,
    type: r.type,
    fromGroup: r.from_group,
    fromLevel: r.from_level,
    toGroup: r.to_group,
    toLevel: r.to_level,
    note: r.note,
  };
}

export async function onRequestGet({ env }) {
  const { results } = await env.DB.prepare(
    "SELECT * FROM movements ORDER BY ts DESC LIMIT 500"
  ).all();
  return Response.json(results.map(rowToMovement));
}
