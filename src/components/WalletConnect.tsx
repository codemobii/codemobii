import React from 'react';
import styled from 'styled-components';
import { Dropdown, Button, Menu } from 'antd';
import { useWallet } from '../utils/wallet';
import LinkAddress from './LinkAddress';

// #7b29da

const WalletButton = styled(Button)`
  background: linear-gradient(180deg, #ff5677 0%, #b958a5 100%);
  padding-bottom: 7px;
  border: 0;
`;

export default function WalletConnect() {
  const { connected, wallet, select, connect, disconnect } = useWallet();
  const publicKey = (connected && wallet?.publicKey?.toBase58()) || '';

  const menu = (
    <Menu>
      {connected && <LinkAddress shorten={true} address={publicKey} />}
      <Menu.Item key="3" onClick={select}>
        Change Wallet
      </Menu.Item>
    </Menu>
  );

  return (
    <WalletButton
      type="primary"
      size="large"
      onClick={connected ? disconnect : connect}
      // overlay={menu}
    >
      {connected ? 'Disconnect' : 'Connect'}
    </WalletButton>
  );
}
