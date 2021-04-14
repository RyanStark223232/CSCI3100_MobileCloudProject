import React from "react";
import db from "./Firebase.js";
import {storage, f_database, auth} from "./Firebase.js";
import "./Post.css";
import { withRouter } from "react-router";
import Button from '@material-ui/core/Button';
import banner from './banner.jpeg';
import SentimentVeryDissatisfiedIcon from './sadFace.png';



class Post extends React.Component{
  constructor(props){
    super(props);
    this.state={
      post:null,
      // I you can set disable_button to true if you want to gray-out the button when the members are full or something like that
      disable_button:false,
      w_list:null,
      isOwner:false,
    }
    this.tempFunc = this.tempFunc.bind(this);
  }

  onAuthStateChanged = ()=>{
    if (auth.currentUser && auth.currentUser.email === this.state.post.owner){
      this.setState({isOwner:true})
      // this.setState({disable_button:true})
      document.getElementById("requestButton").style.display = "none";
    }   
    else {
    }

  }


  componentDidMount() {
    const id = parseInt(this.props.match.params.id);
    var data = null;
    f_database.ref("posts").child(id).on("value", snapshot=>{
      data = snapshot.val()
      this.setState({post:data})
      // console.log(this.state.post)
      this.onAuthStateChanged()
    })
    // this.onAuthStateChanged()
  }

  RequestJoin=()=>{
    let id = 1;
    let flag =1;
    f_database.ref("posts").child(this.state.post.pid)
                .child("waiting_list")
                // .orderByKey().limitToLast(1)
                .once("value", snapshot =>{
                  snapshot.forEach(snap => {
                    if (snap.val() === auth.currentUser.email){ 
                      flag =0
                      // console.log(flag);
                    }
                    var key = snap.key;
                    id=  parseInt(key, 10)+1
                  })
                  // console.log(snapshot.numChildren());
                  // id = snapshot.numChildren() +1
                })
    // id = Date.now() -1618326164000
    // console.log(id);
    
    if(flag!==0){
      f_database.ref("posts").child(this.state.post.pid).child("waiting_list").update({[id]:auth.currentUser.email})
      // this.setState({disable_button:true})
    } else{
      // this.setState({disable_button:true})
      // alert("You're already in the waiting list!")
      f_database.ref("posts").child(this.state.post.pid).child("waiting_list").update({[id]:"dummy@dummy.com"+id})
    }
    // if(flag!==0) f_database.ref("posts").child(this.state.post.pid).child("waiting_list").push(auth.currentUser.email)

  }

  AcceptJoin=(email)=>{
    let id = 1;
    let flag =1;
    f_database.ref("posts").child(this.state.post.pid)
                .child("participant")
                .once("value", snapshot =>{
                  snapshot.forEach(snap => {
                    if (snap.val() === email){ 
                      flag =0
                    }
                  })
                  id = snapshot.numChildren() +1
                })
    // console.log(id);
    // f_database.ref("posts").child(this.state.post.pid).child("waiting_list").update({[id]:"dummy@dummy.com"})
    // id = Date.now()-1618326164000
    if(flag!==0) f_database.ref("posts").child(this.state.post.pid).child("participant").update({[id]:email})
    // console.log(email);
    f_database.ref("posts").child(this.state.post.pid).child("waiting_list").orderByKey()
    .on("value",snapshot=>{  snapshot.forEach(snap=> {
      // console.log(snap.val())
      if (email=== snap.val()) snap.ref.remove()
    })
      // console.log(snapshot.val());
      // console.log(typeof snapshot.val());
      // snapshot.setValue(null)
    })
  }

  RejectJoin=(email)=>{
    f_database.ref("posts").child(this.state.post.pid).child("waiting_list")
    .on("value",snapshot=>{  snapshot.forEach(snap=> {
      // console.log(snap.val())
      if (email=== snap.val()) snap.ref.remove()
    })
      // console.log(snapshot.val());
      // snapshot.setValue(null)
    })
  }

