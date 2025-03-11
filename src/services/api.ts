import axios from "axios";
import { API_BASE_URL } from "../config";


export async function getStocks(limit: number, offset: number) {
  try {
    const response = await axios.get(`${API_BASE_URL}/stocks`, {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener las acciones:", error);
    throw error;
  }
}

export async function getRecommendations() {
    try {
      const response = await axios.get(`${API_BASE_URL}/stocks/recommendations`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener las recomendaciones:", error);
      return [];
    }
  }
