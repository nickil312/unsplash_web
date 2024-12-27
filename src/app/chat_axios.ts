import axios from "axios";
// import * as SecureStore from "expo-secure-store";

const instance = axios.create({
    // baseURL:'http://192.168.1.44:4444'
    // baseURL:'http://172.20.10.2:4444'
    // baseURL:'http://172.20.10.3:4444'
    // baseURL:'http://192.168.0.141:4444'
    // baseURL:'http://10.102.128.1:4444'
    // baseURL:'http://192.168.0.13:4444'
    // baseURL:'http://192.168.0.33:4444'
    baseURL:'http://localhost:8080'
    // baseURL:'http://192.168.145.235:4444'

});

// instance.interceptors.request.use(async (config) =>{
//     config.headers.Authorization = localStorage.getItem('token')
//     // console.log(config)
//     // console.log(config.headers.Authorization)
//     return config;
// })
export default instance;