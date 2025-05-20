import type { APIContext } from 'astro';

export async function POST({ request }: APIContext) {
  try {
    // Récupérer le FormData contenant l'image
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ error: 'Fichier invalide ou manquant' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    console.log(`📤 Upload d'image: ${file.name} (${file.size} octets)`);
    
    // Créer un nouveau FormData pour la requête vers Strapi
    const strapiFormData = new FormData();
    strapiFormData.append('files', file);
    
    // Envoyer la requête à Strapi
    const response = await fetch('http://localhost:1337/api/upload', {
      method: 'POST',
      body: strapiFormData
    });
    
    if (!response.ok) {
      console.error(`Erreur HTTP: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error("Détails de l'erreur:", errorText);
      
      return new Response(JSON.stringify({
        error: `Échec de l'upload (${response.status})`,
        details: errorText
      }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Traiter et retourner le résultat
    const result = await response.json();
    console.log("✅ Image uploadée avec succès:", result);
    
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("❌ Erreur lors de l'upload:", error);
    
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}