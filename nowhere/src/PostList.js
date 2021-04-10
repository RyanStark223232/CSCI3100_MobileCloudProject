import React from "react";
import db from "./Firebase.js";
import './MyPost.css';
import {storage, f_database, auth} from "./Firebase.js";
import cover_image from "./cover.jpeg";

class PostList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      my_posts:null
    }
  }

  checking=()=>{
    console.log("uid = "+auth.currentUser.uid)
    // console.log("my posts = "+ this.state.my_posts);
    console.log("props = "+this.props.my_posts[0].title );
    this.setState({
      my_posts:this.props.my_posts
    },()=>{
      console.log(this.state.my_posts);
    });

  }

  render(){
    return(
        <>
      <button onClick={this.checking}>Checking</button>
      {this.props.my_posts?console.log("hihi"):console.log("byebye")}
      </>
)
  }
}

export default PostList;
