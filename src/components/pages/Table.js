import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-mdl/extra/material.css";
import "react-mdl/extra/material.js";

// const error = {
//   color: "red"
// };

export class Table extends Component {
  render() {
    const styles = {
      buttonRow: {
        display: "flex",
        justifyContent: "space-between"
      },

      buttonStyle: {
        marginBottom: "10px",
        borderRadius: "20px",
        fontFamily: "Alegreya"
      },

      tableData: {
        textDecoration: "underline",
        color: "#3f51b5",
        cursor: "pointer"
      }
    };
    return (
      <React.Fragment>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {this.props.employees.length > 0 ? (
              this.props.employees.map((employee, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <span
                        onClick={e => {
                          this.props.handleClickOpen(employee);
                        }}
                      >
                        {" "}
                        <span style={styles.tableData}>
                          {employee.firstName} {employee.lastName}{" "}
                        </span>{" "}
                      </span>{" "}
                    </td>
                    <td>{employee.email} </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Table;
