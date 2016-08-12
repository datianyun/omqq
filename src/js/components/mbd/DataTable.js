import React, {PropTypes, Component} from 'react'
import 'whatwg-fetch'
var Alert = require('react-s-alert').default
import {params} from '../../lib/param'
import Dialog from '../common/Dialog'
import classnames from 'classnames'

class DataTable extends Component {
    constructor(props, context) {
        super(props, context)
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
                <th>拓展站点</th>
                <th>认领到行业分类</th>
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
                        <td>{item['Fbd_site']}</td>
                        <td data-value={item['Fquyu_catalog']}>{item['Fquyu_catalog_vlaue']}</td>
                    </tr>
                )}
            </tbody>
        )
    }
    render() {
        return (
            <div>
                <table className="table-b">
                    <thead>
                        {this.renderTR()}
                    </thead>
                    {this.renderTBODY()}
                </table>
            </div>
        )
    }
}

DataTable.propTypes = {
    type:PropTypes.string,
    lists: PropTypes.array
}

export default DataTable
