import { createChampion } from '../../lib/api';
import type { APIContext } from 'astro';

export async function POST({ request }: APIContext) {
  console.log("=== API ROUTE APPELÉE ===");
  console.log("Méthode:", request.method);
  console.log("URL:", request.url);
  
  try {
    const { nom, description, roleId } = await request.json();
    console.log("Données reçues :", { nom, description, roleId });
    
    // Appel à l'API Strapi avec le format correct pour les relations dans v5
    const response = await fetch('http://localhost:1337/api/champions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          nom: nom,
          description: description,
          // Format correct pour connecter une relation par ID dans Strapi v5
          roles: {
            connect: [roleId]
          }
        },
      }),
    });

    if (!response.ok) {
      console.error(`Erreur HTTP: ${response.status} ${response.statusText}`);
      try {
        const errorData = await response.json();
        console.error("Détails de l'erreur:", errorData);
        return new Response(JSON.stringify({ 
          error: 'Erreur lors de la création du champion', 
          details: errorData 
        }), { 
          status: response.status,
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (e) {
        const errorText = await response.text();
        console.error("Détails de l'erreur (texte):", errorText);
        return new Response(JSON.stringify({ 
          error: 'Erreur lors de la création du champion', 
          details: errorText 
        }), { 
          status: response.status,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    const newChampion = await response.json();
    return new Response(JSON.stringify(newChampion), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Erreur lors de la requête POST:', err);
    return new Response(JSON.stringify({ 
      error: 'Erreur interne du serveur', 
      details: err.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}