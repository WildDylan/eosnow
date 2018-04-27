import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card, Button } from 'antd'
import { color } from 'utils'
import { Page } from 'components'
import styles from './index.less'
import ReactJson from 'react-json-view'

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

function Dashboard ({ dashboard, loading, dispatch }) {
  const {
    data,
    codeData,
    tableData,
    walletsData,
    keysData
  } = dashboard;

  const lockAccount = () => {
    // lock wallet
    dispatch({
      type: `dashboard/lock`
    })
  }

  const unlockAccount = () => {
    // unlock wallet
    dispatch({
      type: `dashboard/unlock`
    })
  }

  return (
    <Page className={styles.dashboard}>

      <Row gutter={24}>
        <Card title="YOUR WALLET">
          <Row gutter={24}>
            <Card title="options for your wallet" bordered={false}>
              <Button
                type="primary"
                shape="circle"
                size="large"
                icon="lock"
                loading={loading.effects[`dashboard/lock`]}
                onClick={lockAccount}
              />
              <Button
                style={{marginLeft: 10}}
                type="danger"
                shape="circle"
                size="large"
                icon="unlock"
                loading={loading.effects[`dashboard/unlock`]}
                onClick={unlockAccount}
              />
            </Card>
          </Row>
          {/*<Row gutter={24}>*/}
            {/*<Card title="generate public and private key" bordered={false}>*/}

            {/*</Card>*/}
          {/*</Row>*/}
          {/*<Row gutter={24}>*/}
            {/*<Card title="create account with owner and active key" bordered={false}>*/}

            {/*</Card>*/}
          {/*</Row>*/}
        </Card>
      </Row>

      <Row gutter={24}>
        <Card title="EOSNOW">
          <Row gutter={24}>
            <Card title="eosnow table: now ( data in this contract )" bordered={false}>
              <ReactJson src={tableData.originData} collapsed={false} />
            </Card>
          </Row>
          <Row gutter={24}>
            <Card title="eosnow account usage" bordered={false}>
              <ReactJson src={data.originData} collapsed={false} />
            </Card>
          </Row>
          <Row gutter={24}>
            <Card title="eosnow get code" bordered={false}>
              <ReactJson src={codeData.originData} collapsed={true} />
            </Card>
          </Row>
        </Card>
      </Row>

      <Row gutter={24}>
        <Card title="OTHER">
          <Row gutter={24}>
            <Card title="wallets in this node" bordered={false}>
              <ReactJson src={walletsData.originData} collapsed={false} />
            </Card>
          </Row>
          <Row gutter={24}>
            <Card title="keys in this node" bordered={false}>
              <ReactJson src={keysData.originData} collapsed={false} />
            </Card>
          </Row>
        </Card>
      </Row>
    </Page>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ dashboard, loading }) => ({ dashboard, loading }))(Dashboard)
