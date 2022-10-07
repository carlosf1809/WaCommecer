import { Button,Modal, FormInstance, Space, Drawer } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
interface IProps{
    setVisible: (boolean: boolean) => void,
    visible: boolean,
    footer?:JSX.Element,
    children?: JSX.Element
    title: string
    form?:{
      formState: FormInstance<any>,
      idForm:string,
      nameButton: string
    }
}

function DrawerForm(props: IProps){
    function onDrawer(){
        props.setVisible(!props.visible);
      }

    function onCancelForm(){
      confirm({
        title: 'Certeza que deseja cancelar?',
        icon: <ExclamationCircleOutlined />,
        content: 'Todas informações alteradas no formulário serão perdidas!',
        onOk() {
          props.setVisible(!props.visible);
          props.form?.formState.resetFields(); 
        },
        onCancel() {
        },
      });
    }
    return(
        <>
        <Drawer
          title={props.title}
          width={550}
          onClose={onDrawer}
          visible={props.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            props.footer ? 
            props.footer :
            props.form &&
            <>
              <Space>
                <Button type="primary" className="m-1 mr-2" htmlType="submit" form={props.form.idForm}>{props.form.nameButton}</Button>
              </Space>
              <Space>
                <Button onClick={onCancelForm}>Cancelar</Button>
              </Space>
            </>
          }
        >
            {props.children &&  props.children}
        </Drawer>
        </>
    )
}

export default DrawerForm;