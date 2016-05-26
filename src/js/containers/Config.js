import React, {Component,PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Header from '../components/common/Header'
import MediaCon from '../components/mailList/MediaCon'
import Footer from '../components/common/Footer'
import * as TodoActions from '../actions'

class Config extends Component {
      constructor(props) {
        super(props)
      }

    render() {
        console.log(this.props)
        const {actions} = this.props
        return (
             <div>
                <Header></Header>
                <MediaCon actions={actions}></MediaCon>
                <Footer></Footer>
             </div>
        )
    }
}

Config.propTypes = {
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
)(Config)
