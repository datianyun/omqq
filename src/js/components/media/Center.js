import React, {PropTypes, Component} from 'react'
import Menu from '../common/Menu'
import Bread from '../common/Bread'
import SearchHeader from './SearchHeader'
import DataTable from './DataTable'
import Paging from '../common/Paging'

class Container extends Component {

    renderContent(){
        const {posts} = this.props
        let breadTitle = '数据查询'
        const {selectMedia} = this.props.actions
        const options = Object.assign({},this.props.selectedMedia,{
            total:this.props.total
        })
        if(posts.length===0) {
            return(
                <div className="main">
                    <Bread title={breadTitle}></Bread>
                    <SearchHeader config={this.props.analysis} type="search" selectMedia={selectMedia}></SearchHeader>
                    <div className="tips">
                        <p></p>
                    </div>
                </div>
            )
        } else {
            return(
                <div className="main">
                    <Bread title={breadTitle}></Bread>
                    <SearchHeader config={this.props.analysis} type="search" selectMedia={selectMedia}></SearchHeader>
                    <DataTable  config={this.props.analysis} lists={this.props.posts}></DataTable>
                    <Paging  options={options} selectMedia={selectMedia}></Paging>
                </div>
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
                classValue:'',
                url:'/media/mediaBdConfig'
            },
            {
                name:'数据查询',
                classValue:'active',
                url:'/media/mediaBdManage'
            }]
        })
        return (
            <div className="wrap">
                <div className="container">
                    <div className="row">
                        <div className="side">
                            <Menu activeMenu={menuObj}></Menu>
                        </div>
                        {this.renderContent()}
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
    analysis:PropTypes.object,
    selectedMedia:PropTypes.object.isRequired
}

export default Container
