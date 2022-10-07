import { notification } from "antd";
import { CadastrarProdutoService, DeletarProdutoService, EditarProdutoService, ListarProdutosService } from "./services";

async function ListarProdutosContoller(){
    const data = await ListarProdutosService()
    .then((res: any) => {
        return res.data;
    }).catch((err)=>{
        notification.error({
            message: err.response.data.message,
          });
        throw err.response.data.message;
    })
    return data;
}

async function CadastrarProdutoController(props: any){
    const data = await CadastrarProdutoService(props)
    .then((res: any) => {
        notification.success({
            message: 'Produto cadastrado com sucesso',
          });
        return res.data;
    }).catch((err)=>{
        notification.error({
            message: err.response.data.message,
          });
        throw err.response.data.message;
    })
    return data;
}
async function EditarProdutoController(props: any){
    const data = await EditarProdutoService(props)
    .then((res: any) => {
        notification.success({
            message: 'Produto editado com sucesso',
          });
        return res.data;
    }).catch((err)=>{
        notification.error({
            message: err.response.data.message,
          });
        throw err.response.data.message;
    })
    return data;
}

async function DeletarProdutoController(idProduto: number){
    const data = await DeletarProdutoService(idProduto)
    .then((res: any) => {
        notification.success({
            message: 'Produto deletado com sucesso',
          });
        return res.data;
    }).catch((err)=>{
        notification.error({
            message: err.response.data.message,
          });
        throw err.response.data.message;
    })
    return data;
}

export {
    ListarProdutosContoller,
    CadastrarProdutoController,
    EditarProdutoController,
    DeletarProdutoController
}