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
        const {actions,mails,medias} = this.props
        return (
             <div>
                <Header></Header>
                <MediaCon actions={actions} mails={mails} medias={medias}></MediaCon>
                <Footer></Footer>
             </div>
        )
    }
}

Config.propTypes = {
    mails: PropTypes.array.isRequired,
    medias:PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}


function mapStateToProps(state) {
  return {
    mails: state.mails,
    medias:state.medias
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
