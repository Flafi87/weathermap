import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import TempChart from "./TempChart";

const MyModal = ({show, toggle, data}) => {
return(
  <Modal isOpen={show} toggle={toggle}>
    <ModalHeader toggle={toggle}>Forecast Chart</ModalHeader>
    <ModalBody>
      <TempChart forecast={data} />
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={toggle}>Exit</Button>
    </ModalFooter>
  </Modal>
)
}

MyModal.propTypes = {
  show:PropTypes.bool.isRequired,
  toggle:PropTypes.func.isRequired,
  data:PropTypes.arrayOf(PropTypes.object).isRequired
}
export default MyModal