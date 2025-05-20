const API_URL = 'http://localhost:1337/api';

export async function fetchChampions(roleFilter = '') {
  try {
    let url = `${API_URL}/champions?populate=*`;
    
    const res = await fetch(url);
    
    if (!res.ok) {
      console.error(`Erreur HTTP: ${res.status} ${res.statusText}`);
      return [];
    }
    
    const json = await res.json();
    
    if (!json || !json.data) return [];
    
    const champions = json.data;
    
    // Si un filtre est appliqué côté client
    const filtered = roleFilter
      ? champions.filter(champ =>
          champ.roles?.some(role => role.nom.toLowerCase() === roleFilter.toLowerCase())
        )
      : champions;
    
    return filtered.map((champion) => ({
      id: champion.id,
      documentId: champion.documentId, // Important pour Strapi 5
      nom: champion.nom,
      description: champion.description,
      image: champion.image,
      roles: champion.roles,
      createdAt: champion.createdAt,
      updatedAt: champion.updatedAt,
      publishedAt: champion.publishedAt
    }));
    
  } catch (err) {
    console.error("Erreur fetchChampions:", err);
    return [];
  }
}

// Fonction pour récupérer un champion par son documentId (Strapi 5)
export async function fetchChampionByDocumentId(documentId: string) {
  try {
    const res = await fetch(`${API_URL}/champions/${documentId}?populate=*`);
    
    if (!res.ok) {
      console.error(`Erreur HTTP: ${res.status} ${res.statusText}`);
      return null;
    }
    
    const json = await res.json();
    
    if (!json || !json.data) {
      console.error(`Champion avec le documentId ${documentId} introuvable`);
      return null;
    }
    
    const champion = json.data;
    
    return {
      id: champion.id,
      documentId: champion.documentId,
      nom: champion.nom,
      description: champion.description,
      image: champion.image,
      roles: champion.roles,
      createdAt: champion.createdAt,
      updatedAt: champion.updatedAt,
      publishedAt: champion.publishedAt
    };
  } catch (err) {
    console.error("Erreur fetchChampionByDocumentId:", err);
    return null;
  }
}

// Fonction pour récupérer un champion par son ID (pour compatibilité)
export async function fetchChampionById(id: number | string) {
  try {
    // D'abord, récupérer tous les champions pour trouver celui avec l'ID correspondant
    const champions = await fetchChampions();
    const champion = champions.find(c => c.id.toString() === id.toString());
    
    if (!champion) {
      console.error(`Champion avec l'ID ${id} introuvable`);
      return null;
    }
    
    // Ensuite, récupérer les détails complets avec le documentId
    return await fetchChampionByDocumentId(champion.documentId);
  } catch (err) {
    console.error("Erreur fetchChampionById:", err);
    return null;
  }
}

export async function fetchRoles() {
  try {
    const res = await fetch(`${API_URL}/posts`);
    const json = await res.json();
    
    if (!json || !json.data) return [];
    
    return json.data.map((role: any) => ({
      id: role.id,
      name: role.nom || role.name || role.title
    }));
  } catch (err) {
    console.error("Erreur fetchRoles:", err);
    return [];
  }
}

export async function createChampion(data: { nom: string, description: string, role: string, imageId: string | null }) {
  try {
    const res = await fetch(`${API_URL}/champions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          nom: data.nom,
          description: data.description,
          roles: [{ name: data.role }],
          // Inclure l'image seulement si un imageId est présent
          ...(data.imageId && {
            image: {
              connect: [{ id: data.imageId }],
            }
          })
        },
      }),
    });

    if (!res.ok) {
      console.error(`Erreur HTTP: ${res.status} ${res.statusText}`);
      return null;
    }

    const json = await res.json();
    return json;
  } catch (err) {
    console.error('Erreur createChampion:', err);
    return null;
  }
}


export async function updateChampion(documentId, data) {
  try {
    console.log(`🔄 Mise à jour du champion avec documentId: ${documentId}`, data);
    
    // Préparation des données pour Strapi V5
    const requestBody = {
      data: {
        ...data
      }
    };
    
    // Notez bien l'URL avec le documentId
    const res = await fetch(`${API_URL}/champions/${documentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: `${res.status}: ${res.statusText}` }));
      console.error(`Erreur HTTP ${res.status}: ${res.statusText}`, errorData);
      throw new Error(`Erreur HTTP ${res.status}: ${res.statusText}`);
    }
    
    const json = await res.json();
    console.log("✅ Champion mis à jour avec succès:", json);
    return json;
  } catch (error) {
    console.error("❌ Erreur updateChampion:", error);
    throw error; // Propager l'erreur pour une meilleure gestion
  }
}


export async function deleteChampion(documentId) {
  try {
    console.log(`🗑️ Suppression du champion avec documentId: ${documentId}`);
    
    const res = await fetch(`${API_URL}/champions/${documentId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: `${res.status}: ${res.statusText}` }));
      console.error(`Erreur HTTP ${res.status}: ${res.statusText}`, errorData);
      throw new Error(`Erreur HTTP ${res.status}: ${res.statusText}`);
    }

    console.log("✅ Champion supprimé avec succès");
    return true;
  } catch (error) {
    console.error("❌ Erreur deleteChampion:", error);
    throw error; // Propager l'erreur pour une meilleure gestion
  }
}
