import React, {PropTypes, Component} from 'react'
class Search extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div className="breadcrumb-mod">
                <div className="userBread clearfix">
                    <div className="expNameCon">
                        <input type="text" name="input2-group2" className="form-control" placeholder="媒体ID/媒体名称/注册邮箱"></input>
                    </div>
                    <div className="input-group-btn">
                        <button type="button" className="btn btn-primary search">搜索</button>
                    </div>
                </div>
                <p className="userTip"></p>
            </div>
        )
    }
}

Search.propTypes = {
    //addTodo: PropTypes.func.isRequired
}

export default Search
