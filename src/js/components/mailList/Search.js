import React, {PropTypes, Component} from 'react'
class Search extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            key :''
        }
    }
    handleSearch(e){
        let initialState = {
            type: this.props.type,
            key : this.state.key,
            path:'/media/mediaSearch',
            currentPage:1,
            perNum:5
        }
        this.props.selectMedia(initialState)

    }
    handleChange(e){
        this.setState({ key: e.target.value })
    }
    render() {
        let ButtonText = '搜索'
        let placeholder = '媒体ID/媒体名称/注册邮箱'
        if(this.props.type==='add'){
            ButtonText = '添加'
            placeholder = '媒体ID/注册邮箱'
        }
        return (
            <div className="breadcrumb-mod">
                <div className="userBread clearfix">
                    <div className="expNameCon">
                        <input type="text"  className="form-control" placeholder={placeholder} onChange={this.handleChange.bind(this)}></input>
                    </div>
                    <div className="input-group-btn">
                        <button type="button" className="btn btn-primary search" onClick={this.handleSearch.bind(this)}>{ButtonText}</button>
                    </div>
                </div>
                <p className="userTip"></p>
            </div>
        )
    }
}

Search.propTypes = {
    type: PropTypes.string.isRequired,
    selectMedia: PropTypes.func.isRequired
}

export default Search
