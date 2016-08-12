import React, {PropTypes, Component} from 'react'
import User from './User'

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="footer">
                    <p className="footermenu">
                        <a href="http://www.tencent.com/" rel="nofollow" target="_blank">关于腾讯</a> | <a href="http://www.qq.com/contract.shtml" rel="nofollow" target="_blank">服务协议</a> | <a href="http://service.qq.com/" rel="nofollow" target="_blank">客服中心</a>
                    </p>

                    <p className="copyrighten">
                        Copyright©
                        <script language="javascript">document.write(new Date().getFullYear());</script>2016
                        Tencent. <a rel="nofollow" href="http://www.tencent.com/en-us/le/copyrightstatement.shtml" target="_blank">All
                            Rights Reserved</a>
                    </p>
                </div>
                <div className="ui-alert hide" id="alertSuccess" >
                    <div className="ui-alert-bg"></div>
                    <div className="ui-alert-in">
                        <div className="ui-alert-icon">
                            <i className="icon icon-success-white"></i>
                        </div>
                        <div className="ui-alert-content texttips">
                            <h4></h4>
                        </div>
                    </div>
                </div>
                <div className="ui-alert hide" id="alertError" >
                    <div className="ui-alert-bg"></div>
                    <div className="ui-alert-in">
                        <div className="ui-alert-icon">
                            <i className="icon icon-warning-white"></i>
                        </div>
                        <div className="ui-alert-content texttips">
                            <h4></h4>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

Footer.propTypes = {
    //addTodo: PropTypes.func.isRequired
}

export default Footer
