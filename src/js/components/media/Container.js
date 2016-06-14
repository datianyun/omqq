import React, {PropTypes, Component} from 'react'
import Menu from '../common/Menu'
import Bread from '../common/Bread'
import Search from './Search'
import MediaTable from './MediaTable'
class Container extends Component {
    render() {
        const menuObj = [{
            id: 1,
            name:'功能',
            classValue:'',
            list:[{
                name:'邮件列表',
                classValue:'',
                url:'/media/mailList'
            }]
        },{
            id: 2,
            name:'数据',
            classValue:'active',
            list:[{
                name:'媒体配置',
                classValue:'active',
                url:'/media/mediaBdConfig'
            },
            {
                name:'数据查询',
                classValue:'',
                url:'/media/mediaBdManage'
            }]
        }]
        let breadTitle = '媒体配置'
        const {selectMedia} = this.props.actions
        return (
            <div className="wrap">
                <div className="container">
                    <div className="row">
                        <div className="side">
                            <Menu activeMenu={menuObj}></Menu>
                        </div>
                        <div className="main">
                            <Bread title={breadTitle}></Bread>
                            <Search type="search" selectMedia={selectMedia}></Search>
                            <MediaTable  lists={this.props.posts}></MediaTable>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Container.propTypes = {
    actions: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    total:PropTypes.string,
    selectedMedia:PropTypes.object.isRequired
}

export default Container
