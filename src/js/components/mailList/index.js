import React, {PropTypes, Component} from 'react'
import Bread from '../common/Bread'
import Search from './Search'
import MailTable from './MailTable'
class MailCon extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div className="main">
                <Bread title='邮件配置'></Bread>
                <Search></Search>
                <MailTable lists={this.props.mediaObj}></MailTable>
            </div>
        )
    }
}

MailCon.propTypes = {
    actions: PropTypes.object.isRequired,
    mediaObj: PropTypes.array.isRequired
}

export default MailCon
