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
    handleMuti(){
        document.getElementById('ifile').click()
    }
    handleFile(e){
        let target = e.currentTarget
        let file = target.files[0]
        var formData = new FormData();

        // 文件名称，文件对象
        formData.append(file.name, file);
        fetch('/media/mediaBdImport', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
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
                    timeout: 3000,
                    onClose: function(e){
                        Alert.closeAll();
                    }
                });
            }
        }).catch(function(ex) {
            Alert.error(ex, {
                effect: '',
                position: 'top',
                timeout: 3000,
                onClose: function(e){
                    Alert.closeAll();
                }
             });
        })
    }
    render() {
        let ButtonText = '搜索'
        let placeholder = '注册邮箱'
        return (
            <div className="breadcrumb-mod">
                <div className="userBread clearfix">
                    <div className="expNameCon">
                        <input type="text"  className="form-control" placeholder={placeholder} onChange={this.handleChange.bind(this)}></input>
                    </div>
                    <div className="input-group-btn">
                        <button type="button" className="btn btn-secondary search" onClick={this.handleSearch.bind(this)}>搜索</button>
                        <button type="button" className="btn btn-secondary search" onClick={this.handleMuti.bind(this)}>批量导入</button>
                        <input type="file" className="hide" id="ifile" onChange={this.handleFile.bind(this)}></input>
                        <a className="link" href="/media/mediaBdTemplate">下载excel导入模版</a>
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
