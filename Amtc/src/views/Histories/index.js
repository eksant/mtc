import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import { StyleSheet, Dimensions, View } from 'react-native'
import { Container, Content, Card, CardItem, Text, Button } from 'native-base'
import FAIcon from 'react-native-vector-icons/FontAwesome'

import Loading from '../../components/Loading'
import Message from '../../components/Message'
import HistoryList from './HistoryList'
import ConnectAlert from '../../components/ConnectAlert'
import { getChecklist } from '../../store/checklist/checklist.actions'

const window = Dimensions.get('window')
const { height } = window

class Histories extends Component {
  componentDidMount() {
    this.handleRefresh()
  }

  async handleRefresh() {
    const resp = await this.props.getChecklist()
    // console.log('RESP HISTORY DID MOUNT', resp)
    if (resp.error && resp.error.name === 'JsonWebTokenError') {
      this.props.alertWithType('error', 'Error', resp.message)
      Actions.replace('login')
    }
  }

  render() {
    // console.log('PROPS HISTORIES', this.props.checklist)
    const { loading, error, message, checklist } = this.props.checklist
    // console.log(checklist)

    return (
      <View style={styles.container}>
        <Container>
          <Content padder>
            <Card>
              <CardItem header bordered>
                <Text>History Checklist ({checklist.length > 0 ? checklist.length : 0})</Text>
                <Button iconLeft transparent primary onPress={() => this.handleRefresh()}>
                  <FAIcon name="refresh" style={{ fontSize: 20, left: 10, color: 'green' }} />
                </Button>
              </CardItem>
              <CardItem>
                <Content style={styles.content}>
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message error message={message} />
                  ) : (
                    <HistoryList items={checklist} />
                  )}
                </Content>
              </CardItem>
            </Card>
          </Content>
        </Container>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
  },
  content: {
    height: height / 1.52,
    marginBottom: 5,
  },
})

const mapStateToProps = state => {
  return {
    checklist: state.checklist,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getChecklist,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectAlert(Histories))
