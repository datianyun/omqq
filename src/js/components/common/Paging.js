import React, {PropTypes, Component} from 'react'
import classnames from 'classnames'
class Paging extends Component {
    constructor(props, context) {
        super(props, context)
    }
    render() {
        const {currentPage,total,perNum} = this.props.options
        const pageNum = Math.ceil(total/perNum)
        const pageList = []
        for(let k=0;k<pageNum;k++){
            pageList.push({
                index:k
            })
        }
        return (
            <div className="paginationholder">
                <ul className="pagination">
                    <li className="first"><a href="#">&lt;&lt;</a></li>
                    <li className="prev"><a href="#">&lt;</a></li>
                    {pageList.map((item,i) =>
                        <li className={classnames({
                            page:true,
                            active:i+1===currentPage
                        })} key={i}><a href="#">{i+1}</a></li>
                    )}
                    <li className="next"><a href="#">&gt;</a></li>
                    <li className="last"><a href="#">&gt;&gt;</a></li>
                </ul>
            </div>
        )
    }
}

Paging.propTypes = {
    options:PropTypes.object
}

export default Paging
