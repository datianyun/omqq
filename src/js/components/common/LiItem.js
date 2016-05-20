import React, {PropTypes, Component} from 'react'

class LiItem extends Component {
    constructor(props, context) {
        super(props, context)
    }
    render() {
        return (
            <li className={this.props.classValue}><a className="menu-sub-text" href={this.props.linkUrl}>{this.props.textValue}</a></li>
        )
    }
}

LiItem.propTypes = {
    textValue: PropTypes.string,
    classValue: PropTypes.string,
    linkUrl: PropTypes.string
}

export default LiItem
