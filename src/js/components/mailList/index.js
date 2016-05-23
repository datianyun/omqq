import React, {PropTypes, Component} from 'react'
import Bread from '../common/Bread'
import Search from './Search'
class MailCon extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div className="main">
                <Bread title='邮件配置'></Bread>
                <Search></Search>
            </div>
        )
    }
}

MailCon.propTypes = {
    //addTodo: PropTypes.func.isRequired
}

export default MailCon
