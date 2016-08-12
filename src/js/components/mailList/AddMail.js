import React, {PropTypes, Component} from 'react'
var Alert = require('react-s-alert').default
class AddMail extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            text: ''
        }
    }

    handleSubmit(e) {
        e.stopPropagation()
        const text = e.target.value.trim()
        if (e.which === 13) {
            this.props.onSave(text)
            this.setState({ text: '' })
        }
    }

    handleChange(e) {
       this.setState({ text: e.target.value })
    }

    handleSave(){
        const text = this.state.text
        const mails = this.props.mails
        let exist = false
        let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g
        if(reg.test(text)){
            mails.forEach(function(item,index){
                if(item.text===text){
                    Alert.error('邮箱已存在', {
                        effect: '',
                        position: 'top',
                        timeout: 3000,
                        onClose: function(e){
                            Alert.closeAll();
                        }
                     });
                     exist = true
                }
            })
            if(!exist){
                this.props.onSave(text)
                this.setState({ text: '' })
            }
        } else {
            Alert.error('邮箱格式错误', {
                effect: '',
                position: 'top',
                timeout: 3000,
                onClose: function(e){
                    Alert.closeAll();
                }
             });
        }
    }

    handleDelete(e){
        let target = e.currentTarget
        let mailId = target.attributes['data-id'].nodeValue
        this.props.onDelete(mailId)
    }

    render() {
        return (
            <div className="wizard-step">
                <h3>第一步，添加收件人邮箱</h3>
                <div className="form-group">
                    <input type="email" id="if-email" name="if-email" className="input" placeholder="输入邮箱.." autoFocus="true"
                    value={this.state.text}
                    onChange={this.handleChange.bind(this)}
                    onKeyDown={this.handleSubmit.bind(this)}></input>
                    <button type="button" className="btn btn-secondary" onClick={this.handleSave.bind(this)}>添加</button>
                </div>
                <div className="form-group">
                    <ul className="todo-list">
                        {this.props.mails.map((item,index) =>
                            <li key={index}>
                                <span>{'接收邮箱'+(index+1)}</span>
                                <label>{item.text}</label>
                                <button className="destroy" data-id={item.id} onClick={this.handleDelete.bind(this)}></button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

        )
    }
}

AddMail.propTypes = {
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    mails: PropTypes.array.isRequired
}

export default AddMail
