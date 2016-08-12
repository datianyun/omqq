import React, {PropTypes, Component} from 'react'
import Menu from '../common/Menu'
import MailCon from './index'
class Wrap extends Component {
    render() {
        const {menus} = this.props
        return (
            <div className="wrap">
                <div className="container">
                    <div className="row">
                        <div className="side">
                            <Menu activeMenu={menus}></Menu>
                        </div>
                        <MailCon total={this.props.total} actions={this.props.actions} searchCon={this.props.selectedMedia} mediaObj={this.props.posts}></MailCon>
                    </div>
                </div>
            </div>
        )
    }
}

Wrap.propTypes = {
    actions: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    total:PropTypes.string,
    selectedMedia:PropTypes.object.isRequired
}

export default Wrap
