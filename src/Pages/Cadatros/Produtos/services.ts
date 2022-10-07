import Axios from '../../../Services/Config/API';

export async function ListarProdutosService() {
    const responseData = await Axios.get<Promise<any>>(`home/produtos/listar`)
        .then((response:  any) => {
            return response;
        })
        .catch((err)=>{
            throw err.response;
        })
    return responseData
}

export async function CadastrarProdutoService(props: any) {
    const responseData = await Axios.post<Promise<any>>(`home/produtos/cadastrar`, props)
        .then((response:  any) => {
            return response;
        })
        .catch((err)=>{
            throw err.response;
        })
    return responseData
}
export async function EditarProdutoService(props: any) {
    const responseData = await Axios.put<Promise<any>>(`home/produtos/editar`, props)
        .then((response:  any) => {
            return response;
        })
        .catch((err)=>{
            throw err.response;
        })
    return responseData
}

export async function DeletarProdutoService(ID: number) {
    const responseData = await Axios.delete<Promise<any>>(`home/produtos/deletar?id=${ID}`)
        .then((response:  any) => {
            return response;
        })
        .catch((err)=>{
            throw err.response;
        })
    return responseData
}