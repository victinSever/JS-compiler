
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

/**
 * 
 * @returns 
 */
export const getLexical = async (content) => {
    return await http.post(`/getLexical`, {
        params: { content }
    })
}

/**
 * 
 * @returns 
 */
export const getSyntax = async (tokens) => {
    return await http.post(`/getSyntax`, {
        params: { tokens }
    })
}
