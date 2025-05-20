import type { APIContext } from 'astro';

export async function DELETE({ params, request }: APIContext) {
  const { id } = params;
  console.log(`🗑️ Suppression du champion avec documentId: ${id}`);
  
  try {
    // Appel direct à l'API Strapi v5 avec le documentId
    const response = await fetch(`http://localhost:1337/api/champions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      console.error(`Erreur HTTP: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error("Détails de l'erreur:", errorText);
      return new Response(JSON.stringify({
        error: 'Échec de la suppression',
        details: errorText
      }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Succès - Strapi renvoie généralement un 200 avec un corps vide pour DELETE
    console.log("✅ Champion supprimé avec succès");
    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur lors de la suppression:", error);
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function PUT({ params, request }: APIContext) {
  const { id } = params;
  try {
    // Récupérer le corps de la requête
    const body = await request.json();
    console.log(`📝 Mise à jour du champion avec documentId: ${id}`, body);
    
    // Préparer les données pour Strapi V5
    // Ne pas écraser les données non fournies dans la mise à jour
    const requestBody = {
      data: {
        ...body,
        // S'assurer que les rôles sont correctement formatés si fournis
        ...(body.roles && { 
          roles: { 
            connect: body.roles.map(role => ({ id: role.id })) 
          } 
        }),
        // Gestion de l'image si elle est fournie
        ...(body.image && { 
          image: { 
            set: [{ id: body.image }] 
          } 
        })
      }
    };
    
    // Appel direct à l'API Strapi v5 avec populate pour récupérer les relations
    const response = await fetch(`http://localhost:1337/api/champions/${id}?populate=*`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    
    // Gérer les erreurs HTTP
    if (!response.ok) {
      console.error(`Erreur HTTP: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error("Détails de l'erreur:", errorText);
      
      // Retourner une réponse d'erreur
      return new Response(JSON.stringify({
        error: 'Échec de la mise à jour',
        details: errorText
      }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Traiter et retourner le résultat
    const updated = await response.json();
    console.log("✅ Champion mis à jour avec succès:", updated);
    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    // Gestion des erreurs générales
    console.error("❌ Erreur lors de la mise à jour:", error);
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}