import axios from 'axios'
const PORT = 8080
let HOST = `http://localhost:${PORT}`

switch (process.env.REACT_APP_ENVIRONMENT) {
  case 'production':
    HOST = `http://localhost:${PORT}`
    break
  case 'test':
    HOST = `http://localhost:${PORT}`
    break
  default:
    HOST = `http://localhost:${PORT}`
}

// url base
export const api = axios.create({ baseURL: HOST })

console.log('ENVIROMENT', process.env.REACT_APP_ENVIRONMENT)

export default api
