import React from "react";
import db from "./Firebase.js";
import './MyPost.css';
import Button from '@material-ui/core/Button';
import {storage, f_database, auth} from "./Firebase.js";
import cover_image from "./cover.jpeg";
import SentimentVeryDissatisfiedIcon from './sadFace.png';


class MyPost extends React.Component{
  constructor(){
    super();
    this.state={
      my_posts:null,
      isLoggedIn:auth.currentUser
    }
    this.getData=this.getData.bind(this);
  }

  componentWillMount(){
    if(auth.currentUser!=null){
      var data = [];
      f_database.ref("posts").orderByChild('uid').equalTo(this.state.isLoggedIn.uid).once("value", snapshot=>{
        snapshot.forEach(snap=>{
          data.push(snap.val());
        });
        this.setState({
          my_posts:data
        },()=>{
          console.log(this.state);
        })
      });
    }
  }

  getData = ()=>{
    var data = [];
    f_database.ref("posts").orderByChild('uid').equalTo(auth.currentUser.uid).once("value", snapshot=>{
      snapshot.forEach(snap=>{
        data.push(snap.val());
      });
      this.setState({
        my_posts:data
      },()=>{
        console.log(this.state);
      })
    });
  }



  createPost=()=>{
    var url = window.location.protocol+"//"+window.location.hostname+(window.location.port ?':'+window.location.port:'')+"/createpost";
    console.log(url);
    window.location = url;
  }


  render(){
    if(this.state.my_posts){
      return(
        <header>
          <div className="my-post-header">
          </div>
          <div>
              {this.state.my_posts.map(post=>{
                return(
                  <div className="my-post-container">
                    <div className="left-column"><img src={post.url} /></div>
                    <div className="middle-column">
                      <div className="my-post-title">{post.title}</div>
                      <div className="my-post-location">Location: {post.location}</div>
                      <div className="my-post-style">Travel Style: {post.travel_style}</div>
                      <div className="my-post-size">Group size: {post.size}</div>
                    </div>
                    <div className="right-column">
                      <a href={"./editpost/"+post.pid}>Edit Post &rarr;  </a>
                      <a href={"./post/"+post.pid}>View Post &rarr;</a>
                    </div>
                  </div>
                )
            })}
          </div>
          <div>
            <Button variant="contained" size="large" color="secondary" onClick={this.createPost}>
              Create New Post
            </Button>
          </div>
        </header>
      )
    }else if(auth.currentUser){
      return(
        <header>
          <div className="my-post-header">
            <div>
              <img src={SentimentVeryDissatisfiedIcon} alt="sadFace"></img>
              Your Post List is Empty
            </div>
            <Button variant="contained" size="large" color="secondary" onClick={this.createPost} style={{margin:20}}>
              Create New Post
            </Button>
          </div>
        </header>
      )
    }else{
      return(
        <header>
          <div className="my-post-header">
            <div>
              <img src={SentimentVeryDissatisfiedIcon} alt="sadFace"></img>
              Please Login to view your posts.
            </div>

            <script>{auth.onAuthStateChanged(this.getData) }</script>
          </div>
        </header>
      )
    }
  }
}

export default MyPost;
