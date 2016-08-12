import React, {PropTypes, Component} from 'react'
import LiItem from './LiItem'
class MenuItem extends Component {
    constructor(props, context) {
        super(props, context)
    }
    render() {
        return (
            <li className={this.props.menuClass}>
                <span className="menu-text"><span className="abr"><i className="icon icon-menu-function"></i></span>{this.props.menuName}</span>
                <ul className="menu-sub">
                    {this.props.menuList.map(item =>
                        <LiItem key={item.name}  classValue={item.classValue} textValue={item.name} linkUrl={item.url}></LiItem>
                    )}
                </ul>
            </li>
        )
    }
}

MenuItem.propTypes = {
    menuClass: PropTypes.string,
    menuName: PropTypes.string,
    menuList: PropTypes.array
}

export default MenuItem
