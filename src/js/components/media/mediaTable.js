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

    }
    renderButton(item){
        let buttons=[]
        return(
            <td data-id={item['Fid']} onClick={this.handleClick.bind(this)}>
                {buttons.map((btn,i)=>
                    <a key={i} className={btn.className}>{btn.value}</a>
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
        if(item['Fbd_owner'] =='') {
            return (
                <td><input type="text" value={item['Fbd_owner']}></input></td>
            )
        } else {
            return (
                <td>{item['Fbd_owner']}</td>
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
