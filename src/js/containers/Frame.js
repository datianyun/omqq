import React, {Component,PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Header from '../components/common/Header'
import Wrap from '../components/mailList/Wrap'
import Footer from '../components/common/Footer'
import * as TodoActions from '../actions'

class Frame extends Component {
      constructor(props) {
        super(props)
        //this.handleChange = this.handleChange.bind(this)
        //this.handleRefreshClick = this.handleRefreshClick.bind(this)
      }

      componentDidMount() {
        const { dispatch, selectedMedia } = this.props
        dispatch(TodoActions.fetchPostsIfNeeded(selectedMedia))
      }

      componentWillReceiveProps(nextProps) {
        if (nextProps.selectedMedia !== this.props.selectedMedia) {
          const { dispatch, selectedMedia } = nextProps
          dispatch(TodoActions.fetchPostsIfNeeded(selectedMedia))
        }
      }

    render() {
        const {
            posts,
            actions,
            selectedMedia
        } = this.props
        return (
             <div>
                <Header></Header>
                <Wrap actions={actions} posts={posts} selectedMedia={selectedMedia}></Wrap>
                <Footer></Footer>
             </div>
        )
    }
}

Frame.propTypes = {
    actions: PropTypes.object.isRequired,
    selectedMedia: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
}


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        actions: bindActionCreators(TodoActions, dispatch)
    }
}

function mapStateToProps(state) {
  const { selectedMedia, postsByMedia,todos} = state
  const pkey = selectedMedia.currentPage + '-' + selectedMedia.key
  const {isFetching,lastUpdated,items: posts} = postsByMedia[pkey] || {
    isFetching: true,
    items: []
  }

  return {
    selectedMedia,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Frame)
