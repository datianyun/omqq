import React, {PropTypes, Component} from 'react'
import classnames from 'classnames'
import {throttle} from '../../lib/param'
import Alert from 'react-s-alert'
import 'whatwg-fetch'
import {params} from '../../lib/param'
class Search extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            key :'',
            type:'id'
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
    handleMuti(){
        document.getElementById('ifile').click()
    }
    handleType(e){
        this.setState({ type: e.target.value.trim()})
    }
    handleHover(e){
        let target = e.currentTarget
        let cName = target.className
        if(cName.indexOf('show') !==-1){
            target.className="link"
        } else {
            target.className="link showTip"
        }
    }
    handleFile(e){
        let target = e.currentTarget
        let file = target.files[0]
        var formData = new FormData();

        // 文件名称，文件对象
        formData.append('file', file)
        formData.append('type',this.state.type)
        fetch('/media/mediaBdImport', {
            method: 'POST',
            credentials: 'same-origin',
            body: formData
        }).then(function(response) {
            return response.json()
        }).then(function(json) {
            if(json.response.code===0){
                let salert = Alert.info('批量保存成功', {
                    effect: '',
                    position: 'top',
                    timeout: 3000,
                    onClose: function(e){
                         Alert.close(salert);
                    }
                });
            }else{
                Alert.error(json.response.msg, {
                    effect: '',
                    position: 'top',
                    timeout: 'none',
                    html: true,
                    onClose: function(e){
                        Alert.closeAll();
                    }
                });
            }
            target.value = ''
        }).catch(function(ex) {
            Alert.error(ex, {
                effect: '',
                position: 'top',
                timeout: 3000,
                html: true,
                onClose: function(e){
                    Alert.closeAll();
                }
             });
        })
    }
    renderButton(){
        if(g_userInfo&&g_userInfo.admin==='1'){
            return (
                <div className="input-group-btn">
                    <button type="button" className="btn btn-secondary search" onClick={this.handleSearch.bind(this)}>搜索</button>
                    <div className="form-group">
                        <label for="select" className="form-label">按</label>
                        <select name="select" className="form-control search-type" onChange={this.handleType.bind(this)}>
                            <option value="id">媒体ID</option>
                            <option value="email">注册邮箱</option>
                        </select>
                    </div>
                    <button type="button" className="btn btn-secondary search" onClick={this.handleMuti.bind(this)}>批量导入</button>
                    <input type="file" className="hide" id="ifile" onChange={this.handleFile.bind(this)}></input>
                    <a className="link" href="/media/mediaBdTemplate" onMouseOver={this.handleHover.bind(this)} onMouseOut={this.handleHover.bind(this)}>
                        下载excel导入模版<i className="icon icon-help-gray"></i>
                        <div className="tooltip-inlineblock">
                            <div className="tooltip tooltip-top  notes" >
                                <div className="tooltip-arrow"></div>
                                <div className="tooltip-inner">
                                    <p>1."自媒体账号类型"支持：注册邮箱 或 媒体ID。根据您选择的“自媒体账号类型”，请在模板首列"自媒体账号" 中填入对应信息。</p>
                                    <p>2.注意单次批量导入数据时不能超过500条</p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            )
        } else {
            return (
                <div className="input-group-btn">
                    <button type="button" className="btn btn-secondary search" onClick={this.handleSearch.bind(this)}>搜索</button>
                </div>
            )
        }
    }
    render() {
        let ButtonText = '搜索'
        let placeholder = '注册邮箱/媒体ID'
        return (
            <div className="breadcrumb-mod">
                <div className="userBread clearfix">
                    <div className="expNameCon">
                        <input type="text"  className="form-control" placeholder={placeholder} onChange={this.handleChange.bind(this)}></input>
                    </div>
                    {this.renderButton()}
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
