import React from "react";
import db from "./Firebase.js";
import {storage, f_database, auth} from "./Firebase.js";
import "./Post.css";
import cover_image from "./cover.jpeg";



class Post extends React.Component{
  constructor(props){
    super(props);
    this.state={
      post:null
    }
  }

  componentDidMount(){
    console.log(this.props);

  }
  render(){
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
             <div className="post-title"><h2>Post Title</h2></div>
             <div className="post-description">Title description, Dec 7, 2017</div>
             <div className="post-location">Location</div>
             <div className="post-groupsize">Group Size:</div>
             <div className="post-period">Period</div>
             <div className="post-style">Travelling Style</div>
             <div className="post-remark">Remark:</div>
           </div>
         </div>
        </div>



      </header>
    );
  }
}

export default Post;
