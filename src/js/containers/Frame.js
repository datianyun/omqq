import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/common/Header'
import Wrap from '../components/common/Wrap'
import * as TodoActions from '../actions'

class Frame extends Component {
  render() {
    const { todos, actions } = this.props
    return (
        <div>
            <Header></Header>
            <Wrap></Wrap>
        </div>
    )
  }
}

Frame.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Frame)
