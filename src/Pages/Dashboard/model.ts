import { notification } from "antd";
import { CadastrarPedidoService, ListarPedidosService } from "./services";

async function ListarPedidosContoller(page: number, pageSize: number){
    const data = await ListarPedidosService(page, pageSize)
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

async function CadastrarPedidoController(props: any){
    const data = await CadastrarPedidoService(props)
    .then((res: any) => {
        notification.success({
            message: 'Pedido cadastrado com sucesso',
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
    ListarPedidosContoller,
    CadastrarPedidoController,
}