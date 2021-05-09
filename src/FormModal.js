import React, { Component } from 'react';
import axios from 'axios'
export default class FormModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productTitle: '',
            price: '',
            oldPrice: '',
            offer: '',
            url: 'https://609808d3e48ec0001787343c.mockapi.io/yaswanth/products'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = () => {
        let { formType, body } = this.props;
        if (this.props.formType == 'Edit') {
            this.loadForm(body);
        }
    }
    // to load the events
    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;

        console.log("nameeeee", name, value);

        this.setState({ [event.target.name]: event.target.value });
    }

    //submitting the form
    handleSubmit = async (event) => {
        let { price, productTitle, offer, oldPrice } = this.state;
        event.preventDefault();
        let body = {
            productTitle: productTitle,
            price: price,
            oldPrice: oldPrice,
            offer: offer
        }
        if (this.props.formType == 'Add') {
            await this.AddForm(body)
        } else {
            this.editForm(body)
        }
    };

    // to add item
    AddForm(body) {

        axios.post(this.state.url, body)
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
    }

    // to edit item
    editForm(body) {
        let url = this.state.url;
        if (this.props.body && this.props.body.id) {
            url = url + '/' + this.props.body.id;
        }
        axios.put(url, body)
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
    }

    //to load the form
    loadForm = (body) => {
        this.setState({
            productTitle: body && body.productTitle ? body.productTitle : '',
            price: body && body.price ? body.price : '',
            oldPrice: body && body.oldPrice ? body.oldPrice : '',
            offer: body && body.offer ? body.offer : '',
        })
    }

    render() {
        let { errors, loginSuccess, productTitle, price, offer, oldPrice } = this.state;
        let { formType } = this.props;
        console.log("errros", errors);
        return (
            <div className="login">
                <form onSubmit={this.handleSubmit} noValidate={true}>
                    <div className="form-group">
                        <label>Product title :</label>
                        <div>
                            <input
                                name="productTitle"
                                type="text"
                                value={productTitle}
                                onChange={this.handleChange}
                                className="form-control"
                                noValidate
                            />
                        </div>

                    </div>
                    <div className="form-group">
                        <label>New price:</label>
                        <div>
                            <input
                                name="price"
                                type="number"
                                value={price}
                                onChange={this.handleChange}
                                className="form-control"
                                noValidate
                            />
                        </div>

                    </div>
                    <div className="form-group">
                        <label>Old price :</label>
                        <div>
                            <input
                                name="oldPrice"
                                type="number"
                                value={oldPrice}
                                onChange={this.handleChange}
                                className="form-control"
                                noValidate
                            />
                        </div>

                    </div>
                    <div className="form-group">
                        <label>Offer :</label>
                        <div>
                            <input
                                name="offer"
                                type="text"
                                value={offer}
                                onChange={this.handleChange}
                                className="form-control"
                                noValidate
                            />
                        </div>

                    </div>
                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-info' onClick={e => {
                            this.props.onClose()
                        }}>Cancel</button>
                        <div className='px-2' />
                        <button className='btn btn-primary' type='submit'>{formType}</button>
                    </div>

                </form>
            </div>
        );
    }
}