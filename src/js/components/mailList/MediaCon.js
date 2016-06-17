import React, {PropTypes, Component} from 'react'
import Menu from '../common/Menu'
import MailCon from './index'
import Bread from '../common/Bread'

import AddMail from './AddMail'
import AddMedia from './AddMedia'
import SendMail from './SendMail'
class MediaCon extends Component {
    handleSave(text) {
      if (text.length !== 0) {
        this.props.actions.addMail(text)
      }
    }
    handleDelete(id) {
      if (id !== undefined) {
        id = parseInt(id)
        this.props.actions.deleteMail(id)
      }
    }
    renderAddMail(){
        return (
            <AddMail mails={this.props.mails} actions={this.props.actions} onSave={this.handleSave.bind(this)} onDelete={this.handleDelete.bind(this)}></AddMail>
        )
    }
    renderAddMedia(){
        return (
            <AddMedia medias={this.props.medias} actions={this.props.actions}></AddMedia>
        )
    }
    renderSendMail(){
        return (
            <SendMail handleSave={this.props.handleSave} addTime={this.props.actions.addTime} time={this.props.time}></SendMail>
        )
    }
    render() {
        const menuObj = [{
            id: 1,
            name:'功能',
            classValue:'active',
            list:[{
                name:'邮件列表',
                classValue:'active',
                url:'/media/mailList'
            }]
        }]
        const comp = [this.renderAddMail.bind(this),this.renderAddMedia.bind(this),this.renderSendMail.bind(this)]
        let breadTitle = '邮件配置 > ' + this.props.getConfig.Fname
        return (
            <div className="wrap">
                <div className="container">
                    <div className="row">
                        <div className="side">
                            <Menu activeMenu={menuObj}></Menu>
                        </div>
                        <div className="main">
                            <Bread title={breadTitle}></Bread>
                            <AddMail mails={this.props.mails} actions={this.props.actions} onSave={this.handleSave.bind(this)} onDelete={this.handleDelete.bind(this)}></AddMail>
                            <AddMedia medias={this.props.medias} actions={this.props.actions}></AddMedia>
                            <SendMail handleSave={this.props.handleSave} addTime={this.props.actions.addTime} time={this.props.time}></SendMail>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

MediaCon.propTypes = {
    actions: PropTypes.object.isRequired,
    medias: PropTypes.array.isRequired,
    handleSave: PropTypes.func.isRequired,
    mails: PropTypes.array.isRequired
}

export default MediaCon
