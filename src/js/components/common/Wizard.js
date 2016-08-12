import React, {PropTypes, Component} from 'react'
import classnames from 'classnames'
class Wizard extends Component {
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
            <div id="rootwizard" method="" action="" className="form-horizontal form-wizard">
                <div className="steps-progress"> <div className="progress-indicator"></div> </div>
                <ul >
                    {this.props.comp.map((item,index) =>
                        <li  data-key={index} onClick={this.handleClick.bind(this)} key={index} className={classnames({
                            'active': index==this.state.active,
                            'completed': index<this.state.active
                        })}>
                            <a href="#tab1" data-toggle="tab" aria-expanded="true">
                                <span>{index+1}</span>
                                <b>{'第'+(index+1)+'步'}</b>
                            </a>
                        </li>
                    )}
                </ul>
                <div className="tab-content">
                    {this.props.comp.map((item,index) =>
                        <div key={index} className={classnames({
                            'tab-pane': true,
                            'active': index==this.state.active
                        })} id={'tab'+index}>{item()}</div>
                    )}
                </div>
            </div>
        )
    }
}

Wizard.propTypes = {
    comp: PropTypes.array.isRequired
}

export default Wizard
