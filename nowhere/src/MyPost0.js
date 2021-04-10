import React from "react";
import db from "./Firebase.js";
import './MyPost.css';
import {storage, f_database, auth} from "./Firebase.js";
import cover_image from "./cover.jpeg";


class MyPost extends React.Component{
  constructor(){
    super();
    this.state={
      my_posts:null,
      isLoggedIn:auth.currentUser
    }
  }


  createPost=()=>{
    var url = window.location.protocol+"//"+window.location.hostname+(window.location.port ?':'+window.location.port:'')+"/createpost";
    console.log(url);
    window.location = url;
  }

  checking=()=>{
    console.log(this.state.isLoggedIn.uid);
    var data = [];
    f_database.ref("posts").orderByChild('uid').equalTo(this.state.isLoggedIn.uid).on("value", snapshot=>{
      snapshot.forEach(snap=>{
        data.push(snap.val());
      });
      this.setState({
        my_posts:data
      },()=>{
        console.log(this.state.my_posts);
      })
    });
  }





  render(){

    return(
          <>
            {this.state.my_posts.map((post)=>{
              <div>
                <div className="my-post-container">
                  <div className="left-column"><img src={cover_image} /></div>
                  <div className="middle-column">
                    <div className="my-post-title">post.title</div>
                    <div className="my-post-location">Location: post.location</div>
                    <div className="my-post-style">Travel Style: post.travel_style</div>
                    <div className="my-post-size">Group size: post.size</div>
                  </div>

                  <div className="right-column">
                    <a href="#">Read more &rarr;</a>
                  </div>
                </div>
            });
          }
        </>
    );
  }
}

export default MyPost;
