import React, {PropTypes, Component} from 'react'

class Bread extends Component {
    render() {
        return (
            <div className="main-heading bor-bottom main-inline"><h2>{this.props.title}</h2></div>
        )
    }
}

Bread.propTypes = {
    title: PropTypes.string
}

export default Bread
