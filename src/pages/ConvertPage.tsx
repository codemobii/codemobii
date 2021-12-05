import React from 'react';
import styled from 'styled-components';
import ConvertForm from '../components/ConvertForm';
import { Row, Col } from 'antd';
import { DEFAULT_MARKET, MarketProvider } from '../utils/markets';
import { useLocalStorageState } from '../utils/utils';

const Wrapper = styled.div`
  height: 100%;
  .borderNone .ant-select-selector {
    border: none !important;
  }
`;

export default function ConvertPage() {
  const [marketAddress, setMarketAddress] = useLocalStorageState(
    'marketAddress',
    DEFAULT_MARKET?.address.toBase58(),
  );
  return (
    <div
      style={{
        width: '100%',
        marginTop: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Wrapper style={{ flex: 1 }} className="page_card">
        <Row justify="center">
          <Col>
            <MarketProvider
              marketAddress={marketAddress}
              setMarketAddress={setMarketAddress}
            >
              <ConvertForm />
            </MarketProvider>
          </Col>
        </Row>
      </Wrapper>
    </div>
  );
}
