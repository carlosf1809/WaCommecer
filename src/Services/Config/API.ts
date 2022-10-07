import Axios from 'axios';


const api = Axios.create({
    baseURL: 'http://localhost:9000/api/'
});

//'http://ec2-107-21-192-8.compute-1.amazonaws.com:9000/api/'
api.interceptors.request.use((config: any) => {
    if(localStorage.getItem("@tokenWa"))
        config.headers.Authorization = `Bearer ${localStorage.getItem("@tokenWa")}`;

    return config;
})


export default api;