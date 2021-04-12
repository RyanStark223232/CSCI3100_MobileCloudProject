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
    }

  }

  componentDidMount() {
    const id = parseInt(this.props.match.params.id);
    var data = null;
    f_database.ref("posts").orderByChild('pid').equalTo(id).on("value", snapshot=>{
      snapshot.forEach(snap=>{data=snap.val()});
      this.setState({post:data}
        ,()=>{console.log(this.state.post);}
      )
    });
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
               <div className="post-location">{this.state.post.location}</div>
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
          <div className="row">

            <div className="leftcolumn">
              Participant: {this.state.post.participant}
            </div>

            <div className="rightcolumn">
              <div className="card">
               Waiting List: {this.state.post.waiting_list}
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
