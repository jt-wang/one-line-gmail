import PropTypes from 'prop-types'
import React from 'react'

class Modal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { oneLineEmailBody } = this.props
    return (
      <div id="myModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <div className="modal-header"> */}
              {/* <button type="button" className="close" data-dismiss="modal">
                &times;
              </button> */}
              {/* <h4 className="modal-title">Modal Header</h4> */}
            {/* </div> */}
            <div className="modal-body">
              <p>{oneLineEmailBody}</p>
            </div>
            {/* <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">
                Close
              </button>
            </div> */}
          </div>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  oneLineEmailBody: PropTypes.string.isRequired,
}

export default Modal
