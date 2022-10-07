import Axios from '../../Services/Config/API';

export async function ListarPedidosService(page: number, pageSize: number) {
    const responseData = await Axios.get<Promise<any>>(`home/pedidos/listar?page=${page}&pageSize=${pageSize}`)
        .then((response:  any) => {
            return response;
        })
        .catch((err)=>{
            throw err.response;
        })
    return responseData
}

export async function CadastrarPedidoService(props: any) {
    const responseData = await Axios.post<Promise<any>>(`home/pedidos/cadastrar`, props)
        .then((response:  any) => {
            return response;
        })
        .catch((err)=>{
            throw err.response;
        })
    return responseData
}


