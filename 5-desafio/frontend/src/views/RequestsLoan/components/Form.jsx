import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { Form, Input, Button, Select, InputNumber } from 'antd';
import * as objects from "../actions/requests";
const FormItem = Form.Item;
const { Option } = Select;


class ObjectForm extends React.Component {

    componentDidMount() {
        this.props.form.setFieldsValue({
            ...this.props.current_obj
        });
    }

    componentDidUpdate(prevProps) {
        if(this.props.current_obj.id !== prevProps.current_obj.id){
            this.props.form.setFieldsValue({
                ...this.props.current_obj
            });
        }
    }

    state = {
        number: {}
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let update_object = Object(this.props.current_obj);
                Object.keys(values).map((key, index) =>{
                    if(values[key]){
                        update_object[key] = values[key];
                    }
                })
                this.props.update(update_object);
            }
        });
    };

    checkPrice = (rule, value, callback) => {
        console.log("RULE ", rule);
        console.log("VALUE ", rule);
        if (value.number > 0) {
            callback();
            return;
        }
        callback('El monto debe ser mayor a cero!');
    }

    validatePrimeNumber = (number) => {
        if (number > 0) {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
        return {
            validateStatus: 'error',
            errorMsg: 'El monto tiene que ser mayor a cero!',
        };
    }

    handleNumberChange = (value) => {
        this.setState({
            number: {
                ...this.validatePrimeNumber(value),
            },
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <React.Fragment>
                {this.props.current_obj !== null && (
                    <Form onSubmit={this.handleSubmit} className="card-block">
                        <FormItem label="Nombre Completo" >
                            {getFieldDecorator('full_name', {
                                rules: [{ required: true, message: 'Este campo es requerido!' }],
                            })(
                                <Input/>
                            )}
                        </FormItem>

                        <FormItem label="Sexo">
                            {getFieldDecorator('gender', {
                                rules: [{ required: true, message: 'Este campo es requerido!' }],
                            })(
                                <Select
                                    placeholder="Select a option and change input text above"
                                    onChange={this.handleSelectChange}
                                >
                                    <Option value="m">Masculino</Option>
                                    <Option value="f">Femenino</Option>
                                </Select>
                            )}
                        </FormItem>
                        <Form.Item label="Email" >
                            {getFieldDecorator('email', {
                                rules: [{
                                    type: 'email', message: 'No es un email valido!',
                                }, {
                                    required: true, message: 'Este campo es requerido!',
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>

                        <FormItem label="Monto" validateStatus={this.state.number.validateStatus} help={this.state.number.errorMsg}>
                            {getFieldDecorator('amount', {
                                rules: [
                                    { required: true, message: 'Please input your Password!' },
                                ],
                            })(
                                <InputNumber style={{with: '100%'}}
                                             min={0}
                                             onChange={this.handleNumberChange}
                                />
                            )}
                        </FormItem>

                        <FormItem label="Número de documento">
                            {getFieldDecorator('document_number', {
                                rules: [{ required: true, message: 'Este campo es requerido!' }],
                            })(
                                <Input placeholder='Email' />
                            )}
                        </FormItem  >

                        <div className="row">
                            <Button type="secondary" onClick={() => this.props.visibleForm()} style={{ marginLeft: 8 }}>Cancelar</Button>
                            <Button type="primary" htmlType="submit">Actualizar</Button>
                        </div>

                    </Form>
                )}
                {this.props.current_obj === null && <p>No hay objeto asignado </p>}
            </React.Fragment>
        );
    }
}

ObjectForm.propTypes = {
    current_obj: PropTypes.object,
    objects: PropTypes.object,
};

ObjectForm = Form.create()(ObjectForm);

const mapStateToProps = state => {
    return {
        objects: state.requestsLoan,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        update: (obj) => {
            return dispatch(objects.update(obj));
        },
        visibleForm: () => {
            return dispatch(objects.visibleForm(false));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ObjectForm);