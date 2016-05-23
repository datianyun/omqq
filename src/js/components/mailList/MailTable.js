import React, {PropTypes, Component} from 'react'
class MailTable extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <table className="table-b">
            </table>
        )
    }
}

MailTable.propTypes = {
    //addTodo: PropTypes.func.isRequired
}

export default MailTable
