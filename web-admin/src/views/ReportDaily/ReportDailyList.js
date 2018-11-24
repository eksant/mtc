import React, { Component } from 'react'
import moment from 'moment'
import { Card, Tag, Divider, Radio, Table, Alert } from 'antd'

import { logout } from '../../utils/logout'

class ChecklistRequest extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: 'All',
    }
  }

  columns = [
    {
      title: 'Created Date',
      key: 'createdAt',
      render: record => {
        return <span>{moment(record.createdAt).format('DD MMM YYYY hh:mm')}</span>
      },
    },
    {
      title: 'No. Pol',
      dataIndex: 'mobiltangki.nopol',
    },
    {
      title: 'Kapasitas MT',
      dataIndex: 'mobiltangki.KL',
    },
    {
      title: 'Requested By',
      dataIndex: 'createdBy.username',
    },
    {
      title: 'Roles',
      dataIndex: 'createdBy.roles',
    },
    {
      title: 'Count Checklist',
      render: record => {
        const totalCheck = 5
        const totalUncheck = 10

        return <span>{`${totalCheck} check, ${totalUncheck} uncheck`}</span>
      },
    },
    {
      title: 'Status',
      render: record => {
        return (
          <Tag
            color={
              record.status === 'Waiting'
                ? '#2db7f5'
                : record.status === 'Request'
                ? '#108ee9'
                : record.status === 'Rejected'
                ? '#f50'
                : '#87d068'
            }>
            {record.status}
          </Tag>
        )
      },
    },
  ]

  handleChangeStatus(e) {
    this.setState({
      status: e.target.value,
    })
  }

  render() {
    // console.log('checklist list props: ', props)
    const { status } = this.state
    const { loading, error, onRefresh, checklists = [] } = this.props
    const itemChecklists =
      checklists !== null ? checklists.map(checklist => ({ ...checklist, key: checklist._id })) : []
    const dataSource =
      status === 'All'
        ? itemChecklists
        : itemChecklists.filter(checklist => checklist.status === status)

    if (error && error.message.indexOf('session expired')) {
      setTimeout(() => {
        logout()
      }, 3000)
    }

    return (
      <div className="animated fadeIn">
        <Card
          title="Daily AMT Checklist"
          extra={
            <span>
              <a
                href="#/approval-checklist"
                onClick={() => onRefresh()}
                disabled={error}
                style={{ marginRight: '10px', color: '#A6A6A6' }}>
                <i className="fa fa-refresh" /> Refresh
              </a>
              <Divider type="vertical" />
              Status Request : &nbsp;
              <Radio.Group
                name="statusGroup"
                onChange={this.handleChangeStatus.bind(this)}
                defaultValue={status}
                disabled={error}>
                <Radio value="All">All</Radio>
                <Radio value="Waiting">Waiting</Radio>
                <Radio value="Approved">Approved</Radio>
                <Radio value="Rejected">Rejected</Radio>
              </Radio.Group>
            </span>
          }>
          {error ? (
            <Alert message="Error" description={error.message} type="error" showIcon />
          ) : (
            <div>
              <Table
                columns={this.columns}
                dataSource={dataSource}
                loading={loading}
                size={'small'}
              />
            </div>
          )}
        </Card>
      </div>
    )
  }
}

export default ChecklistRequest
