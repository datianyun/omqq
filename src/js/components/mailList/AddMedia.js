import React, {PropTypes, Component} from 'react'
import Search from './Search'
import MailTable from './MailTable'
require('react-datetime');
class AddMedia extends Component {
    constructor(props, context) {
        super(props, context)
    }
    validate(text){
        let arr = this.props.medias
        const length = arr.length
        let filterArray = arr.filter(mail =>
            mail.Freg_email !== text
        )
        if(filterArray.length < length) {
            return false
        } else {
            return true
        }+
        320
    }
    render() {
        const tips = '目前邮件配置仅支持正式运营的非个人自媒体号，且必须30天内有发文'
        return (
            <div className="wizard-step">
                <h3>第二步，添加接收数据邮件的媒体</h3>
                <div className="form-group">
                    <Search tips={tips} type="add" selectMedia={this.props.actions.selectMedia} validate={this.validate.bind(this)}></Search>
                    <MailTable type='add' lists={this.props.medias} deleteMedia={this.props.actions.deleteMedia}></MailTable>
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
