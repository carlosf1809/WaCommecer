import React from 'react';
import './App.css';
import Router from './Routes/routes';
import ptBR from '../node_modules/antd/lib/locale/pt_BR';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.css';
function App() {
  return (
    <ConfigProvider locale={ptBR}>
      <Router/>
    </ConfigProvider>
  );
}

export default App;
