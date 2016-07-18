import React, {PropTypes, Component} from 'react'
import 'whatwg-fetch'
var Alert = require('react-s-alert').default
import {params} from '../../lib/param'
class MailTable extends Component {
    constructor(props, context) {
        super(props, context)
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
        let target = e.target;
        let fid = target.parentNode.dataset.id
        if(target.className==='extend'){
            fetch('/media/extendMail', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params({
                    media_id: fid
                })
            }).then(function(response) {
                return response.json()
            }).then(function(json) {
                if(json.response.code===0){
                    let salert = Alert.info('续期成功', {
                        effect: '',
                        position: 'top',
                        timeout: 3000,
                        offset: 100,
                        onClose: function(e){
                             Alert.close(salert);
                        }
                    });
                }else{
                    Alert.info(json.response.msg, {
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
        }else if(target.className==='config') {
            window.location.href = '/media/mailConfig?media_id='+fid
        }else if(target.className==='clear') {
            fetch('/media/clearMail', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params({
                    media_id: fid
                })
            }).then(function(response) {
                return response.json()
            }).then(function(json) {
                if(json.response.code===0){
                    let salert = Alert.info('清除配置成功', {
                        effect: '',
                        position: 'top',
                        timeout: 3000,
                        onClose: function(e){
                             Alert.close(salert);
                        }
                    });
                    window.location.reload()
                }else{
                    Alert.info(json.response.msg, {
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
    renderButton(item){
        if(item.mid!==undefined){
            if(item.config_del_btns.length > 0) {
                return(
                    <td onClick={this.handleDelete.bind(this)}><a data-email={item.Freg_email} data-id={item.mid}>删除</a></td>
                )
            } else {
                if(item.mtype!==undefined) {
                    return(
                        <td onClick={this.handleDelete.bind(this)}><a data-email={item.Freg_email} data-id={item.mid}>删除</a></td>
                    )
                } else {
                    return(
                        <td ></td>
                    )
                }
            }
        } else{
            let buttons = []
            let opt = item['operate_btns']
            for(let i=0;i<opt.length;i++){
                if(opt[i]==='configBtn'){
                    buttons.push({
                        className:'config',
                        value:'配置'
                    })
                }else if(opt[i] ==='extendBtn'){
                    buttons.push({
                        className:'extend',
                        value:'续期'
                    })
                }else if(opt[i] ==='clearBtn'){
                    buttons.push({
                        className:'clear',
                        value:'清除'
                    })
                }
            }
            return(
                <td data-id={item['Fid']} onClick={this.handleClick.bind(this)}>{buttons.map((btn,i)=>
                    <a key={i} className={btn.className}>{btn.value}</a>
                )}</td>
            )
        }
    }
    renderTR(){
        if(this.props.type==='add') {
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
                    <th>邮件状态</th>
                    <th>操作</th>
                </tr>
            )
        } else {
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
                    <th>邮件状态</th>
                    <th>起始时间</th>
                    <th>结束时间</th>
                    <th>操作</th>
                </tr>
            )
        }
    }
    renderTBODY(ITEM){
        if(this.props.type==='add') {
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
                            <td>{item['Fmail_config_status']}</td>
                            {this.renderButton(item)}
                        </tr>
                    )}
                </tbody>
            )
        } else {
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
                            <td>{item['Fmail_config_status']}</td>
                            <td>{item['Fbd_email_starttime']}</td>
                            <td>{item['Fbd_email_endtime']}</td>
                            {this.renderButton(item)}
                        </tr>
                    )}
                </tbody>
            )
        }
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
    deleteMedia: PropTypes.func.isRequired,
    type:PropTypes.string,
    lists: PropTypes.array
}

export default MailTable
