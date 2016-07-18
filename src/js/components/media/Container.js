import React, {PropTypes, Component} from 'react'
import Menu from '../common/Menu'
import Bread from '../common/Bread'
import Search from './Search'
import MediaTable from './MediaTable'
class Container extends Component {
    renderTable(){
        const {posts} = this.props
        let tips = '请使用“注册邮箱”搜索和批量导入完成媒体配置'
        if(g_userInfo.admin == ''){
            tips = '请使用“注册邮箱”搜索完成媒体配置'
        }
        if(posts.length===0) {
            return(
                <div className="tips">
                    <p>{tips}</p>
                </div>
            )
        } else {
            return(
                <MediaTable  catalog={this.props.catalog} lists={this.props.posts}></MediaTable>
            )
        }
    }
    render() {
        let isAdmin = this.props.isAdmin ==='1' ? true : false
        const menuObj = []
        if(isAdmin) {
            menuObj.push({
                id: 1,
                name:'功能',
                classValue:'',
                list:[{
                    name:'邮件列表',
                    classValue:'',
                    url:'/media/mailList'
                }]
            })
        }
        menuObj.push({
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
        })
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
                            {this.renderTable()}
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
    catalog:PropTypes.object,
    selectedMedia:PropTypes.object.isRequired
}

export default Container
