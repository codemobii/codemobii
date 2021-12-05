import BalancesTable from './BalancesTable';
import OpenOrderTable from './OpenOrderTable';
import React from 'react';
import { Tabs, Typography } from 'antd';
import FillsTable from './FillsTable';
import FloatingElement from '../layout/FloatingElement';
import FeesTable from './FeesTable';
import { useOpenOrders, useBalances, useMarket } from '../../utils/markets';

const { Paragraph } = Typography;
const { TabPane } = Tabs;

export default function Index() {
  const { market } = useMarket();
  const renderTabBar = (props, DefaultTabBar) => (
    <div style={{ paddingLeft: 10 }}>
      <DefaultTabBar {...props} className="site-custom-tab-bar" />
    </div>
  );
  return (
    <FloatingElement style={{ flex: 1 }}>
      {/* <Typography>
        <Paragraph style={{ color: 'rgba(255,255,255,0.5)' }}>
          Make sure to go to Balances and click Settle to send out your funds.
        </Paragraph>
        <Paragraph style={{ color: 'rgba(255,255,255,0.5)' }}>
          To fund your wallet, <a href="https://www.sollet.io">sollet.io</a>.
          You can get SOL from FTX, Binance, BitMax, and others. You can get
          other tokens from FTX.{' '}
        </Paragraph>
      </Typography> */}
      <Tabs
        defaultActiveKey="orders"
        style={{ backgroundColor: '#3B3363' }}
        renderTabBar={renderTabBar}
      >
        <TabPane tab="Open Orders" key="orders">
          <div style={{ marginTop: -15 }}>
            <OpenOrdersTab />
          </div>
        </TabPane>
        <TabPane tab="Recent Trade History" key="fills">
          <div style={{ marginTop: -15 }}>
            <FillsTable />
          </div>
        </TabPane>
        <TabPane tab="Balances" key="balances">
          <div style={{ marginTop: -15 }}>
            <BalancesTab />
          </div>
        </TabPane>
        {market && market.supportsSrmFeeDiscounts ? (
          <TabPane tab="Fee discounts" key="fees">
            <div style={{ marginTop: -15 }}>
              {' '}
              <FeesTable />
            </div>
          </TabPane>
        ) : null}
      </Tabs>
    </FloatingElement>
  );
}

const OpenOrdersTab = () => {
  const openOrders = useOpenOrders();

  return <OpenOrderTable openOrders={openOrders} />;
};

const BalancesTab = () => {
  const balances = useBalances();

  return <BalancesTable balances={balances} />;
};
