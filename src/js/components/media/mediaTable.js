import React, {PropTypes, Component} from 'react'
import 'whatwg-fetch'
var Alert = require('react-s-alert').default
import 'whatwg-fetch'
import {params} from '../../lib/param'

class MailTable extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            key :''
        }
    }
    handleDelete(e){
        let target = e.target;
        let fid = parseInt(target.dataset.id)
        let femail = target.dataset.email
        this.props.deleteMedia({
            id: fid,
            email:femail
        })
    }
    handleClick(e){
        let target = e.currentTarget
        let cname = target.className
        let reg_email = target.parentNode.parentNode.childNodes[4].textContent
        let bd_owner = this.state.key
        let dataSet = []
        dataSet['reg_email'] = reg_email
        dataSet['bd_owner'] = bd_owner
        if(cname === 'claim') {
            fetch('/media/mediaBdBinding', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params(dataSet)
            }).then(function(response) {
                return response.json()
            }).then(function(json) {
                if(json.response.code===0){
                    let salert = Alert.info('保存成功', {
                        effect: '',
                        position: 'top',
                        timeout: 3000,
                        onClose: function(e){
                             Alert.close(salert);
                        }
                    });
                    window.location.href="/media/mediaBdManage"
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
    }
    handleChange(e){
        this.setState({ key: e.target.value.trim()})
    }
    renderButton(item){
        let buttons=[]
        let opt = item['Fbinding_str']
        for(let i=0;i<opt.length;i++){
            if(opt[i]==='claim'){
                buttons.push({
                    className:'claim',
                    value:'认领',
                    type:'input'
                })
            }else if(opt[i] ==='claimedByThis'){
                buttons.push({
                    className:'claimedByThis',
                    value:'已被认领到该业务',
                    type:'text'
                })
            }else if(opt[i] ==='claimedByOther'){
                buttons.push({
                    className:'clear',
                    value:'已被认领到其他业务',
                    type:'text'
                })
            }
        }
        return(
            <td data-id={item['Fid']}>
                {buttons.map((btn,i)=>
                    <a key={i} className={btn.className} onClick={this.handleClick.bind(this)}>{btn.value}</a>
                )}
            </td>
        )
    }
    renderTR(){
        return (
            <tr>
                <th>媒体ID</th>
                <th>媒体名称</th>
                <th>验证微信</th>
                <th>来源</th>
                <th>注册邮箱</th>
                <th>运营分类</th>
                <th>MMS分类</th>
                <th>运营状态</th>
                <th>拓展人员</th>
                <th>操作</th>
            </tr>
        )
    }
    renderOwner(item){
        if(item['Fif_bd'] =='1') {
            return (
                <td>{item['Fbd_owner']}</td>
            )
        } else {
            return (
                <td className="owner"><input type="text" onChange={this.handleChange.bind(this)}></input></td>
            )
        }
    }
    renderTBODY(ITEM){
        return (
            <tbody className="mediaList">
                {this.props.lists.map((item,i)=>
                    <tr key={i}>
                        <td>{item['Fid']}</td>
                        <td>{item['Fname']}</td>
                        <td>{item['Fwechat']}</td>
                        <td>{item['Fsource_value']}</td>
                        <td>{item['Freg_email']}</td>
                        <td>{item['Fcatalog_value']}</td>
                        <td>{item['Fmms_catalog']}</td>
                        <td>{item['Fstatus_value']}</td>
                        {this.renderOwner(item)}
                        {this.renderButton(item)}
                    </tr>
                )}
            </tbody>
        )
    }
    render() {
        return (
            <table className="table-b">
                <thead>
                    {this.renderTR()}
                </thead>
                {this.renderTBODY()}
            </table>
        )
    }
}

MailTable.propTypes = {
    type:PropTypes.string,
    lists: PropTypes.array
}

export default MailTable
