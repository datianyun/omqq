import React, {PropTypes, Component} from 'react'
import Menu from '../common/Menu'
import Bread from '../common/Bread'
import Tabs from '../common/Tabs'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
class Container extends Component {
    renderTables(){
        let products = [{
            id: 1,
            name: "Item name 1",
            price: 100
        },{
            id: 2,
            name: "Item name 2",
            price: 100
        },{
            id: 1,
            name: "Item name 1",
            price: 100
        },{
            id: 2,
            name: "Item name 2",
            price: 100
        },{
            id: 1,
            name: "Item name 1",
            price: 100
        },{
            id: 2,
            name: "Item name 2",
            price: 100
        },{
            id: 1,
            name: "Item name 1",
            price: 100
        },{
            id: 2,
            name: "Item name 2",
            price: 100
        },{
            id: 1,
            name: "Item name 1",
            price: 100
        },{
            id: 2,
            name: "Item name 2",
            price: 100
        },{
            id: 1,
            name: "Item name 1",
            price: 100
        },{
            id: 2,
            name: "Item name 2",
            price: 100
        },{
            id: 1,
            name: "Item name 1",
            price: 100
        },{
            id: 2,
            name: "Item name 2",
            price: 100
        }];

        return(
            <BootstrapTable data={products} pagination={true}>
                <TableHeaderColumn dataField="id" isKey={true}>Product ID</TableHeaderColumn>
                <TableHeaderColumn dataField="name">Product Name</TableHeaderColumn>
                <TableHeaderColumn dataField="price">Product Price</TableHeaderColumn>
            </BootstrapTable>
        )
    }
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
        let breadTitle = '统计数据'
        const {selectMedia} = this.props.actions
        let comp = [
            {
                key:'整体统计',
                func: this.renderTables.bind(this)
            },
            {
                key:'单篇统计',
                func: this.renderTables.bind(this)
            },
        ]
        return (
            <div className="wrap">
                <div className="container">
                    <div className="row">
                        <div className="side">
                            <Menu activeMenu={menuObj}></Menu>
                        </div>
                        <div className="main">
                            <Bread title={breadTitle}></Bread>
                            <div className="breadcrumb-mod statics">
                                <a className="btn btn-primary">总阅读数：128.85万</a>
                                <a className="btn btn-primary">总阅读数：128.85万</a>
                                <a className="btn btn-primary">总阅读数：128.85万</a>
                            </div>
                            <Tabs comp={comp}></Tabs>
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
