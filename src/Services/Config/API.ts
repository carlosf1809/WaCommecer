import Axios from 'axios';


const api = Axios.create({
    baseURL: 'https://localhost:7205/api/'
});

//'http://ec2-107-21-192-8.compute-1.amazonaws.com/api/'
api.interceptors.request.use((config: any) => {
    if(localStorage.getItem("@tokenWa"))
        config.headers.Authorization = `Bearer ${localStorage.getItem("@tokenWa")}`;

    return config;
})


export default api;