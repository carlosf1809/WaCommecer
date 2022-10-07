import { Button, Card, DatePicker, Form, Input, Select, Space, Table, Tooltip } from "antd";
import { RangePickerProps } from "antd/lib/date-picker";
import moment from "moment";
import { useEffect, useState } from "react";
import DrawerForm from "../../Components/Drawer";
import { ListarProdutosContoller } from "../Cadatros/Produtos/model";
import { CadastrarPedidoController, ListarPedidosContoller } from "./model";


export default function Dashboard() {
    const [form] = Form.useForm();
    const [pageSize, setPageSize] = useState(10);
    const [totalPage, setTotalPage] = useState(1000);
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([] as any); //Não tive tempo para tipar
    const [lstProdutos, setLstProdutos] = useState([] as any); //Não tive tempo para tipar
    const [visible, setVisible] = useState(false);

    function onSubmit(data: any) {
      console.log(data)

      let LstProdutos:any = [];
      data.produtos.forEach((prod: string) =>{
        const produto = lstProdutos.find((e: any) => e.ID_PRODUTO == parseInt(prod))
        LstProdutos.push(produto);
      })

      console.log("LstProdutos", LstProdutos)

      const request = {
        LstProdutos : LstProdutos,
        DT_ENTREGA : data.DT_ENTREGA,
        DS_ENDERECO : data.DS_ENDERECO,
      }

      setLoading(true);
      CadastrarPedidoController(request).then(() => {
        updateList();
        setVisible(false);
      })

    }

    const disabledDate: RangePickerProps['disabledDate'] = current => {
      // Can not select days before today and today
      return current && current < moment().startOf("day");
    };

    const config = {
      rules: [
        {
          type: "object" as const,
          required: true,
          message: "Favor selecionar uma data!",
        },
      ],
    };

    useEffect(() => {
      setLoading(true);
      updateList();

      ListarProdutos()
    },[])

    function updateList(){
        ListarPedidosContoller(1, pageSize).then(res => {
            setDataSource(res)
            setLoading(false);
        })
    }

    function ListarProdutos(){
      setLoading(true);
      ListarProdutosContoller().then(res => {
        setLstProdutos(res)
        setLoading(false);
      })
    }

    const columns: any = [
        {
            title: 'Número Pedido',
            dataIndex: 'ID_PEDIDO',
            key: 'ID_PEDIDO',
        },
        {
            title: 'Data Criação',
            dataIndex: 'DT_CRIACAO',
            key: 'DT_CRIACAO',
            render: (value: any) => {
                return <>{moment(value).format("DD/MM/YYYY")}</>;
              },
        },
        {
            title: 'Data Entrega',
            dataIndex: 'DT_ENTREGA',
            key: 'DT_ENTREGA',
            render: (value: any) => {
                return <>{moment(value).format("DD/MM/YYYY")}</>;
              },
        },
        {
            title: 'Endereço',
            dataIndex: 'DS_ENDERECO',
            key: 'DS_ENDERECO',
            render: (value: any, record: any) => (
                <div className="d-flex flex-wrap justify-content-between m-2">
                  <div className="d-flex flex-wrap">
                    {value.length > 28 ? (
                      <Tooltip placement="top" title={value}>
                        <span className="font-weight-bold">
                          {value.substring(0, 28)}...{" "}
                        </span>
                      </Tooltip>
                    ) : (
                      <span className="font-weight-bold">{value}</span>
                    )}
                  </div>
                </div>
              ),
        },
    ]

    return (
        <>
      <Card
        title={"Dashboard"}
        loading={loading}
        extra={
          <>
            <Space>
              <Button
                type="primary"
                size={"middle"}
                className={"m-1"}
                onClick={() => {
                  form.resetFields()
                  setVisible(true);
                }}
                disabled={loading}
              >
                Cadastrar Pedido
              </Button>
            </Space>
            
          </>
        }
      >
        <Table
          rowKey={"ID_PEDIDO"}
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize: pageSize,
            total: totalPage,
          }}
          loading={loading}
          size="small"
          scroll={{ x: 700 }}
          expandable={{
            expandedRowRender: (record) => (
              //Nao tive tempo para estilizar
              <p style={{ margin: 0 }}>produtos: {record.LST_PRODUTOS.map((e:any) => {
                return (
                  <div>
                    {e.DS_NOME} - {e.VL_PRODUTO.toLocaleString("pt-BR", {style: "currency",currency: "BRL",})}
                  </div>
                )
              })}</p>
            ),
            //OLHA SE O PEDIDO TEM ALGUM PRODUTO, SE TIVER ABRE UMA OPÇÃO DE VISUALIZAÇÃO
            rowExpandable: (record) => record.LST_PRODUTOS.length > 0,
          }}
          onChange={(e: any) => {
            console.log(e);
            setLoading(true);
            ListarPedidosContoller(
              e.current,
              e.pageSize,
            ).then((res) => {
              setPageSize(e.pageSize);
              setLoading(false);
              setDataSource(res);
            });
          }}
        />
      </Card>

      <DrawerForm
        setVisible={setVisible}
        visible={visible}
        title={"Cadastrar Pedido"
        }
        form={{
          formState: form,
          idForm: "form",
          nameButton: "Cadastrar",
        }}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onSubmit}
          autoComplete="off"
          className="form"
          labelAlign="left"
          labelWrap={true}
          id={"form"}
        >
          
          <Form.Item
            name="DT_ENTREGA"
            label="Data Entrega"
            {...config}
          >
            <DatePicker
              className="w-100"
              format="DD-MM-YYYY"
              disabledDate={disabledDate}
            />  
          </Form.Item>
          <Form.Item
            label="Endereço"
            name="DS_ENDERECO"
            rules={[{ required: true, message: "Insira um valor!" }]}
          >
            <Input type="Text" />
          </Form.Item>
          <Form.Item
            label="Produtos"
            name="produtos"
            rules={[{ required: true, message: "Insira um produto!" }]}
          >
            <Select mode="multiple" style={{ width: '100%' }} tokenSeparators={[',']}>
              {lstProdutos.map((e: any) => {
                return (
                  <Select.Option key={e.ID_PRODUTO}>{e.DS_NOME}</Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </DrawerForm>
      </>
    );
}