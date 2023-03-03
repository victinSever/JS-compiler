
import http from './http'

/**
 * 
 * @returns 
 */
export const saveCode = async (code) => {
    return await http.post(`/saveCode`, {
        params: { code }
    })
}

/**
 * 
 * @returns 
 */
export const getCode = async () => {
    return await http.get(`/getCode`)
}
