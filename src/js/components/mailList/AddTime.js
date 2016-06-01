import React, {PropTypes, Component} from 'react'

class AddTime extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            start: '',
            end: ''
        }
    }

    render() {
        return (
            <div className="wizard-step">
                <h3>邮件发送有效时段和发送时间</h3>
                <div className="form-group">

                </div>
                <div className="form-group">
                    
                </div>
            </div>

        )
    }
}

AddTime.propTypes = {
}

export default AddMail
