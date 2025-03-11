import axios from 'axios'

const API_URL = 'http://localhost:8081'

export const getStocks = async (limit = 5, offset = 10) => {
  try {
    const response = await axios.get(`${API_URL}/stocks`, {
      params: { limit, offset }
    })
    return response.data
  } catch (error) {
    console.error('Error al obtener las acciones:', error)
    return []
  }
}
