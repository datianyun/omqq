import React, {PropTypes, Component} from 'react'
import classnames from 'classnames'
import Modal  from 'react-modal'
class Dialog extends Component {
    constructor(props, context) {
        super(props, context)
    }
    render() {
        const {isOpen,openModal,closeModal,handleModalCloseRequest,handleSaveClicked} = this.props
        const {renderHTML} = this.props
        return (
            <div id="dialog" className="form-horizontal form-wizard">
                <Modal isOpen={isOpen}  onRequestClose={closeModal}  className="Modal__Bootstrap modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={handleModalCloseRequest}>
                          <span aria-hidden="true">&times;</span>
                          <span className="sr-only">Close</span>
                        </button>
                        <h4 className="modal-title">修改</h4>
                    </div>
                    <div className="modal-body">
                        {renderHTML()}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={handleModalCloseRequest}>关闭</button>
                        <button type="button" className="btn btn-primary" onClick={handleSaveClicked}>保存</button>
                    </div>
                </div>
                </Modal>
            </div>
        )
    }
}

Dialog.propTypes = {
    comp: PropTypes.array,
    renderHTML: PropTypes.func,
    isOpen:PropTypes.bool
}

export default Dialog
