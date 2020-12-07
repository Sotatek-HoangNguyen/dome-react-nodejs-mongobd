// index.component.js

import React, {Component} from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {persons: []};
        this.fetchListUser = this.fetchListUser.bind(this);
    }

    fetchListUser() {
        axios.get('http://localhost:4000/api/users')
            .then(response => {
                this.setState({persons: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidMount() {
        this.fetchListUser();
    }

    tabRow() {
        return this.state.persons.map( (object, i) => {
            return <TableRow obj={object} key={i} callback={this.fetchListUser} />;
        });
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                  <h3>
                    List User
                  </h3>
                </header>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Email</th>
                        <th>Password</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>JobsCount</th>
                        <th>Active</th>
                        <th colSpan="2">SlackUser</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.tabRow()}
                    </tbody>
                </table>
            </div>
        );
    }
}