  RemoveParticipant=(email)=>{
    f_database.ref("posts").child(this.state.post.pid).child("participant")
    .on("value",snapshot=>{  snapshot.forEach(snap=> {
      // console.log(snap.val())
      if (email=== snap.val()) snap.ref.remove()
    })
      // console.log(snapshot.val());
      // snapshot.setValue(null)
    })
  }

  tempFunc = () =>{
    if (this.state.post.waiting_list == null){
      return [];
    }
    var temp_list = [];
    var i;
    for (i = 0; i < 100; i++){
      if (this.state.post.waiting_list[i] == null) {
        continue;
      }
      temp_list = [...temp_list, this.state.post.waiting_list[i]]
      // console.log("TEMPLIST:", temp_list);
    }
    var temp = temp_list.filter((e) => {
      // console.log("E:",e);
      // console.log(this.state.post.waiting_list);
      return e != null;                  
    })
    // console.log("Temp:", temp);
    return temp;
  }

  tempFunc_parti = () =>{
    if (this.state.post.participant == null){
      return [];
    }
    var temp_list = [];
    var i;
    for (i = 0; i < 100; i++){
      if (this.state.post.participant[i] == null) {
        continue;
      }
      temp_list = [...temp_list, this.state.post.participant[i]]
      // console.log("TEMPLIST:", temp_list);
    }
    var temp = temp_list.filter((e) => {
      // console.log("E:",e);
      // console.log(this.state.post.participant);
      return e != null;                  
    })
    // console.log("Temp:", temp);
    return temp;
  }



  render(){
    
    if(this.state.post){
      return(

        <header>
          <div className="post-header">
            <img src={banner} />
          </div>

          <div className="row">

            <div className="leftcolumn">
              <img src={this.state.post.url} />
            </div>
            

            <div className="rightcolumn">
              <div className="card">
               <div className="post-title"><h2>Title: {this.state.post.title}</h2></div>
               <div className="post-creator">Creator: {this.state.post.owner}</div>
               <div className="post-description">Description: {this.state.post.description}</div>
               <div className="post-location">Location: {this.state.post.location}</div>
               <div className="post-groupsize">Group Size:{this.state.post.size}</div>
               <div className="post-period">Period: {this.state.post.period}</div>
               <div className="post-style">Travelling Style: {this.state.post.travel_style}</div>
               <div className="post-remark">Remark: {this.state.post.remark}</div>
               <div>
               <Button onClick={this.RequestJoin}
                 variant="contained"
                 size="small"
                 color="secondary"
                 style={{margin: 10}}
                 disabled={this.state.disable_button}
                 id = "requestButton" >
                  Request Join
                </Button>
                </div>
             </div>
           </div>
          </div>
          <div className="row" id="owner_panel">

            <div className="leftcolumn">
              Participant: 
              {this.state.post.participant? 
              this.tempFunc_parti().map((item) => 
               <div> 
                 {item} 
                 <Button size="small" color="secondary" style={{display: this.state.isOwner?"inline":"none"}} onClick = {() =>{
                   this.RemoveParticipant(item)
                  }}>
                    Remove</Button>
                 </div> )
                 :"None"}
            </div>

            <div className="rightcolumn">
              <div className="card">
               Waiting List: 
               {this.state.post.waiting_list? //console.log(typeof this.state.post.waiting_list)
                this.tempFunc().map((item) => 
                  <div> 
                    {item} 
                    
                      <Button size="small" color="primary" style={{display: this.state.isOwner?"inline":"none"}} onClick = {() =>{
                        this.AcceptJoin(item)
                      }}>
                    Accept</Button>
                    <Button size="small" color="secondary" style={{display: this.state.isOwner?"inline":"none"}} onClick = {() =>{
                        this.RejectJoin(item)
                      }}>
                    Reject</Button>
                  </div> )
                 :"None"}
             </div>
           </div>
          </div>

        </header>
      );
    }else{
      return(
        <header>
          <div className="post-header">
            The Post is Empty
          </div>
        </header>
      )
    }
  }
}

export default Post;