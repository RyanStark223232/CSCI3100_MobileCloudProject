import React from "react";
import db from "./Firebase.js";
import {storage, f_database, auth} from "./Firebase.js";
import "./Post.css";
import cover_image from "./cover.jpeg";
import { withRouter } from "react-router";


class Post extends React.Component{
  constructor(props){
    super(props);
    this.state={
      post:null
    }
  }

  componentDidMount() {
    const id = parseInt(this.props.match.params.id);

    var data = null;
    f_database.ref("posts").orderByChild('pid').equalTo(id).on("value", snapshot=>{
      snapshot.forEach(snap=>{
        data=snap.val()
      });
      this.setState({
        post:data
      },()=>{
        console.log(this.state.post);
      })
    });
  }


  render(){
    if(this.state.post){
      return(

        <header>
          <div className="post-header">
            <h2>NowHere</h2>
          </div>

          <div className="row">

            <div className="leftcolumn">
              <img src={cover_image} />
            </div>

            <div className="rightcolumn">
              <div className="card">
               <div className="post-title"><h2>Title: {this.state.post.title}</h2></div>
               <div className="post-description">Description: {this.state.post.description}</div>
               <div className="post-location">{this.state.post.location}</div>
               <div className="post-groupsize">Group Size:{this.state.post.size}</div>
               <div className="post-period">Period: {this.state.post.period}</div>
               <div className="post-style">Travelling Style: {this.state.post.travel_style}</div>
               <div className="post-remark">Remark: {this.state.post.remark}</div>
             </div>
           </div>
          </div>

        </header>
      );
    }else{
      return(
        <header></header>
      )
    }
  }
}

export default Post;
