import React, {PropTypes, Component} from 'react'
import Menu from '../common/Menu'
import Bread from '../common/Bread'
import Tabs from '../common/Tabs'
import Paging from '../common/Paging'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
class StaContainer extends Component {
    renderAll(){
        let products = this.props.statics.posts
        const {selectMedia} = this.props.actions
        let id = /(([^?&=]+)(?:=([^?&=]*))*)/g.exec(window.location.search)[3]
        //请求自媒体的详细信息接口
        let search = '&id='+id
        const options = Object.assign({},this.props.selectedMedia,{
            total:this.props.statics.total,
            path: '/media/mediastatisticsManage',
            search:search,
            type: 'refreshStatic'
        })
        return(
            <div >
                <BootstrapTable data={products}>
                    <TableHeaderColumn dataField="statistic_date" isKey={true}>日期</TableHeaderColumn>
                    <TableHeaderColumn dataField="read">阅读数</TableHeaderColumn>
                    <TableHeaderColumn dataField="subscribe">累计订阅数</TableHeaderColumn>
                    <TableHeaderColumn dataField="exposure">曝光数</TableHeaderColumn>
                    <TableHeaderColumn dataField="relay">转发</TableHeaderColumn>
                    <TableHeaderColumn dataField="collect">收藏</TableHeaderColumn>
                </BootstrapTable>
                <Paging  options={options} selectMedia={selectMedia}></Paging>
            </div>
        )
    }
    renderSingle(){
        let products = this.props.articles.posts
        const {selectArticle} = this.props.actions
        let id = /(([^?&=]+)(?:=([^?&=]*))*)/g.exec(window.location.search)[3]
        //请求自媒体的详细信息接口
        let search = '&id='+id
        const options = Object.assign({},this.props.selectedArticle,{
            total: parseInt(this.props.articles.total),
            path: '/media/mediaArticleStatistic',
            search:search,
            type: 'article'
        })
        return(
            <div >
                <BootstrapTable data={products}>
                    <TableHeaderColumn dataField="articleId" isKey={true}>文章ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="title">文章标题</TableHeaderColumn>
                    <TableHeaderColumn dataField="read">阅读数</TableHeaderColumn>
                    <TableHeaderColumn dataField="exposure">推荐量</TableHeaderColumn>
                    <TableHeaderColumn dataField="relay">转发</TableHeaderColumn>
                    <TableHeaderColumn dataField="collect">收藏</TableHeaderColumn>
                </BootstrapTable>
                <Paging  options={options} selectMedia={selectArticle}></Paging>
            </div>
        )
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
        let breadTitle = '统计数据'
        const {selectMedia} = this.props.actions
        const {articleData} = this.props
        let comp = [
            {
                key:'整体统计',
                func: this.renderAll.bind(this)
            },
            {
                key:'单篇统计',
                func: this.renderSingle.bind(this)
            },
        ]
        let read = new Number(articleData.read/10000).toFixed(2)
        let recommend = new Number(articleData.recommend/10000).toFixed(2)
        let fans = new Number(articleData.fans/10000).toFixed(2)
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
                                <a className="btn btn-primary">总阅读数：{read}万</a>
                                <a className="btn btn-primary">总推荐数：{recommend}万</a>
                                <a className="btn btn-primary">总订阅数：{fans}万</a>
                            </div>
                            <Tabs comp={comp}></Tabs>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

StaContainer.propTypes = {
    actions: PropTypes.object.isRequired,
    articles: PropTypes.object.isRequired,
    statics:PropTypes.object.isRequired,
    selectedMedia:PropTypes.object.isRequired
}

export default StaContainer
