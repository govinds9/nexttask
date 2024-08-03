import axios from 'axios'
import { BASE_URL } from './helper.js'


const Api = axios.create({baseURL:BASE_URL})

export default Api