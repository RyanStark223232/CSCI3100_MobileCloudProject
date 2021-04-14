import { Container, Form, Grid, Segment, Button, Input, Table, Header, Icon } from "semantic-ui-react"

import {f_database, firebase} from "./Firebase.js";
import React, {useState, useEffect} from "react";

const FirebaseCrud = () => {

  const [aLocation,setALocation] = useState('')
  const [aTstyle,setATstyle] = useState('')
  const [aPeriod,setAPeriod] = useState('')
  const [userData,setUserData] = useState([])

  const handleAddUser = () => {
    const firestore = firebase.database().ref('/posts');
    let data = {
      Location: aLocation,
      Tstyle: aTstyle,
      Period: aPeriod,
    };
    firestore.push(data);
  }

  useEffect(()=>{
    const firestore = f_database.ref('/posts');
    firestore.on('value', (response)=>{
      const data = response.val();
      let userInfo = [];
      for(let id in data){
        userInfo.push({
          id:id,
          Location:data[id].location,
          Tstyle: data[id].travel_style,
          Period:data[id].period,
        });
      }

      setUserData(userInfo);
    });
  },[])

  var userArray = [];
  var filteredArray = [];
  var filteredArrayl = [];
  var filteredArraylt = [];


  function getUserArray(){
    const firestore = firebase.database().ref('/posts');
    firestore.on('value', (response)=>{
      const data = response.val();
      for(let id in data){
        userArray.push({
          Location:data[id].location,
          Tstyle: data[id].travel_style,
          Period:data[id].period,
        });
      }

    })
    console.log(userArray)
    return userArray
  }

  getUserArray()

  function getFilteredArray(){

    for (let l = 0; l < userArray.length; l++){
      if (aLocation == userArray[l].Location || aLocation == ""){
        if (aTstyle == userArray[l].Tstyle || aTstyle == ""){
            if(aPeriod == userArray[l].Period || aPeriod == ""){
              filteredArraylt.push(userArray[l])
            }
          }
      }
    }
    console.log(filteredArraylt)
  }

  getFilteredArray()

  const handleFilter = () => {
    const firestore = firebase.database().ref('/posts');
    firestore.orderByChild('Location').equalTo(aLocation).on('value',function(snapshot){
      //console.log(snapshot.val())
    })
  }


    return <div className ="ui hidden divider">
      <Container>
        <Grid>
          <Grid.Row columns="2">
            
            <Grid.Column>
              <Segment padded="very">
                <Form>
                  <Form.Field>
                    <label>Location</label>
                    <Input placeholder="Location" focus value = {aLocation} onChange={(e) => setALocation(e.target.value)}/>
                  </Form.Field>
                  <Form.Field>
                    <label>Travel Style</label>
                    <Input placeholder="Travel Style" focus value = {aTstyle} onChange={(e) => setATstyle(e.target.value)}/>
                  </Form.Field>
                  <Form.Field>
                    <label>Period</label>
                    <Input placeholder="First Name" focus value = {aPeriod} onChange={(e) => setAPeriod(e.target.value)}/>
                  </Form.Field>
                  <Form.Field>
                    <Button onClick={()=>handleFilter()} positive>
                      {" "}
                      Filter</Button>
                  </Form.Field>
                </Form>
              </Segment>
            </Grid.Column>
          </Grid.Row>


          <Grid.Row column="1">
            <Grid.Column>
              {
                filteredArraylt.length == 0 ? (
                <Segment padded="very">
                  <Header textAlign = "center">
                    Oops! No Result!
                  </Header>
                </Segment>
                ): (
                  <Segment padded="very">
                    <Table celled fixed singleLine>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell> Location </Table.HeaderCell>
                          <Table.HeaderCell> Travel Style </Table.HeaderCell>
                          <Table.HeaderCell> Period </Table.HeaderCell>
                          <Table.HeaderCell> Current Capacity </Table.HeaderCell>
                          <Table.HeaderCell> </Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      {
                        filteredArraylt.map((data,index)=>{
                          return <Table.Body>
                            <Table.Cell>{data.Location}</Table.Cell>
                            <Table.Cell>{data.Tstyle}</Table.Cell>
                            <Table.Cell>{data.Period}</Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell>
                              <Button primary>
                                <Icon name = "edit" primary></Icon>
                                Detail
                              </Button>
                            </Table.Cell>
                          </Table.Body>
                        })
                      }
                    </Table>
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