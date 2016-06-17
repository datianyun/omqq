import React, {PropTypes, Component} from 'react'
import 'whatwg-fetch'
var Alert = require('react-s-alert').default
import 'whatwg-fetch'
import {params} from '../../lib/param'

class DataTable extends Component {
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
        let id = parseInt(e.currentTarget.dataset.id)
        let dataSet = []
        dataSet['media_id'] = id
        fetch('/media/mediaBdUnbundling', {
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
    renderButton(item){
        return(
            <td data-id={item['Fid']} onClick={this.handleClick.bind(this)}>
                <a>清除</a>
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
                <th>总阅读数</th>
                <th>总推荐数</th>
                <th>总订阅数</th>
                <th>拓展人员</th>
                <th>详细数据</th>
                <th>操作</th>
            </tr>
        )
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
                        <td>{item['Freadpv']}</td>
                        <td>{item['Frecommend']}</td>
                        <td>{item['Ffans']}</td>
                        <td>{item['Fbd_owner']}</td>
                        <td ><a href={"/media/statisticsManage?media_id="+item['Fid']}>查看</a></td>
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

DataTable.propTypes = {
    type:PropTypes.string,
    lists: PropTypes.array
}

export default DataTable
