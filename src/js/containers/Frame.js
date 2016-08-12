import React, {Component,PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Header from '../components/common/Header'
import Wrap from '../components/mailList/Wrap'
import Footer from '../components/common/Footer'
import * as TodoActions from '../actions'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import Alert from 'react-s-alert';
class Frame extends Component {
    constructor(props) {
        super(props)
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
        const {posts,actions,total,selectedMedia,menus} = this.props
        return (
            <div>
                <Wrap menus={menus} actions={actions} posts={posts} selectedMedia={selectedMedia} total={total}></Wrap>
                <Footer></Footer>
                <Alert stack={{limit: 3}} />
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
    const {selectedMedia, postsByMedia,menus} = state
    const pkey = selectedMedia.currentPage + '-' + selectedMedia.key
    const {isFetching,lastUpdated,items: posts,total} = postsByMedia[pkey] || {
        isFetching: true,
        items: []
    }
    return {
        selectedMedia,
        posts,
        total,
        menus,
        isFetching,
        lastUpdated
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Frame)
