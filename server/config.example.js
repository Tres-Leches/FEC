const API_KEY = '';
const serverURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/'

module.exports = {
  baseURL: serverURL,
  headers: {
    'Authorization': `${API_KEY}`,
  }
}