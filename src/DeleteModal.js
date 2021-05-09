import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from 'axios'
export default function deletModal(props) {
    let { isOpen, handleModal, body } = props;

    //to delete an item
    const deleteItem = () => {
        let url = 'https://609808d3e48ec0001787343c.mockapi.io/yaswanth/products'
        if (this.props.body && this.props.body.id) {
            url = url + '/' + this.props.body.id;
        }
        axios.delete(url).then((response) => {

        })
    }

    return (
        <Modal isOpen={isOpen} centered={true}>
            <ModalHeader>Are you sure you want to Logout ?</ModalHeader>
            <ModalBody className="text-center">
                <button
                    className="btn btn-outline-primary mx-1"
                    onClick={(e) => handleModal(false)}
                >
                    No
        </button>
                <button className="btn btn-outline-danger mx-1" to="/">
                    Yes
        </button>
            </ModalBody>
        </Modal>
    );
}
