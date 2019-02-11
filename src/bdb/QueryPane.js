import React, { Component } from 'react';
import InputPane from "./InputPane";

class QueryPane extends Component {
  render() {
    return (
      <table id="query-pane-table">
        <tbody>
          <tr>
            <td><InputPane/></td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default QueryPane;