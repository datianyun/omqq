import React, {PropTypes, Component} from 'react'
import DropDown from './DropDown'
class User extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            active: false
        }
    }
    handleMouseEnter(e){
        this.setState({ active: true})
    }
    handleMouseLeave(e){
        this.setState({ active: false})
    }
    render() {
        return (
            <div className="header-login" onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)}>
                <div className="user"><span className="name">tom<i className="caret" id="dropdown"></i></span></div>
                <DropDown active={this.state.active} textValue="退出" linkUrl="/account/signOut"></DropDown>
            </div>
        )
    }
}

User.propTypes = {
    //addTodo: PropTypes.func.isRequired
}

export default User
