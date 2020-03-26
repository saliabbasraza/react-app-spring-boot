import React, {Component} from "react";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import StudentService from "../service/StudentService";

class StudentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
        if (this.state.id === -1) {
            return;
        }

        StudentService.get(this.state.id).then(
            response =>
                this.setState({
                    // id: response.data.id,
                    name: response.data.name,
                })
        )
    }

    onSubmit(values) {
        if (values.id == -1) {
            StudentService.add(values).then(
                (response) => {
                    this.setState({
                        id: response.data.id,
                        name: response.data.name,
                    });
                    this.props.history.push(`/student/${response.data.id}`);
                }
            );
        } else {
            StudentService.update(values).then(
                (response) => {
                    this.setState({
                        id: response.data.id,
                        name: response.data.name,
                    });
                    this.props.history.push(`/student/${response.data.id}`);
                }
            )
        }
    }

    validate(values) {
        let errors = {};
        if (!values.name) {
            errors.name = 'Enter a Name';
        }
        return errors;
    }

    render() {
        let {id, name} = this.state;
        return (
            <div>
                <h1>Student</h1>
                <div className="container">

                    <Formik initialValues={{id, name}} onSubmit={this.onSubmit} validateOnChange={false} validateOnBlur={false} validate={this.validate}
                            enableReinitialize={true}>
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="name" component="div" className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Id</label>
                                        <Field className="form-control" type="text" name="id" disabled/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Name</label>
                                        <Field className="form-control" type="text" name="name"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}

export default StudentComponent;