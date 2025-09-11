// services/requests.ts
import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;

// ✅ Le loader doit retourner directement le tableau de membres
const getMembers = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/users`, {
      withCredentials: true,
    });
    console.info("Response /api/users :", response.data); // pour debug
    return response.data; // <- directement le tableau
  } catch (error) {
    console.error("Erreur lors de la récupération des membres :", error);
    return [];
  }
};

export { getMembers };
