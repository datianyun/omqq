import React, {Component,PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Header from '../components/common/Header'
import Wrap from '../components/common/Wrap'
import Footer from '../components/common/Footer'
import * as TodoActions from '../actions'

class Frame extends Component {
      constructor(props) {
        super(props)
        //this.handleChange = this.handleChange.bind(this)
        //this.handleRefreshClick = this.handleRefreshClick.bind(this)
      }

      componentDidMount() {
        const { dispatch, selectedMail } = this.props
        dispatch(TodoActions.fetchPostsIfNeeded(selectedMail))
      }

      componentWillReceiveProps(nextProps) {
        if (nextProps.selectedMail !== this.props.selectedMail) {
          const { dispatch, selectedMail } = nextProps
          dispatch(TodoActions.fetchPostsIfNeeded(selectedMail))
        }
      }


    render() {
        console.log(this.props)
        const {
            todos,
            actions
        } = this.props
        return (
             <div>
                <Header></Header>
                <Wrap></Wrap>
                <Footer></Footer>
             </div>
        )
    }
}

Frame.propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    selectedMail: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
}


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        actions: bindActionCreators(TodoActions, dispatch)
    }
}

function mapStateToProps(state) {
  const { selectedMail, postsByMail,todos} = state
  const {
    isFetching,
    lastUpdated,
    items: posts
} = postsByMail[selectedMail] || {
    isFetching: true,
    items: []
  }

  return {
    selectedMail,
    posts,
    isFetching,
    todos,
    lastUpdated
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Frame)
