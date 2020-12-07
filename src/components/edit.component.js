// edit.component.js

import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
    constructor(props) {
      super(props);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
      this.onChangeFirstName = this.onChangeFirstName.bind(this);
      this.onChangeLastName = this.onChangeLastName.bind(this);
      this.onChangeJobsCount = this.onChangeJobsCount.bind(this);
      this.onChangeActive = this.onChangeActive.bind(this);
      this.onChangeSlackUserName = this.onChangeSlackUserName.bind(this);

      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        jobs_count: 0, // Number
        active: false, // Boolean
        slack_username: ''
      }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/edit/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                  email: response.data.email,
                  password: response.data.password,
                  first_name: response.data.first_name,
                  last_name: response.data.last_name,
                  jobs_count: response.data.jobs_count,
                  active: response.data.active,
                  slack_username: response.data.slack_username
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeFirstName(e) {
        this.setState({
          first_name: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
          last_name: e.target.value
        });
    }

    onChangeJobsCount(e) {
        this.setState({
          jobs_count: e.target.value
        });
    }

    onChangeActive(e) {
        this.setState({
          active: e.target.checked
        });
    }

    onChangeSlackUserName(e) {
        this.setState({
          slack_username: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const obj = {
            email: this.state.email,
            password: this.state.password,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            jobs_count: this.state.jobs_count,
            active: this.state.active,
            slack_username: this.state.slack_username
        };

        axios.post('http://localhost:4000/api/update/'+this.props.match.params.id, obj)
            .then(res => {
                this.props.history.push('/index');
            });
    }

    render() {
        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <h3 align="center">Update User Info</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Email: </label>
                            <input type="text" className="form-control"
                                   value={this.state.email}
                                   onChange={this.onChangeEmail}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password: </label>
                            <input type="password" className="form-control"
                                   value={this.state.password}
                                   onChange={this.onChangePassword}
                            />
                        </div>
                        <div className="form-group">
                            <label>First Name: </label>
                            <input type="text" className="form-control" value={this.state.first_name}
                                   onChange={this.onChangeFirstName}/>
                        </div>
                        <div className="form-group">
                            <label>Last Name: </label>
                            <input type="text" className="form-control" value={this.state.last_name}
                                   onChange={this.onChangeLastName}/>
                        </div>
                        <div className="form-group">
                            <label>Jobs Count: </label>
                            <input type="number" className="form-control" value={this.state.jobs_count}
                                   onChange={this.onChangeJobsCount}/>
                        </div>

                        <div className="form-check">
                          <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" checked={this.state.active} onChange={this.onChangeActive}/>
                            Active
                          </label>
                        </div>

                        <div className="form-group">
                            <label>Slack User Name: </label>
                            <input type="text" className="form-control" value={this.state.slack_username}
                                   onChange={this.onChangeSlackUserName}/>
                        </div>
                        <div className="form-group">
                            <input type="submit"
                                   value="Update User Info"
                                   className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
