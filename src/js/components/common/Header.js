import React, {PropTypes, Component} from 'react'
import User from './User'

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="container">
                    <h1 className="logo"><a href="/main/index" className="logo-link text-hide">企鹅媒体平台</a></h1>
                    <User></User>
                </div>
            </div>
        )
    }
}

Header.propTypes = {
    //addTodo: PropTypes.func.isRequired
}

export default Header
