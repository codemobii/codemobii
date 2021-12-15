import {
  AppstoreAddOutlined,
  InfoCircleOutlined,
  PieChartOutlined,
  PlusCircleOutlined,
  RetweetOutlined,
  SettingOutlined,
  SlidersOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Button, Col, Menu, Popover, Row, Select } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import styled from 'styled-components';
import { useWallet } from '../utils/wallet';
import { ENDPOINTS, useConnectionConfig } from '../utils/connection';
import Settings from './Settings';
import CustomClusterEndpointDialog from './CustomClusterEndpointDialog';
import { EndpointInfo } from '../utils/types';
import { notify } from '../utils/notifications';
import { Connection } from '@solana/web3.js';
import WalletConnect from './WalletConnect';
import AppSearch from './AppSearch';
import { getTradePageUrl } from '../utils/markets';

const Wrapper = styled.div`
  background-color: rgb(59, 51, 99, 0.6);
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0px 10px;
  flex-wrap: wrap;
`;
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #ff5677;
  font-weight: bold;
  cursor: pointer;
  img {
    height: 30px;
    margin-right: 8px;
  }
`;

const EXTERNAL_LINKS = {
  '/learn':
    'https://docs.projectserum.com/trade-on-serum-dex/trade-on-serum-dex-1',
  '/add-market': 'https://serum-academy.com/en/add-market/',
  '/wallet-support': 'https://serum-academy.com/en/wallet-support',
  '/dex-list': 'https://serum-academy.com/en/dex-list/',
  '/developer-resources': 'https://serum-academy.com/en/developer-resources/',
  '/explorer': 'https://solscan.io',
  '/srm-faq': 'https://projectserum.com/srm-faq',
  '/swap': 'https://swap.projectserum.com',
};

export default function TopBar() {
  const { connected, wallet } = useWallet();
  const {
    endpoint,
    endpointInfo,
    setEndpoint,
    availableEndpoints,
    setCustomEndpoints,
  } = useConnectionConfig();
  const [addEndpointVisible, setAddEndpointVisible] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [searchFocussed, setSearchFocussed] = useState(false);

  const handleClick = useCallback(
    (e) => {
      if (!(e.key in EXTERNAL_LINKS)) {
        history.push(e.key);
      }
    },
    [history],
  );

  const onAddCustomEndpoint = (info: EndpointInfo) => {
    const existingEndpoint = availableEndpoints.some(
      (e) => e.endpoint === info.endpoint,
    );
    if (existingEndpoint) {
      notify({
        message: `An endpoint with the given url already exists`,
        type: 'error',
      });
      return;
    }

    const handleError = (e) => {
      console.log(`Connection to ${info.endpoint} failed: ${e}`);
      notify({
        message: `Failed to connect to ${info.endpoint}`,
        type: 'error',
      });
    };

    try {
      const connection = new Connection(info.endpoint, 'recent');
      connection
        .getBlockTime(0)
        .then(() => {
          setTestingConnection(true);
          console.log(`testing connection to ${info.endpoint}`);
          const newCustomEndpoints = [
            ...availableEndpoints.filter((e) => e.custom),
            info,
          ];
          setEndpoint(info.endpoint);
          setCustomEndpoints(newCustomEndpoints);
        })
        .catch(handleError);
    } catch (e) {
      handleError(e);
    } finally {
      setTestingConnection(false);
    }
  };

  const endpointInfoCustom = endpointInfo && endpointInfo.custom;
  useEffect(() => {
    const handler = () => {
      if (endpointInfoCustom) {
        setEndpoint(ENDPOINTS[0].endpoint);
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [endpointInfoCustom, setEndpoint]);

  const tradePageUrl = location.pathname.startsWith('/cuckoo/')
    ? location.pathname
    : getTradePageUrl();

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const width = dimensions?.width;

  return (
    <>
      <CustomClusterEndpointDialog
        visible={addEndpointVisible}
        testingConnection={testingConnection}
        onAddCustomEndpoint={onAddCustomEndpoint}
        onClose={() => setAddEndpointVisible(false)}
      />
      <Wrapper>
        <LogoWrapper onClick={() => history.push(tradePageUrl)}>
          <img
            src={'https://cuckoodex.com/static/media/logo.fdfe2730.png'}
            alt=""
          />
          {'CUCKOO'}
        </LogoWrapper>
        <Menu
          mode="horizontal"
          onClick={handleClick}
          selectedKeys={[location.pathname]}
          style={{
            borderBottom: 'none',
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'flex-end',
            flex: 1,
          }}
        >
          {width > 1000 && (
            <>
              <Menu.Item key={tradePageUrl} style={{ margin: '0 10px 0 20px' }}>
                Trade
              </Menu.Item>
              {!searchFocussed && (
                <Menu.Item key="/swap" style={{ margin: '0 10px' }}>
                  <a
                    href={EXTERNAL_LINKS['/swap']}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Swap
                  </a>
                </Menu.Item>
              )}
              {connected &&
                (!searchFocussed || location.pathname === '/balances') && (
                  <Menu.Item key="/balances" style={{ margin: '0 10px' }}>
                    Balances
                  </Menu.Item>
                )}
              {connected &&
                (!searchFocussed || location.pathname === '/orders') && (
                  <Menu.Item key="/orders" style={{ margin: '0 10px' }}>
                    Order
                  </Menu.Item>
                )}
              {connected &&
                (!searchFocussed || location.pathname === '/convert') && (
                  <Menu.Item key="/convert" style={{ margin: '0 10px' }}>
                    Convert
                  </Menu.Item>
                )}
              {(!searchFocussed ||
                location.pathname === '/list-new-market') && (
                <Menu.Item key="/list-new-market" style={{ margin: '0 10px' }}>
                  Add market
                </Menu.Item>
              )}
            </>
          )}
        </Menu>
        {width > 1000 && (
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingRight: 5,
              }}
            >
              <AppSearch
                onFocus={() => setSearchFocussed(true)}
                onBlur={() => setSearchFocussed(false)}
                focussed={searchFocussed}
                width={searchFocussed ? '350px' : '35px'}
              />
            </div>
            <div>
              <Row
                align="middle"
                style={{ paddingLeft: 5, paddingRight: 5 }}
                gutter={16}
              >
                <Col>
                  <PlusCircleOutlined
                    style={{ color: '#FF5677' }}
                    onClick={() => setAddEndpointVisible(true)}
                  />
                </Col>
                <Col>
                  <Popover
                    content={endpoint}
                    placement="bottomRight"
                    title="URL"
                    trigger="hover"
                  >
                    <InfoCircleOutlined style={{ color: '#FF5677' }} />
                  </Popover>
                </Col>
                <Col>
                  <Select
                    onSelect={setEndpoint}
                    value={endpoint}
                    style={{ marginRight: 8, width: '150px' }}
                  >
                    {availableEndpoints.map(({ name, endpoint }) => (
                      <Select.Option value={endpoint} key={endpoint}>
                        {name}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </div>
          </>
        )}

        {connected && (
          <div>
            <Popover
              content={<Settings autoApprove={wallet?.autoApprove} />}
              placement="bottomRight"
              title="Settings"
              trigger="click"
            >
              <Button style={{ marginRight: 8 }}>
                <SettingOutlined />
                Settings
              </Button>
            </Popover>
          </div>
        )}
        <div>
          <WalletConnect />
        </div>
      </Wrapper>

      {width < 1000 && (
        <div
          style={{
            position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100%',
            backgroundColor: '#2C254A',
            borderTop: '1px solid #473F72',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#fff',
            padding: '10px',
            zIndex: 100,
          }}
        >
          <Link
            to={tradePageUrl}
            style={{
              width: '18%',
              display: 'block',
              textAlign: 'center',
              color: '#fff',
            }}
          >
            <PieChartOutlined style={{ fontSize: 24, lineHeight: 0 }} />
            <p style={{ fontSize: 10, lineHeight: 0 }}>Trade</p>
          </Link>
          <Link
            to="/balances"
            style={{
              width: '18%',

              color: '#fff',
              display: 'block',
              textAlign: 'center',
            }}
          >
            <SlidersOutlined style={{ fontSize: 24, lineHeight: 0 }} />
            <p style={{ fontSize: 10, lineHeight: 0 }}>Balances</p>
          </Link>
          <Link
            to="/orders"
            style={{
              width: '18%',
              color: '#fff',

              display: 'block',
              textAlign: 'center',
            }}
          >
            <UnorderedListOutlined style={{ fontSize: 24, lineHeight: 0 }} />
            <p style={{ fontSize: 10, lineHeight: 0 }}>Orders</p>
          </Link>
          <Link
            to="/convert"
            style={{
              width: '18%',
              color: '#fff',

              display: 'block',
              textAlign: 'center',
            }}
          >
            <RetweetOutlined style={{ fontSize: 24, lineHeight: 0 }} />
            <p style={{ fontSize: 10, lineHeight: 0 }}>Convert</p>
          </Link>
          <Link
            to="/list-new-market"
            style={{
              width: '18%',
              color: '#fff',

              display: 'block',
              textAlign: 'center',
            }}
          >
            <AppstoreAddOutlined style={{ fontSize: 24, lineHeight: 0 }} />
            <p style={{ fontSize: 10, lineHeight: 0 }}>Add Market</p>
          </Link>
        </div>
      )}
    </>
  );
}
