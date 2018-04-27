import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input } from 'antd'
import { config } from 'utils'
import styles from './index.less'
import { routerRedux } from 'dva/router'

const FormItem = Form.Item

const Login = ({
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'login/login', payload: values })
    })
  }

  function create() {
    // 创建一个新的，跳转注册界面
    dispatch(routerRedux.push({
      pathname: '/register',
    }))
  }

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <img alt="logo" src={config.logo} />
      </div>
      <form>
        <FormItem hasFeedback style={{marginBottom: 0}}>
          {getFieldDecorator('WALLET_NAME', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input onPressEnter={handleOk} placeholder="WALLET NAME" />)}
        </FormItem>
        <FormItem hasFeedback style={{marginBottom: 10}}>
          {getFieldDecorator('WALLET_PRIVATE_KEY', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input type="password" onPressEnter={handleOk} placeholder="WALLET PRIVATE KEY" />)}
        </FormItem>
        <FormItem>
          <Button type="primary" onClick={handleOk} loading={loading.effects.login}>
            LOGIN
          </Button>
          <Button onClick={create} loading={loading.effects.login}>
            CREATE ONE ?
          </Button>
        </FormItem>

      </form>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ loading }) => ({ loading }))(Form.create()(Login))
