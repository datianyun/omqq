import React, {PropTypes, Component} from 'react'
import Menu from '../common/Menu'
import Bread from '../common/Bread'
import SearchHeader from './SearchHeader'
import DataTable from './DataTable'
import Paging from '../common/Paging'

class Container extends Component {
    onClear(){
        const selectedMedia = this.props.selectedMedia
        const pkey = selectedMedia.currentPage + '-' +selectedMedia.search + '-' +selectedMedia.key+ '-' + selectedMedia.path
        this.props.actions.deleteManager(pkey)
    }

    renderContent(){
        const {posts} = this.props
        let breadTitle = '媒体管理'
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
                    <DataTable  refresh={this.props.refresh} onClear={this.onClear.bind(this)} selectMedia={selectMedia} config={this.props.analysis} lists={this.props.posts}></DataTable>
                    <Paging  options={options} selectMedia={selectMedia}></Paging>
                </div>
            )
        }
    }
    render() {
        const {menus} = this.props
        return (
            <div className="wrap">
                <div className="container">
                    <div className="row">
                        <div className="side">
                            <Menu activeMenu={menus}></Menu>
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
