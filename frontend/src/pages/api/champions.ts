import type { APIContext } from 'astro';

export async function POST({ request }: APIContext) {
  try {
    const formData = await request.formData();

    const nom = formData.get('nom')?.toString();
    const description = formData.get('description')?.toString();
    const roleId = formData.get('roleId')?.toString();
    const imageFile = formData.get('image');

    // Vérification des champs requis
    if (!nom || !description || !roleId) {
      return new Response(JSON.stringify({ error: 'Champs requis manquants' }), { status: 400 });
    }

    // Étape 1 : Créer le champion sans l'image
    const championRes = await fetch('http://localhost:1337/api/champions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: {
          nom,
          description,
          roles: {
            connect: [parseInt(roleId)]
          }
        }
      })
    });

    if (!championRes.ok) {
      const errorData = await championRes.json();
      console.error("Erreur lors de la création du champion:", errorData);
      return new Response(JSON.stringify({ error: 'Erreur création champion', details: errorData }), {
        status: 500
      });
    }

    const newChampion = await championRes.json();
    const championId = newChampion.data.id;

    // Étape 2 : Si une image est fournie, la téléverser et l'associer au champion
    if (imageFile && imageFile instanceof File) {
      const uploadForm = new FormData();
      uploadForm.append('files', imageFile);
      uploadForm.append('ref', 'api::champion.champion'); // Remplacez par l'API ID correct de votre type de contenu
      uploadForm.append('refId', championId.toString());
      uploadForm.append('field', 'image'); // Nom du champ média dans votre type de contenu

      const uploadRes = await fetch('http://localhost:1337/api/upload', {
        method: 'POST',
        body: uploadForm
      });

      if (!uploadRes.ok) {
        const errorText = await uploadRes.text();
        console.error("Erreur lors de l'upload de l'image:", errorText);
        return new Response(JSON.stringify({ error: 'Erreur upload image', details: errorText }), { status: 500 });
      }
    }

    return new Response(JSON.stringify(newChampion), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error("Erreur serveur:", err);
    return new Response(JSON.stringify({ error: 'Erreur serveur', details: err.message }), {
      status: 500
    });
  }
}
