import React, { PropTypes, Component } from 'react'

class Header extends Component {
  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text)
    }
  }

  render() {
    return (
      <header className="header">
          <h1>todos</h1>
      </header>
    )
  }
}

Header.propTypes = {
  //addTodo: PropTypes.func.isRequired
}

export default Header
