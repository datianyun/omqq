import React, {PropTypes, Component} from 'react'
import classnames from 'classnames'
class Tabs extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            active: 0
        }
    }
    handleClick(e){
        e.preventDefault()
        let target = e.currentTarget;
        let id = target.attributes['data-key'].nodeValue
        this.setState({active:id})
    }
    render() {
        return (
            <div className="bs-component">
                <ul className="nav nav-tabs">
                    {this.props.comp.map((item,index) =>
                        <li  data-key={index} onClick={this.handleClick.bind(this)} key={index} className={classnames({
                            'active': index==this.state.active,
                            'completed': index<this.state.active
                        })}>
                            <a data-toggle="tab" aria-expanded="true">
                                <span>{item.key}</span>
                            </a>
                        </li>
                    )}
                </ul>
                <div className="tab-content">
                    {this.props.comp.map((item,index) =>
                        <div key={index} className={classnames({
                            'tab-pane': true,
                            'active': index==this.state.active
                        })} id={'tab'+index}>{item.func()}</div>
                    )}
                </div>
            </div>
        )
    }
}

Tabs.propTypes = {
    comp: PropTypes.array.isRequired
}

export default Tabs
