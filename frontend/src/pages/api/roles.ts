export async function POST({ request }) {
  try {
    const body = await request.json();
    const roleName = body.nom?.trim();

    if (!roleName) {
      return new Response(JSON.stringify({ error: "Nom requis" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const res = await fetch('http://localhost:1337/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { nom: roleName } })
    });

    if (!res.ok) {
      const err = await res.text();
      return new Response(JSON.stringify({ error: err }), { status: res.status });
    }

    const result = await res.json();
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error("Erreur API /api/roles:", err);
    return new Response(JSON.stringify({ error: "Erreur interne" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
