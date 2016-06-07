import React, {PropTypes, Component} from 'react'
import Bread from '../common/Bread'
import Search from './Search'
import MailTable from './MailTable'
import Paging from '../common/Paging'
class MailCon extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const {selectMedia} = this.props.actions
        const options = Object.assign({},this.props.searchCon,{
            total:this.props.total
        })
        return (
            <div className="main">
                <Bread title='邮件配置'></Bread>
                <Search type="search" selectMedia={selectMedia}></Search>
                <MailTable type='search' lists={this.props.mediaObj} deleteMedia={this.props.actions.deleteMedia}></MailTable>
                <Paging  options={options} selectMedia={selectMedia}></Paging>
            </div>
        )
    }
}

MailCon.propTypes = {
    actions: PropTypes.object.isRequired,
    mediaObj: PropTypes.array.isRequired,
    total:PropTypes.string,
    searchCon: PropTypes.object.isRequired
}

export default MailCon
