import { notification } from 'antd';
import Axios from '../Services/Config/API';

export function CriarToken() {
    const response = Axios.post<Promise<any>>(`home/autenticacao/criartoken`)
        .then((response:  any) => {
            return response;
        })
        .catch((err)=>{
            console.log(err)
            notification.error({
                message: err.data.message,
              });
            throw err.response;
        })
    return response
}