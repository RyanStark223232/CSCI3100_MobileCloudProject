import React from "react";
import db from "./Firebase.js";
import './MyPost.css';
import {storage, f_database, auth} from "./Firebase.js";
import cover_image from "./cover.jpeg";

class MyPost extends React.Component{
  constructor(){
    super();

  }


  createPost=()=>{
    var url = window.location.protocol+"//"+window.location.hostname+(window.location.port ?':'+window.location.port:'')+"/createpost";
    console.log(url);
    window.location=url;
  }




  render(){
    return(
      <header>
        <div className="my-post-header">
          <h1>My Posts</h1>
          <button onClick={this.createPost}>Create New Post</button>
        </div>
        <div>
          <div className="post-container">
            <div className="left-column"><img src={cover_image} /></div>
            <div className="middle-column">
              <div className="post-title">Post Title Here</div>
              <div className="post-location">Location: Post Location here</div>
              <div className="post-style">Travel Style: Post Travel Style here</div>
              <div className="post-size">Group size: Post Group Size here</div>
            </div>

            <div className="right-column">
              <a href="#">Read more &rarr;</a>
            </div>
          </div>
          <div className="post-container">
            <div className="left-column"><img src={cover_image} /></div>
            <div className="middle-column">
              <div className="post-title">Post Title Here</div>
              <div className="post-location">Location: Post Location here</div>
              <div className="post-style">Travel Style: Post Travel Style here</div>
              <div className="post-size">Group size: Post Group Size here</div>
            </div>

            <div className="right-column">
              <a href="#">Read more &rarr;</a>
            </div>
          </div>
          <div className="post-container">
            <div className="left-column"><img src={cover_image} /></div>
            <div className="middle-column">
              <div className="post-title">Post Title Here</div>
              <div className="post-location">Location: Post Location here</div>
              <div className="post-style">Travel Style: Post Travel Style here</div>
              <div className="post-size">Group size: Post Group Size here</div>
            </div>

            <div className="right-column">
              <a href="#">Read more &rarr;</a>
            </div>
          </div>
        </div>

      </header>
    );
  }
}

export default MyPost;
