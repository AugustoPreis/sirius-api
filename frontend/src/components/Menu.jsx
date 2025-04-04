import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu as MenuAntd, Modal } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { useAuth } from '../providers/AuthProvider';

export default function Menu() {
  const auth = useAuth();
  const navigate = useNavigate();
  const options = [
    {
      key: 'sair',
      label: 'Sair',
      onClick: () => logout(),
      icon: <PoweroffOutlined />,
      style: { marginLeft: 'auto', color: 'red' },
    },
  ];

  const logout = () => {
    Modal.confirm({
      title: 'Atenção',
      content: 'Deseja realmente sair do sistema?',
      okText: 'Sim',
      onOk: () => {
        auth.logout();
        navigate('/entrar');
      },
    });
  }

  return (
    <MenuAntd items={options}
      mode='horizontal'
      style={{
        borderRadius: 10,
        marginBottom: '3vh',
      }} />
  );
}