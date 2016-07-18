import React, {Component,PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Header from '../components/common/Header'
import Wrap from '../components/media/Container'
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

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedMedia !== this.props.selectedMedia) {
            const { dispatch, selectedMedia } = nextProps
            dispatch(TodoActions.fetchPostsIfNeeded(selectedMedia))
        }
        if(nextProps.alerts.info!==null){
            const { dispatch} = nextProps
            let alertInfo = nextProps.alerts.info +',添加失败'
            Alert.error(alertInfo, {
                effect: '',
                position: 'top',
                timeout: 3000,
                onClose: function(e){
                    Alert.closeAll();
                }
            });
            dispatch(TodoActions.deleteAlert())
        }
    }

    render() {
        const {posts,actions,total,selectedMedia,mediaCata,isAdmin} = this.props

        return (
            <div>
                <Wrap isAdmin={isAdmin} actions={actions} posts={posts} catalog={mediaCata} selectedMedia={selectedMedia} total={total}></Wrap>
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
    const {selectedMedia, postsByMedia,alerts} = state
    const isAdmin = g_userInfo.admin
    const pkey = selectedMedia.currentPage + '-' + selectedMedia.key
    const {isFetching,lastUpdated,items: posts,total,catalog:mediaCata} = postsByMedia[pkey] || {
        isFetching: true,
        items: []
    }
    return {
        selectedMedia,
        posts,
        total,
        alerts,
        isAdmin,
        mediaCata,
        isFetching,
        lastUpdated
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Frame)
