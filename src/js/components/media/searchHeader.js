import React, {PropTypes, Component} from 'react'
import classnames from 'classnames'
import {throttle} from '../../lib/param'
import Alert from 'react-s-alert'
import 'whatwg-fetch'

class Search extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            key :''
        }
    }
    validateAdd(){
        let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/g
        if(!reg.test(this.state.key)){
            Alert.error('邮箱格式错误', {
                effect: '',
                position: 'top',
                timeout: 3000,
                onClose: function(e){
                    Alert.closeAll();
                }
             });
             return false
        }
        return true
    }
    handleSearch(e){
        if(!this.validateAdd()){
            return;
        }
        let initialState = {
            type: this.props.type,
            key : this.state.key,
            path:'/media/mediaBdSearch',
            currentPage:1,
            perNum:5
        }
        //解决搜索不存在media后删除输入返回原先数据的问题
        if(initialState.key == ''){
            initialState.path = '/media/mediaBdSearch'
        }
        this.props.selectMedia(initialState)
    }
    handleChange(e){
        this.setState({ key: e.target.value.trim()})
    }

    render() {
        let ButtonText = '搜索'
        let placeholder = '媒体ID/媒体名称/注册邮箱/拓展人员RTX'
        return (
            <div className="breadcrumb-mod">
                <div className="userBread clearfix">
                    <div className="expNameCon form-section">
                        <select  name="select" className="form-control input-sm" >
                            <option value="0">运营分类</option>
                            <option value="-1">已删除</option>
                            <option value="1">未审核</option>
                            <option value="2">已发布</option>
                            <option value="3">未通过</option>
                            <option value="4">已结束</option>
                            <option value="5">已撤回</option>
                            <option value="8">已发文</option>
                        </select>
                    </div>
                    <div className="expNameCon form-section">
                        <select  name="select" className="form-control input-sm">
                            <option value="0">运营状态</option>
                            <option value="-1">已删除</option>
                            <option value="1">未审核</option>
                            <option value="2">已发布</option>
                            <option value="3">未通过</option>
                            <option value="4">已结束</option>
                            <option value="5">已撤回</option>
                            <option value="8">已发文</option>
                        </select>
                    </div>
                    <div className="expNameCon data">
                        <input type="text"  className="form-control" placeholder={placeholder} onChange={this.handleChange.bind(this)}></input>
                    </div>
                    <div className="input-group-btn">
                        <button type="button" className="btn btn-secondary search" onClick={this.handleSearch.bind(this)}>搜索</button>

                    </div>
                    <div className="option">
                        <select  name="select" className="form-control input-sm">
                            <option value="0">总阅读数从高到低排序</option>
                            <option value="1">总阅读数从低到高排序</option>
                            <option value="2">总推荐数从高到低排序</option>
                            <option value="3">总推荐数从低到高排序</option>
                            <option value="4">总订阅数从高到低排序</option>
                            <option value="5">总订阅数从低到高排序</option>
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

Search.propTypes = {
    type: PropTypes.string.isRequired,
    selectMedia: PropTypes.func.isRequired
}

export default Search
