import React from "react";
import { Form } from "reactstrap";
import {Modal,ModalBody,ModalHeader,Button} from 'reactstrap'

export default function index(props) {    
//   const[isModalOpen,setModalOpen]= useState(false);
//   const showButton = () => {setModalOpen(!isModalOpen)}
  return (

    <div>
      <Modal fullscreen="" isOpen={props.isModalOpen} toggle={props.isModalOpen}>
        <ModalHeader toggle={()=>props.showButton()}>Modal title</ModalHeader>
        <ModalBody>
          <Button color="primary" onClick={function noRefCheck() {}}>
             Do Something
         </Button>{" "}
         <Button onClick={function noRefCheck() {}}>
             Cancel
          </Button>
        </ModalBody>
      
      </Modal>
    </div>
  );
}
