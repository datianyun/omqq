import React, {PropTypes, Component} from 'react'
import Menu from '../common/Menu'
import MailCon from './index'
import Bread from '../common/Bread'
import Wizard from '../common/Wizard'
import AddMail from './AddMail'
import AddMedia from './AddMedia'
import SendMail from './SendMail'
class MediaCon extends Component {
    renderAddMail(){
        return (
            <AddMail></AddMail>
        )
    }
    renderAddMedia(){
        return (
            <AddMedia></AddMedia>
        )
    }
    renderSendMail(){
        return (
            <SendMail></SendMail>
        )
    }
    render() {
        const menuObj = [{
            id: 1,
            name:'功能',
            classValue:'active',
            list:[{
                name:'邮件配置',
                classValue:'',
                url:'/media/index'
            },{
                name:'其他配置',
                classValue:'active',
                url:'/media/index'
            }]
        },
        {
            id: 2,
            name:'配置',
            classValue:'',
            list:[{
                name:'邮件配置',
                classValue:'',
                url:'/media/index'
            },{
                name:'其他配置',
                classValue:'',
                url:'/media/index'
            }]
        }]
        const comp = [this.renderAddMail,this.renderAddMedia,this.renderSendMail]
        return (

            <div className="wrap">
                <div className="container">
                    <div className="row">
                        <div className="side">
                            <Menu activeMenu={menuObj}></Menu>
                        </div>
                        <div className="main">
                            <Bread title='邮件配置'></Bread>
                            <Wizard comp={comp}></Wizard>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

MediaCon.propTypes = {
    actions: PropTypes.object.isRequired
}

export default MediaCon
