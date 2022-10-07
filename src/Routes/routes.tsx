import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, NavLink, useHistory } from "react-router-dom";
import { Button, Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  InboxOutlined,
  PlusCircleOutlined,
  EyeOutlined,
  LogoutOutlined,
  CarOutlined,
  LaptopOutlined
} from "@ant-design/icons";

import "../Assets/Css/style.bundle.css";
import Dashboard from "../Pages/Dashboard";
import PrivatedRoute from "./PrivetedRouter";
import './index.css'
import { CriarToken } from "./services";
import Produtos from "../Pages/Cadatros/Produtos";


function Router() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

function Routes() {
  const history = useHistory();
  
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;

  //Pegando token FIXO, acesso por 1hora no sistema 
  useEffect(() => {
    CriarToken().then(res => {
      localStorage.setItem("@tokenWa", res.data.Token);
    })
  },[])
  //Toda atualização na pagina (f5), o sistema pega um novo tokem...


  interface IItems {
    key: string;
    icon: JSX.Element;
    children: any[] | null;
    label: string;
    path?: string;
  }

  let items: IItems[] = [
    {
      key: "1",
      icon: <PieChartOutlined />,
      children: null,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      key: "sub1",
      icon: <PlusCircleOutlined />,
      label: "Cadastros",
      path: "/cadastros",
      children: [
        {
          key: "2",
          label: "Gestão de Equipes",
          path: "/cadastros/gestaoEquipes",
        },
        {
          key: "3",
          label: "Gestão de Produtos",
          path: "/cadastros/produtos",
        },
      ],
    },
  ];
  function onCollapse(collapsed: boolean) {
    setCollapsed(collapsed);
  }

  return (
    <>
      <Switch>
        <Route path={["/","/dashboard", "/cadastros"]}>
          <Route>
            <Layout
              hasSider
              style={{
                minHeight: "100vh",
              }}
            >
              <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
                
              >
                <div className="logo"></div>
                <Menu defaultSelectedKeys={["1"]} theme="dark" mode="inline">
                  {items.map((item) => {
                    return (
                      <>
                        {!item.children ? (
                          <Menu.Item key={item.key}>
                            {item.icon}
                            <span>{item.label}</span>
                            <NavLink to={item.path || ""}></NavLink>
                          </Menu.Item>
                        ) : (
                          <SubMenu
                            key={item.key}
                            title={
                              <span>
                                {item.icon}
                                <span>{item.label}</span>
                              </span>
                            }
                          >
                            {item.children.map((chil) => {
                              return (
                                <Menu.Item key={chil.key}>
                                  <NavLink to={chil.path || ""}></NavLink>
                                    {chil.label}
                                </Menu.Item>
                              );
                            })}
                          </SubMenu>
                        )}
                      </>
                    );
                  })}
                </Menu>
                  
              </Sider>
              <Layout className="site-layout" >
                <Content style={{ margin: '0 16px' }}>
                  <div
                    className="site-layout-background"
                    style={{
                      marginTop: 20,
                      padding: 24,
                      minHeight: 360,
                      backgroundColor: "#fff"
                    }}
                  >
                    <Switch>
                      {/* PrivatedRoute: Controla a autenticação do usuário, se não tiver tokem ele não deixa a página ser renderizada */}
                      <PrivatedRoute path="/dashboard" component={Dashboard} />
                      <PrivatedRoute path="/cadastros/produtos" component={Produtos} />
                    </Switch>
                  </div>
                </Content>
                <Footer
                  style={{
                    textAlign: "center",
                  }}
                >
                  Wa Project | Empresa de Soluções em Sistema ©2022
                </Footer>
              </Layout>
            </Layout>
          </Route>
        </Route>
      </Switch>
    </>
  );
}

export default Router;
