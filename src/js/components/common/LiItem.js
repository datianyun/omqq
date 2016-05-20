import React, {PropTypes, Component} from 'react'

class LiItem extends Component {
    constructor(props, context) {
        super(props, context)
    }
    render() {
        return (
            <li><a href={this.props.linkUrl}>{this.props.textValue}</a></li>
        )
    }
}

LiItem.propTypes = {
    textValue: PropTypes.string,
    linkUrl: PropTypes.string
}

export default LiItem
