import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
//
import FormModal from './FormModal'
import DeleteModal from './DeleteModal';
export default class App extends React.Component {
  state = {
    listData: [],
    openFormModal: false,
    selectedItem: null,
    formType: 'Add',
    isOpenDeleteModal: false
  }
  componentDidMount = () => {
    this.getDataFromServer();
  }

  //to get the data from server
  getDataFromServer = () => {
    let url = 'https://609808d3e48ec0001787343c.mockapi.io/yaswanth/products'
    axios.get(url, {

    })
      .then((response) => {
        if (response && response.data && response.data.length) {
          this.setState({ listData: response.data })
        }
      }, (error) => {
        console.log(error);
      });
  }
  //to open modal for edit
  openEditModal = (item) => {
    this.setState({ openFormModal: true, selectedItem: item, formType: 'Edit' })
  }
  // to close the opened modal
  closeFormModal = () => {
    this.setState({ openFormModal: false, selectedItem: null }, () => {
      this.getDataFromServer()
    })
  }
  render() {
    let { listData, openFormModal, selectedItem, formType, isOpenDeleteModal } = this.state;
    return (<div className='p-5'>
      <h3 className='text-center'>Product Admin</h3>
      <div className='d-flex justify-content-end mb-3'>
        <button className='btn btn-primary' onClick={e => {
          this.setState({
            openFormModal: true,
            formType: 'Add'
          })
        }}>Add</button>

      </div>
      {/* table starts */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col" className='text-center'>S.No</th>
            <th scope="col" className='text-center'>Product Name</th>
            <th scope="col" className='text-center'>New price</th>
            <th scope="col" className='text-center'>Old Price</th>
            <th scope="col" className='text-center'>Offer</th>
            <th scope="col" className='text-center'>Action</th>
          </tr>
        </thead>
        <tbody>
          {listData && listData.length ? listData.map((item, index) => {
            return <tr key={index}>
              <th scope="row" className='text-center'>{index + 1}</th>
              <td>{item.productTitle}</td>
              <td className='text-center'>{item.price}</td>
              <td className='text-center'>{item.oldPrice}</td>
              <td className='text-center'>{item.offer}</td>
              <td className='text-center'><EditIcon className='text-primary' onClick={e => this.openEditModal(item)} /> <DeleteIcon className='text-danger' onClick={e => this.setState({ isOpenDeleteModal: true, selectedItem: item })} /></td>
            </tr>
          }) : null}


        </tbody>
      </table>
      {/* table ends */}
      {/* form modal starting */}
      <Modal isOpen={openFormModal} centered={true} toggle>
        <ModalHeader>
          {formType} Form
        </ModalHeader>
        <ModalBody>
          <FormModal body={selectedItem} formType={formType} onClose={this.closeFormModal} />
        </ModalBody>
      </Modal>
      {/* form modal ending */}
      {/* delete modal starting */}
      <DeleteModal isOpen={isOpenDeleteModal} handleModal={e => this.setState({ isOpenDeleteModal: false })} body={selectedItem} />
      {/* delete modal ending */}
    </div>)
  }
}


