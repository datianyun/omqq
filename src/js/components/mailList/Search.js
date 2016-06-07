import React, {PropTypes, Component} from 'react'
import classnames from 'classnames'
var Alert = require('react-s-alert').default
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
        let isVal = true
        if(this.props.validate){
            isVal = this.props.validate(this.state.key)
        }
        if(!isVal){
            Alert.error('邮箱已存在', {
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
        if(this.props.type === 'add'){
            let flag = this.validateAdd()
            if(!flag){
                return;
            }
        }
        let initialState = {
            type: this.props.type,
            key : this.state.key,
            path:'/media/mediaSearch',
            currentPage:1,
            perNum:5
        }
        //解决搜索不存在media后删除输入返回原先数据的问题
        if(initialState.key == ''){
            initialState.path = '/media/mailListData'
        }
        this.props.selectMedia(initialState)
    }
    handleChange(e){
        this.setState({ key: e.target.value.trim()})
    }
    render() {
        let ButtonText = '搜索'
        let placeholder = '媒体ID/媒体名称/注册邮箱'
        if(this.props.type==='add'){
            ButtonText = '添加'
            placeholder = '注册邮箱'
        }
        return (
            <div className="breadcrumb-mod">
                <div className="userBread clearfix">
                    <div className="expNameCon">
                        <input type="text"  className="form-control" placeholder={placeholder} onChange={this.handleChange.bind(this)}></input>
                    </div>
                    <div className="input-group-btn">
                        <button type="button" className=""className={classnames({
                            'btn btn-primary search':true
                        })} onClick={this.handleSearch.bind(this)}>{ButtonText}</button>
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
