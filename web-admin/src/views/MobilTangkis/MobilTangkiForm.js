import React, { Component } from 'react'
import { Card, Col, Row, Form, Input, Radio, Button, Alert } from 'antd'

import NumericInput from '../NumericInput'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 19,
      offset: 5,
    },
  },
}

class MobilTangkiForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fileObjs: [],
    }

    this.form = props.form
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    this.form.validateFieldsAndScroll((err, itemData) => {
      if (!err) {
        this.props.onSubmitItem(itemData)
      }
    })
  }

  render() {
    // console.log('user form props', this.props)
    const { getFieldDecorator } = this.props.form
    const { loading, error, onBack, itemData } = this.props

    return (
      <div className="animated fadeIn">
        <Card title={!itemData ? 'Create Mobil Tangki' : 'Edit Mobil Tangki'}>
          {error ? (
            <Alert message="Error" description={this.props.error.message} type="error" showIcon />
          ) : (
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col span={12}>
                  <Form.Item label="No. Polisi" {...formItemLayout}>
                    {getFieldDecorator('nopol', {
                      initialValue: itemData && itemData.nopol,
                      rules: [
                        { required: true, message: 'Please input no. polisi!', whitespace: true },
                      ],
                    })(<Input placeholder="Input your no. polisi.." />)}
                  </Form.Item>
                  <Form.Item label="KL" {...formItemLayout}>
                    {getFieldDecorator('KL', {
                      initialValue: itemData && itemData.KL,
                      rules: [{ required: true, message: 'Please input KL!', whitespace: true }],
                    })(<NumericInput placeholder="Input your KL.." style={{ width: '100%' }} />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Year" {...formItemLayout}>
                    {getFieldDecorator('year', {
                      initialValue: itemData && itemData.year,
                      rules: [{ required: true, message: 'Please input year!', whitespace: true }],
                    })(<NumericInput placeholder="Input your year.." style={{ width: '100%' }} />)}
                  </Form.Item>
                  <Form.Item label="Status" {...formItemLayout}>
                    {getFieldDecorator('status', {
                      initialValue: itemData && itemData.status,
                      rules: [
                        { required: true, message: 'Please select status!', whitespace: true },
                      ],
                    })(
                      <Radio.Group>
                        <Radio value="Active">Active</Radio>
                        <Radio value="Non-Active">Non-Active</Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item {...tailFormItemLayout}>
                <Button loading={loading} type="primary" htmlType="submit">
                  {itemData === null ? 'Submit' : 'Update'}
                </Button>
                <Button
                  onClick={() => onBack()}
                  disabled={loading || error}
                  type="default"
                  style={{ marginLeft: '8px' }}>
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          )}
        </Card>
      </div>
    )
  }
}

export default Form.create()(MobilTangkiForm)
