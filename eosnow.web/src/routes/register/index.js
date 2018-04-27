import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Form, Input } from 'antd'
import { config } from 'utils'
import styles from './index.less'

const FormItem = Form.Item;

const Register = ({
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
      dispatch({ type: 'register/register', payload: values })
    })
  }

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <img alt="logo" src={config.logo} />
      </div>
      <form>
        <FormItem hasFeedback style={{marginBottom: 10}}>
          {getFieldDecorator('WALLET_NAME', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input onPressEnter={handleOk} placeholder="WALLET NAME" />)}
        </FormItem>
        <FormItem>
          <Button type="primary" onClick={handleOk} loading={loading.effects.register}>
            CREATE
          </Button>
        </FormItem>

      </form>
    </div>
  )
};

Register.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
};

export default connect(({ loading }) => ({ loading }))(Form.create()(Register))
