import React, {PropTypes, Component} from 'react'
import Menu from '../common/Menu'
import MailCon from './index'
class Wrap extends Component {
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
        },
        {
            id: 2,
            name:'配置',
            classValue:'',
            list:[{
                name:'查询列表',
                classValue:'',
                url:'/media/index'
            },{
                name:'配置我的自媒体',
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
                        <MailCon total={this.props.total} actions={this.props.actions} searchCon={this.props.selectedMedia} mediaObj={this.props.posts}></MailCon>
                    </div>
                </div>
            </div>
        )
    }
}

Wrap.propTypes = {
    actions: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    total:PropTypes.string,
    selectedMedia:PropTypes.object.isRequired
}

export default Wrap
