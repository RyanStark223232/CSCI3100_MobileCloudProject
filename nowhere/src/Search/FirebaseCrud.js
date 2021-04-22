import { Container, Form, Grid, Segment, Input, Table, Header, Icon } from "semantic-ui-react"
import { f_database, firebase } from "../Firebase.js";
import React, { useState, useEffect } from "react";
import './FirebaseCrud.css'
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';

const FirebaseCrud = (props) => {
  console.log("Pass IN:", props.state.state);

  useEffect(() => {
    const firestore = f_database.ref('/posts');
    firestore.on('value', (response) => {
      const data = response.val();
      let userInfo = [];
      for (let id in data) {
        userInfo.push({
          id: id,
          Location: data[id].location,
          Tstyle: data[id].travel_style,
          Period: data[id].period,
          Size: data[id].size,
          Url: data[id].url
        });
      }
    });
  }, [])

  var userArray = [];
  var filteredArraylt = [];


  function getUserArray() {
    const firestore = firebase.database().ref('/posts');
    firestore.on('value', (response) => {
      const data = response.val();
      for (let id in data) {
        userArray.push({
          Location: data[id].location,
          Tstyle: data[id].travel_style,
          Period: data[id].period,
          Size: data[id].size,
          Url: data[id].url,
          Pid: data[id].pid
        });
      }

    })
    console.log(userArray)
    return userArray
  }

  getUserArray()

  function getFilteredArray() {


    for (let l = 0; l < userArray.length; l++) {
      if (props.state.state.location === userArray[l].Location || props.state.state.location === "" || props.state.state.location === null) {
        if (props.state.state.type === userArray[l].Tstyle || props.state.state.type === "" || props.state.state.type === null) {
          if (props.state.state.period === userArray[l].Period || props.state.state.period === "" || props.state.state.period === null) {
            if (props.state.state.group_size === userArray[l].Size || props.state.state.group_size === "" || props.state.state.group_size === null) {
              filteredArraylt.push(userArray[l])
            }
          }
        }
      }
    }
    console.log(filteredArraylt)
  }

  getFilteredArray()

  return <div className="ui hidden divider">
    <Container>
      <Grid>
        <Grid.Row column="1">
          <Grid.Column>
            {
              filteredArraylt.length === 0 ? (
                <Segment padded="very">
                  <Header textAlign="center">
                    Oops! No Result!
                  </Header>
                </Segment>
              ) : (
                <Segment padded="very">
                  <style>

                  </style>
                  <table className="table">
                    <tr className="table-tr">
                      <th className="table-th"> </th>
                      <th className="table-th"> Location </th>
                      <th className="table-th"> Travel Style </th>
                      <th className="table-th"> Period </th>
                      <th className="table-th"> Size </th>
                      <th className="table-th"> </th>
                    </tr>
                    {
                      filteredArraylt.map((data, index) => {
                        return <tr className="table-tr">
                          <td className="table-td"><img src={data.Url} /> </td>
                          <td className="table-td">{data.Location}</td>
                          <td className="table-td">{data.Tstyle}</td>
                          <td className="table-td">{data.Period}</td>
                          <td className="table-td">{data.Size}</td>
                          <td className="table-td">
                            <Button startIcon={<VisibilityIcon />} color='secondary' variant="contained" onClick={() => { window.location = "./post/" + data.Pid }}>
                              <Icon name="edit" primary></Icon>
                                View Post
                              </Button>
                          </td>
                        </tr>
                      })
                    }
                  </table>
                </Segment>
              )
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>

  </div>;
};

export default FirebaseCrud;
