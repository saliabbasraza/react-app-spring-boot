import React, {Component} from "react";
import StudentService from "../service/StudentService";

class ListStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            message: null,
        };
        this.refreshList = this.refreshList.bind(this);
        this.updateStudentClicked = this.updateStudentClicked.bind(this);
        this.deleteStudentClicked = this.deleteStudentClicked.bind(this);
        this.addStudentClicked = this.addStudentClicked.bind(this);
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        StudentService.getAll()
            .then(response => {
                this.setState({students: response.data})
            })
    }

    deleteStudentClicked(id) {
        StudentService.delete(id).then(response => {
            this.setState({message: `Course ${id} Deleted successfully!`});
            this.refreshList();
        })
    }

    updateStudentClicked(id) {
        this.props.history.push(`/student/${id}`);
    }

    addStudentClicked() {
        this.props.history.push(`/student/-1`);
    }


    render() {
        return (
            <div className="container">
                <h3>All Students</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.students.map(
                                student =>
                                    <tr key={student.id}>
                                        <td>{student.id}</td>
                                        <td>{student.name}</td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => this.updateStudentClicked(student.id)}>Update</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-warning" onClick={() => this.deleteStudentClicked(student.id)}>Delete</button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addStudentClicked}>Add</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListStudents;