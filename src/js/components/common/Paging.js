import React, {PropTypes, Component} from 'react'
import classnames from 'classnames'
class Paging extends Component {
    constructor(props, context) {
        super(props, context)
    }
    handlePage(e){
        let target = e.target.parentNode
        const data = this.props.options
        let cname = target.className
        let total =  Math.ceil(data.total/data.perNum)
        let media = {
            key:data.key,
            currentPage:data.currentPage,
            path:data.path,
            type:data.type,
            perNum:data.perNum,
            search:data.search
        }
        if(cname.indexOf('disagble')!==-1){
            return
        } else if(cname.indexOf('page')!==-1){
            media = Object.assign({},media,{
                currentPage : target.textContent
            })
        } else if(cname.indexOf('first')!==-1){
            media = Object.assign({},media,{
                currentPage : 1
            })
        } else if(cname.indexOf('pre')!==-1){
            media = Object.assign({},media,{
                currentPage : (data.currentPage-1)>0?(data.currentPage-1):1
            })
        } else if(cname.indexOf('next')!==-1){
            media = Object.assign({},media,{
                currentPage : (data.currentPage+1)<total?(data.currentPage+1):total
            })
        } else if(cname.indexOf('last')!==-1){
            media = Object.assign({},media,{
                currentPage : total
            })
        }
        this.props.selectMedia(media)
    }
    render() {
        const {currentPage,total,perNum} = this.props.options
        const pageNum = Math.ceil(total/perNum)
        const pageList = []
        const showPage = 5

        if(pageNum < showPage) {
            for(let k=1;k<=pageNum;k++){
                pageList.push({
                    index:k
                })
            }
        } else {
            let start = (currentPage-2>0)?currentPage-2:1
            let end = (start+4>pageNum)?pageNum:start+4
            for(let k=start;k<=end;k++){
                pageList.push({
                    index:k
                })
            }
        }
        return (
            <div className="paginationholder">
                <ul className="pagination" onClick={this.handlePage.bind(this)} >
                    <li className={classnames({
                        first:true,
                        disabled:currentPage==1
                    })}><a href="#">&lt;&lt;</a></li>
                    <li className={classnames({
                        pre:true,
                        disabled:currentPage==1
                    })}><a href="#">&lt;</a></li>
                    {pageList.map((item,i) =>
                        <li className={classnames({
                            page:true,
                            active:item.index==currentPage
                        })} key={i}><a href="#">{item.index}</a></li>
                    )}
                    <li className={classnames({
                        next:true,
                        disabled:currentPage==pageNum
                    })}><a href="#">&gt;</a></li>
                    <li className={classnames({
                        last:true,
                        disabled:currentPage==pageNum
                    })}><a href="#">&gt;&gt;</a></li>
                </ul>
            </div>
        )
    }
}

Paging.propTypes = {
    options:PropTypes.object,
    selectMedia: PropTypes.func.isRequired
}

export default Paging
