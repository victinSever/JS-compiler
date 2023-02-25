
import axios from 'axios'
const baseUrl = 'http://localhost:3001'


async function saveCode(code) {
    return await axios.get(`${baseUrl}/saveCode?code=${code}`)
}

async function getCode() {
    return await axios.get(`${baseUrl}/getCode`)
}

export {
    getCode,
    saveCode
}