import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ListStudents from "./ListStudents";
import StudentComponent from "./StudentComponent";

class StudentApp extends Component {
    render() {
        return (
            <Router>
                <>
                    <h1>Student Application</h1>
                    <Switch>
                        <Route path="/" exact component={ListStudents}/>
                        <Route path="/student" exact component={ListStudents}/>
                        <Route path="/student/:id" component={StudentComponent}/>
                    </Switch>
                </>
            </Router>
        );
    }
}

export default StudentApp;