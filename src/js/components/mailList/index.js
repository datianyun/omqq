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
        const options ={
            perNum:5,
            total:39,
            currentPage:1
        }
        return (
            <div className="main">
                <Bread title='邮件配置'></Bread>
                <Search></Search>
                <MailTable total='30' lists={this.props.mediaObj}></MailTable>
                <Paging options={options}></Paging>
            </div>
        )
    }
}

MailCon.propTypes = {
    actions: PropTypes.object.isRequired,
    mediaObj: PropTypes.array.isRequired
}

export default MailCon
