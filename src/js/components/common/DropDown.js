import React, {PropTypes, Component} from 'react'
import classnames from 'classnames'

class DropDown extends Component {
    constructor(props, context) {
        super(props, context)
    }
    render() {
        return (
            <ul  className={
              classnames({
                'dropdown-menu': true,
                'show': this.props.active
              })}>
                <li><a href={this.props.linkUrl}>{this.props.textValue}</a></li>
            </ul>
        )
    }
}

DropDown.propTypes = {
    textValue: PropTypes.string,
    linkUrl: PropTypes.string,
    active: PropTypes.bool
}

export default DropDown
