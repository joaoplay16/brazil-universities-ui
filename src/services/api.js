import axios from 'axios'
const PORT = 8088
let HOST = ``

switch (process.env.REACT_APP_ENVIRONMENT) {
  case 'production':
    HOST = `https://brazil-universities-api.herokuapp.com`
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
