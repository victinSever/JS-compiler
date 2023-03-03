
// const port = '3000'
// const host = 'localhost'

// function createHttp({
//     type = 'get',
//     url = '',
//     data: {},
//     params: {}
// }) {
//     const xml = new XMLHttpRequest()
//     xml.open(type, `http://${host}:${port}${url}`)
//     xml.send()  
//     return new Promise((resolve, reject) => {
//         xml.onreadystatechange = () => {
//             if(xml.readyState === 4 && xml.status === 200) {
//                 resolve(xml.response)
//             }
//         }
//     }).catch(err => console.error(err))
// }

// export default createHttp

import nprogress from 'nprogress'
import axios from 'axios'
import { baseUrl, port } from './config'

//基础链接地址
axios.defaults.baseURL = `${baseUrl}:${port}`

//前置
axios.interceptors.request.use(request => {
    nprogress.start()
    return request
})

//后置
axios.interceptors.response.use(response => {
    nprogress.done()
    return response
})

export default axios