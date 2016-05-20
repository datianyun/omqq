import React, {PropTypes, Component} from 'react'
import classnames from 'classnames'

class Menu extends Component {
    constructor(props, context) {
        super(props, context)
    }
    render() {
        return (
            <ul className="menu">
                {this.props.activeMenu.map(menuLi =>
                    <li className={menuLi.classValue}>
                        <span className="menu-text"><span className="abr"><i className="icon icon-menu-function"></i></span>{menuLi.name}</span>
                        <ul className="menu-sub">
                            {menuLi.list.map(item =>
                                <li className={item.classValue}><a href={item.classValue} className="menu-sub-text ">{item.name}</a></li>
                            )}
                        </ul>
                    </li>
                )}
            </ul>
        )
    }
}

Menu.propTypes = {
    activeMenu: PropTypes.object
}

export default Menu
