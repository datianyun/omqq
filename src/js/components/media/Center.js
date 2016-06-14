import React, {PropTypes, Component} from 'react'
import Menu from '../common/Menu'
import Bread from '../common/Bread'
import Search from './SearchHeader'
import DataTable from './DataTable'
import Paging from '../common/Paging'
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
                classValue:'',
                url:'/media/mediaBdConfig'
            },
            {
                name:'数据查询',
                classValue:'active',
                url:'/media/mediaBdManage'
            }]
        }]
        let breadTitle = '数据查询'
        const {selectMedia} = this.props.actions
        const options = Object.assign({},selectMedia,{
            total:this.props.total
        })
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
                            <DataTable  lists={this.props.posts}></DataTable>
                            <Paging  options={options} selectMedia={selectMedia}></Paging>
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
