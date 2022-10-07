import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Table,
  Tooltip,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import DrawerForm from "../../../Components/Drawer";
import {
  CadastrarProdutoController,
  ListarProdutosContoller,
  EditarProdutoController,
  DeletarProdutoController,
} from "./model";
const { confirm } = Modal;

export default function Produtos() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([] as any);
  const [produto, setProduto] = useState({} as any);
  const [visible, setVisible] = useState(false);

  function onSubmit(data: any) {
    //controle para saber se vou fazer o cadastro ou edição do objeto
    if (data.ID_PRODUTO) {
      setLoading(true);
      EditarProdutoController({ ...data, ID_PRODUTO: produto.ID_PRODUTO }).then(
        () => {
          updateList();
          setVisible(false);
        }
      );
    } else {
      setLoading(true);
      CadastrarProdutoController(data).then(() => {
        updateList();
        setVisible(false);
      });
    }
  }

  useEffect(() => {
    setLoading(true);
    updateList();
  }, []);

  function updateList() {
    ListarProdutosContoller().then((res) => {
      setDataSource(res);
      setLoading(false);
    });
  }

  const columns: any = [
    {
      title: "Nome Produto",
      dataIndex: "DS_NOME",
      key: "ID_PRODUTO",
    },
    {
      title: "Descrição Produto",
      dataIndex: "DS_PRODUTO",
      key: "DS_PRODUTO",
    },
    {
      title: "Valor Produto",
      dataIndex: "VL_PRODUTO",
      key: "VL_PRODUTO",
      render: (value: any) => {
        return (
          <>
            {value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </>
        );
      },
    },
    {
      title: "Ações",
      key: "ID_PRODUTO",
      width: "20%",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button
            type="primary"
            size={"middle"}
            onClick={() => {
              setProduto(record);
              if (record.ID_PRODUTO !== produto.ID_PRODUTO) {
                form.resetFields();
                form.setFieldsValue(record);
              }
              if (
                record.ID_PRODUTO === produto.ID_PRODUTO &&
                form.getFieldsValue().ID_PRODUTO === undefined
              ) {
                form.setFieldsValue(record);
              }
              setVisible(true);
            }}
          >
            Editar
          </Button>
          <Button
            danger
            size={"middle"}
            onClick={() => {
              confirm({
                title: "Certeza que deseja excluir este item?",
                icon: <ExclamationCircleOutlined />,
                content: "Essas informações serão perdidas!",
                onOk() {
                    setLoading(true);
                    DeletarProdutoController(record.ID_PRODUTO).then(
                    () => {
                      updateList();
                    }
                  );
                },
                onCancel() {},
              });
            }}
          >
            Excluir
          </Button>
        </Space>
      ),
      align: "center",
    },
  ];

  return (
    <>
      <Card
        title={"Produtos"}
        loading={loading}
        extra={
          <>
            <Space>
              <Button
                type="primary"
                size={"middle"}
                className={"m-1"}
                onClick={() => {
                  setProduto({});
                  form.resetFields();
                  setVisible(true);
                }}
                disabled={loading}
              >
                Cadastrar Produto
              </Button>
            </Space>
          </>
        }
      >
        <Table
          rowKey={"ID_PRODUTO"}
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize: 10,
            total: dataSource.length,
          }}
          loading={loading}
          size="small"
          scroll={{ x: 700 }}
        />
      </Card>

      <DrawerForm
        setVisible={setVisible}
        visible={visible}
        title={produto?.ID_PRODUTO ? "Editar Produto" : "Cadastrar Produto"}
        form={{
          formState: form,
          idForm: "form",
          nameButton: produto?.ID_PRODUTO ? "Editar" : "Cadastrar",
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
            label="Nome"
            name="DS_NOME"
            rules={[{ required: true, message: "Insira o nome!" }]}
          >
            <Input type="Text" />
          </Form.Item>
          <Form.Item
            label="Valor Produto"
            name="VL_PRODUTO"
            className="d-flex flex-column w-100"
            rules={[{ required: true, message: "Insira o valor do produto!" }]}
          >
            <InputNumber<string>
              min="0.00"
              step="0.01"
              stringMode
              style={{ width: 200 }}
              placeholder="0.00"
              type="number"
              prefix="R$"
            />
          </Form.Item>
          <Form.Item
            label="Descrição"
            name="DS_PRODUTO"
            rules={[{ required: true, message: "Insira a descrição!" }]}
          >
            <TextArea className="w-100" rows={5} placeholder="Descrição:" />
          </Form.Item>
        </Form>
      </DrawerForm>
    </>
  );
}
