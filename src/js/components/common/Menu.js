import React, {PropTypes, Component} from 'react'
import classnames from 'classnames'
import MenuItem from './MenuItem'
class Menu extends Component {
    constructor(props, context) {
        super(props, context)
    }
    render() {
        return (
            <ul className="menu">
                {this.props.activeMenu.map(menuLi =>
                    <MenuItem key={menuLi.name} menuClass={menuLi.classValue} menuName={menuLi.name} menuList={menuLi.list}></MenuItem>
                )}
            </ul>
        )
    }
}

Menu.propTypes = {
    activeMenu: PropTypes.array
}

export default Menu
