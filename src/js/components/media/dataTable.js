import React, {PropTypes, Component} from 'react'
import 'whatwg-fetch'
var Alert = require('react-s-alert').default
import 'whatwg-fetch'
import {params} from '../../lib/param'
import Dialog from '../common/Dialog'
import classnames from 'classnames'

class DataTable extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            owner :'',
            catalog: 'all',
            postData:{
                url:'',
                dataSet:[]
            },
            admin: true,
            modalIsOpen : false
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
    handleChange(e){
        this.setState({ owner: e.target.value.trim()})
    }
    handleCatalog(e){
        let value = e.target.value.trim()
        this.setState({ catalog: value})
    }
    handlePost(data){
        fetch(data.url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params(data.dataSet)
        }).then(function(response) {
            return response.json()
        }).then(function(json) {
            if(json.response.code===0){
                let salert = Alert.info('修改成功', {
                    effect: '',
                    position: 'top',
                    timeout: 600,
                    onClose: function(e){
                         Alert.close(salert);
                         window.location.href="/media/mediaBdManage"
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
    handleClick(e){
        let target = e.currentTarget
        let id = parseInt(target.parentNode.dataset.id)
        let url = target.dataset.url
        let flag = target.className
        let dataSet = []
        let tr = target.parentNode.parentNode
        let email = tr.childNodes[4].textContent
        let own = tr.childNodes[11].textContent
        let catalog = tr.childNodes[12].dataset.value
        let owner = own
        let postData={}
        if(flag==='clear'){
            dataSet['media_id'] = id
            postData.url = url
            postData.dataSet = dataSet
            this.handlePost(postData)
        } else {
            this.setState({ catalog: catalog})
            this.setState({ owner: owner})
            dataSet['media_id'] = id
            dataSet['reg_email'] = email
            dataSet['bd_owner'] = owner
            dataSet['quyu_catalog'] = catalog
            dataSet['type'] = 'turn'
            if(flag === 'turn') {
                this.setState({admin: false})
            } else {
                this.setState({admin: true})
            }
            postData.url = url
            postData.dataSet = dataSet
            this.setState({postData: postData})
            this.openModal()
            return
        }
    }
    renderButton(item){
        let buttons=[]
        let opt = item['Fop_str']
        let urls =item['Fop_url']
        for(let i=0;i<opt.length;i++){
            if(opt[i]==='clear'){
                buttons.push({
                    className:'clear',
                    value:'清除',
                    url:urls[i]
                })
            }else if(opt[i] ==='change'){
                buttons.push({
                    className:'change',
                    value:'修改',
                    url:urls[i]
                })
            }else if(opt[i] ==='turn'){
                buttons.push({
                    className:'turn',
                    value:'移交',
                    url:urls[i]
                })
            }
        }
        return(
            <td data-id={item['Fid']}>
                {buttons.map((btn,i)=>
                    <a key={i} className={btn.className} data-url={btn.url} onClick={this.handleClick.bind(this)}>{btn.value}</a>
                )}
            </td>
        )
    }
    renderSelect(item){
        return (
            <td data-value={item['Fquyu_catalog']}>{item['Fquyu_catalog_vlaue']}</td>
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
                <th>认领到行业</th>
                <th>详细数据</th>
                <th>操作</th>
            </tr>
        )
    }
    renderOwner(item){
        /*
        let buttons = item['Fop_str'].join()
        if(buttons.indexOf('change')!==-1||buttons.indexOf('turn')!==-1){
            return(
                <td className="owner" data-value={item['Fbd_owner']}><input type="text" placeholder="未填" defaultValue={item['Fbd_owner']} onChange={this.handleChange.bind(this)}></input></td>
            )
        } else {
            return (
                <td>{item['Fbd_owner']}</td>
            )
        }
        */
        return (
            <td>{item['Fbd_owner']}</td>
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
                        {this.renderOwner(item)}
                        {this.renderSelect(item)}
                        <td ><a href={"/media/statisticsManage?media_id="+item['Fid']}>查看</a></td>
                        {this.renderButton(item)}
                    </tr>
                )}
            </tbody>
        )
    }
    renderDialog(item){
        const name = this.state.owner
        const catalog = this.state.catalog
        const isAdmin = this.state.admin
        let data = this.props.config.quyuCata
        let arr = [];
        for (let key in data) {
            arr.push({
                value:key,
                text:data[key]
            })
        }
        return (
            <div className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="AccountName" className="form-label">拓展人员</label>
                    <div className="form-control Fname">
                        <input type="text" placeholder="未填" defaultValue={name} onChange={this.handleChange.bind(this)}></input>
                    </div>
                </div>
                <div className={classnames({
                    'form-group': true,
                    'hide': !isAdmin
                })}>
                    <label htmlFor="AccountName" className="form-label">认领到行业</label>
                    <div className="form-control Fname">
                        <select  name="select" defaultValue={catalog} className="form-control input-sm" onChange={this.handleCatalog.bind(this)}>
                            {arr.map((status,i)=>
                                <option key={i}  value={status.value}>{status.text}</option>
                            )}
                        </select>
                    </div>
                </div>
            </div>
        )
    }
    openModal() {
        this.setState({modalIsOpen: true})
    }
    closeModal() {
        this.setState({modalIsOpen: false})
    }
    handleModalCloseRequest() {
       // opportunity to validate something and keep the modal open even if it
       // requested to be closed
       this.setState({modalIsOpen: false})
    }

    handleSaveClicked(e) {
       let data = this.state.postData
       data.dataSet['bd_owner'] = this.state.owner
       data.dataSet['quyu_catalog'] = this.state.catalog
       this.handlePost(data)
       this.closeModal()
    }
    render() {
        const isOpen = this.state.modalIsOpen
        return (
            <div>
                <table className="table-b">
                    <thead>
                        {this.renderTR()}
                    </thead>
                    {this.renderTBODY()}
                </table>
                <Dialog handleSaveClicked={this.handleSaveClicked.bind(this)} openModal={this.openModal.bind(this)} closeModal={this.closeModal.bind(this)} handleModalCloseRequest={this.handleModalCloseRequest.bind(this)} isOpen={isOpen} renderHTML={this.renderDialog.bind(this)}></Dialog>
            </div>
        )
    }
}

DataTable.propTypes = {
    type:PropTypes.string,
    lists: PropTypes.array
}

export default DataTable
