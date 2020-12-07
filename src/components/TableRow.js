// TableRow.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {
  constructor(props) {
      super(props);
      this.delete = this.delete.bind(this);
  }

  delete() {
      axios.get('http://localhost:4000/api/delete/'+this.props.obj._id)
          .then( () => {
            this.props.callback();
          }
          )
          .catch(err => console.log(err))
  }

  render() {
    return (
        <tr className="tr-custom">
          <td>
            {this.props.obj.email}
          </td>
          <td className="password">
            {this.props.obj.password}
          </td>
          <td>
            {this.props.obj.first_name}
          </td>
          <td>
            {this.props.obj.last_name}
          </td>
          <td>
            {this.props.obj.jobs_count}
          </td>
          <td>
            <input style={{ width: '40px' }} type="checkbox" checked={this.props.obj.active} disabled/>
          </td>
          <td>
            {this.props.obj.slack_username}
          </td>
          <td>
            <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
  }
}

export default TableRow;
