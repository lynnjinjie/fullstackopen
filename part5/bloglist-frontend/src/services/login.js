import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'


const login = async (credentails) => {
  const response = await axios.post(baseUrl, credentails)
  return response.data
}

export default { login }
