import React, {PropTypes, Component} from 'react'
import Search from './Search'
import MailTable from './MailTable'
class AddMedia extends Component {
    constructor(props, context) {
        super(props, context)
    }
    render() {
        return (
            <div className="wizard-step">
                <h3>添加接收数据邮件的媒体</h3>
                <div className="form-group">
                    <Search selectMedia={this.props.actions.selectMedia} actions={this.props.actions}></Search>
                    <MailTable total='30' lists={this.props.medias}></MailTable>
                </div>
            </div>
        )
    }
}

AddMedia.propTypes = {
    actions: PropTypes.object.isRequired,
    medias: PropTypes.array.isRequired
}

export default AddMedia
