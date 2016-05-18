import React, {
    PropTypes, Component
}
from 'react'


class Header extends Component {
    handleSave(text) {
        if (text.length !== 0) {
            this.props.addTodo(text)
        }
    }

    render() {
        return (
            <div className="header">
                <div className="container">
                    <h1 className="logo"><a href="/main/index" className="logo-link text-hide">企鹅媒体平台</a></h1>
                    <div className="header-login">
                        <div className="user"><span className="name">tom<i className="caret" id="dropdown"></i></span></div>
                        <ul className="dropdown-menu">
                            <li><a href="/account/signOut">退出</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

Header.propTypes = {
    //addTodo: PropTypes.func.isRequired
}

export default Header
