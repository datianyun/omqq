import React, {Component,PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Header from '../components/common/Header'
import Wrap from '../components/media/Static'
import Footer from '../components/common/Footer'
import * as TodoActions from '../actions'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import Alert from 'react-s-alert';
class Static extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { dispatch, selectedMedia,selectedArticle } = this.props
        let id = /(([^?&=]+)(?:=([^?&=]*))*)/g.exec(window.location.search)[3]
        //请求自媒体的详细信息接口
        selectedMedia.search = '&id='+id
        selectedMedia.path = '/media/mediaStatistic'
        selectedMedia.type = 'statics'
        dispatch(TodoActions.fetchPostsIfNeeded(selectedMedia))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedMedia !== this.props.selectedMedia) {
            const { dispatch, selectedMedia } = nextProps
            dispatch(TodoActions.fetchPostsIfNeeded(selectedMedia))
        }
        if (nextProps.selectedArticle !== this.props.selectedArticle) {
            const { dispatch, selectedArticle } = nextProps
            dispatch(TodoActions.fetchPostsIfNeeded(selectedArticle))
        }
    }

    render() {
        const {actions,selectedMedia,statics,selectedArticle,articles,articleData,isAdmin} = this.props
        return (
            <div>
                <Wrap isAdmin={isAdmin} articleData={articleData} statics={statics} actions={actions} articles={articles} selectedMedia={selectedMedia} selectedArticle={selectedArticle}></Wrap>
                <Footer></Footer>
                <Alert stack={{limit: 3}} />
            </div>
        )
    }
}

Static.propTypes = {
    actions: PropTypes.object.isRequired,
    selectedMedia: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        actions: bindActionCreators(TodoActions, dispatch)
    }
}

function mapStateToProps(state) {
    const {selectedMedia, postsByMedia,statics,selectedArticle,articles,articleData} = state
    const isAdmin = g_userInfo.admin
    const pkey = selectedMedia.currentPage + '-' +selectedMedia.search + '-' +selectedMedia.key + '-' + selectedMedia.path
    const {items:sposts} = postsByMedia[pkey] || {
        items: []
    }
    if(sposts&&sposts.length!==0){
        statics.posts = sposts
    }
    const akey = selectedArticle.currentPage + '-' +selectedArticle.search + '-' +selectedArticle.key + '-' + selectedArticle.path
    const {items:aposts} = postsByMedia[akey] || {
        items: []
    }
    if(aposts&&aposts.length!==0){
        articles.posts = aposts
    }
    return {
        selectedMedia,
        selectedArticle,
        articles,
        isAdmin,
        articleData,
        statics
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Static)
