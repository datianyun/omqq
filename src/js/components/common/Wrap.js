import React, {PropTypes, Component} from 'react'
import Menu from './Menu'
import MailCon from '../mailList/index'
class Wrap extends Component {
    render() {
        const menuObj = [{
            id: 1,
            name:'功能',
            classValue:'active',
            list:[{
                name:'邮件配置',
                classValue:'active',
                url:'/media/index'
            },{
                name:'其他配置',
                classValue:'',
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
        return (
            <div className="wrap">
                <div className="container">
                    <div className="row">
                        <div className="side">
                            <Menu activeMenu={menuObj}></Menu>
                        </div>
                        <MailCon actions={this.props.actions} searchCon={this.props.selectedMedia} mediaObj={this.props.posts}></MailCon>
                    </div>
                </div>
            </div>
        )
    }
}

Wrap.propTypes = {
    actions: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    selectedMedia:PropTypes.object.isRequired
}

export default Wrap
