import React, {PropTypes, Component} from 'react'
import classnames from 'classnames'
import {throttle} from '../../lib/param'
import Alert from 'react-s-alert'
import 'whatwg-fetch'

class SearchHeader extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            key :'',
            status:'all',
            catalog:'all',
            quyu:'all',
            site:'all',
            order:4
        }
    }
    handleSearch(e){
        let search = '&media_status='+this.state.status+'&catalog_map='+this.state.catalog+'&order='+this.state.order+'&bd_site='+this.state.site
        let initialState = {
            type: this.props.type,
            key : this.state.key,
            path:'/media/mediaBDCataLogSearch',
            currentPage:1,
            perNum:10,
            search:search
        }
        this.props.selectMedia(initialState)
    }
    triggerSearch(search){
        let initialState = {
            type: this.props.type,
            key : this.state.key,
            path:'/media/mediaBDCataLogSearch',
            currentPage:1,
            perNum:10,
            search:search
        }
        this.props.selectMedia(initialState)
    }
    handleChange(e){
        this.setState({ key: e.target.value.trim()})
    }
    handleStatus(e){
        let value = e.target.value.trim()
        this.setState({ status: value})
        let search = '&media_status='+ value +'&catalog_map='+this.state.catalog+'&order='+this.state.order+'&quyu_catalog='+this.state.quyu+'&bd_site='+this.state.site
        this.triggerSearch(search)
    }
    handleCatalog(e){
        let value = e.target.value.trim()
        this.setState({ catalog: value})
        let search = '&media_status='+ this.state.status +'&catalog_map='+value+'&order='+this.state.order+'&quyu_catalog='+this.state.quyu+'&bd_site='+this.state.site
        this.triggerSearch(search)
    }
    handleQuyu(e){
        let value = e.target.value.trim()
        this.setState({ quyu: value})
        let search = '&media_status='+ this.state.status +'&catalog_map='+this.state.catalog+'&order='+this.state.order+'&quyu_catalog='+value+'&bd_site='+this.state.site
        this.triggerSearch(search)
    }
    handleOrder(e){
        let value = e.target.value.trim()
        this.setState({ order: value})
        let search = '&media_status='+ this.state.status +'&catalog_map='+this.state.catalog+'&order='+value+'&quyu_catalog='+this.state.quyu+'&bd_site='+this.state.site
        this.triggerSearch(search)
    }
    handleSite(e){
        let value = e.target.value.trim()
        this.setState({ order: value})
        let search = '&media_status='+ this.state.status +'&catalog_map='+this.state.catalog+'&order='+this.state.order+'&quyu_catalog='+this.state.quyu+'&bd_site='+value
        this.triggerSearch(search)
    }
    renderStatus(data){
        let arr = [{
            value:'all',
            text:'全部运营状态'
        }];
        for (let key in data) {
            arr.push({
                value:key,
                text:data[key]
            })
        }
        return(
            <select  name="select" className="form-control input-sm" onChange={this.handleStatus.bind(this)}>
                {arr.map((status,i)=>
                    <option key={i} value={status.value}>{status.text}</option>
                )}
            </select>
        )
    }
    renderCatalog(data){
        let arr = [{
            value:'all',
            text:'全部运营分类'
        }];
        for (let key in data) {
            arr.push({
                value:key,
                text:data[key]
            })
        }
        return(
            <select  name="select" className=
            "form-control input-sm" onChange={this.handleCatalog.bind(this)}>
                {arr.map((status,i)=>
                    <option key={i} value={status.value}>{status.text}</option>
                )}
            </select>
        )
    }
    renderQuyu(data){
        let arr = [{
            value:'all',
            text:'全部行业分类'
        }];
        for (let key in data) {
            arr.push({
                value:key,
                text:data[key]
            })
        }
        return(
            <select  name="select" className=
            "form-control input-sm" onChange={this.handleQuyu.bind(this)}>
                {arr.map((status,i)=>
                    <option key={i} value={status.value}>{status.text}</option>
                )}
            </select>
        )
    }
    renderSite(data){
        let arr = [{
            value:'all',
            text:'拓展站点'
        }];
        for (let key in data) {
            arr.push({
                value:key,
                text:data[key]['FName']
            })
        }
        return(
            <select  name="select" className=
            "form-control input-sm" onChange={this.handleSite.bind(this)}>
                {arr.map((status,i)=>
                    <option key={i} value={status.value}>{status.text}</option>
                )}
            </select>
        )
    }
    render() {
        let ButtonText = '搜索'
        let placeholder = '媒体ID/媒体名称/注册邮箱/拓展人员RTX'
        return (
            <div className="breadcrumb-mod">
                <div className="userBread clearfix">
                    <div className="expNameCon form-section">
                        {this.renderStatus(this.props.config.status)}
                    </div>
                    <div className="expNameCon form-section">
                        {this.renderCatalog(this.props.config.catalog)}
                    </div>
                    <div className="expNameCon form-section">
                            {this.renderQuyu(this.props.config.quyuCata)}
                    </div>
                    <div className="expNameCon form-section">
                            {this.renderSite(this.props.config.bdsite)}
                    </div>
                    <div className="expNameCon data">
                        <input type="text"  className="form-control" placeholder={placeholder} onChange={this.handleChange.bind(this)}></input>
                    </div>
                    <div className="input-group-btn">
                        <button type="button" className="btn btn-secondary search" onClick={this.handleSearch.bind(this)}>搜索</button>
                    </div>
                    <div className="option">
                        <select  name="select" className="form-control input-sm" onChange={this.handleOrder.bind(this)}>
                            <option value="4">总阅读数从高到低排序</option>
                            <option value="3">总阅读数从低到高排序</option>
                            <option value="8">总推荐数从高到低排序</option>
                            <option value="7">总推荐数从低到高排序</option>
                            <option value="6">总订阅数从高到低排序</option>
                            <option value="5">总订阅数从低到高排序</option>
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

SearchHeader.propTypes = {
    type: PropTypes.string.isRequired,
    config: PropTypes.object.isRequired,
    selectMedia: PropTypes.func.isRequired
}

export default SearchHeader
