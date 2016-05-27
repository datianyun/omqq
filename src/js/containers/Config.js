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

      componentDidMount() {
          console.log(1)
      }

      componentWillReceiveProps(nextProps) {
          if (nextProps.selectedMedia !== this.props.selectedMedia) {
              const { dispatch, selectedMedia } = nextProps
              dispatch(TodoActions.fetchPostsIfNeeded(selectedMedia))
          }
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
    selectedMedia: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired
}


function mapStateToProps(state) {
    return {
        selectedMedia: state.selectedMedia,
        mails: state.mails,
        medias: state.medias
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        actions: bindActionCreators(TodoActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Config)
