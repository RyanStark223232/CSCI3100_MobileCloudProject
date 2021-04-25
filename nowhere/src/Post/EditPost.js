/*
This is the frontend module for editing post.
The module retrieves all details of the specified post from firebase database
and updates the details of the post.
*/
import React from "react";
import './CreatePost.css';
import Button from '@material-ui/core/Button';
import {storage, f_database, auth} from "../Firebase.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class EditPost extends React.Component {

  // initialize the state of the class
  constructor() {
    super();
    this.state = {
      title: ' ',
      location: ' ',
      size: ' ',
      period: ' ',
      travel_style: ' ',
      remark: '',
      cover: null,
      temp_cover: null,
      url: null,
      pid: null,
      uid: null
    };

    this.changeInput = this.changeInput.bind(this);
  }

  // retrieve data from the data and initialize the data of the post
  componentWillMount() {
    const id = parseInt(this.props.match.params.id);
    var data = null;
    f_database.ref("posts").orderByChild('pid').equalTo(id).once("value", snapshot => {
      snapshot.forEach(snap => {
        data = snap.val()
      });
      this.setState({
        post: data
      }, () => {
        console.log(this.state.post);
        this.setState({
          title: this.state.post.title,
          location: this.state.post.location,
          size: this.state.post.size,
          period: this.state.post.period,
          travel_style: this.state.post.travel_style,
          remark: this.state.post.remark,
          url: this.state.post.url,
          pid: id,
          uid: this.state.post.uid
        })
      })
    });

  }

  // change the state from user input
  changeInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });

  }

  // get the image from user upload and temporarily display the uploaded image on the website 
  handleImage = (event) => {
    this.setState({
      cover: event.target.files[0],
      temp_cover: URL.createObjectURL(event.target.files[0])
    }, () => {
      console.log(this.state.cover);
    });
  }

  // User edit the post and update the post details 
  handlePost = () => {
    var image_url;
    console.log(this.state);
    try {
      var post_ref = f_database.ref("posts/" + this.state.post.pid);
      // update the details of the post
      post_ref.update({title: this.state.title, location: this.state.location, size: this.state.size, travel_style: this.state.travel_style, period: this.state.period});
      // if user update anther cover image, upload to the firebase storage and update the image link to the post
      if (this.state.cover) {
        const uploadImage = storage.ref('cover_images/' + this.state.post.pid + "/" + this.state.cover.name).put(this.state.cover);
        uploadImage.on('state_changed', (snapshot) => {}, error => {
          console.log(error);
        }, () => {
          storage.ref("cover_images/" + this.state.post.pid + "/").child(this.state.cover.name).getDownloadURL().then(i_url => {
            post_ref.update({url: i_url})
          })
        });
      } else if (this.state.post.url) {
        // cover image remains unchanged
        post_ref.update({url: this.state.post.url})
      }
      // user update the remark
      if (this.state.remark) {
        post_ref.update({remark: this.state.remark})
      }

    } catch (e) {
      console.log(e);
    }

  }

  render() {
    if (this.state.post && auth.currentUser.uid == this.state.post.uid) {
      return (<header className="container">
        <h1>Create / Edit Post Page</h1>
        <div className="wrapper">
          <div className="left-item">
            <span>Cover Photo:</span>
          </div>
          <div className="right-item"><img src={this.state.temp_cover
          ? this.state.temp_cover
          : this.state.url} id="image"/>
            <input type="file" accept="image/*" onChange={this.handleImage}></input>
          </div>
        </div>

        <div className="wrapper">
          <div className="left-item">
            <span>Title:</span>
          </div>
          <div className="right-item">
            <TextField name="title" label="Title" variant="filled" value={this.state.title} onChange={this.changeInput}/>
          </div>
        </div>

        <div className="wrapper">
          <div className="left-item">
            <span>Location:</span>
          </div>
          <div className="right-item">
            <TextField name="location" label="Location" variant="filled" value={this.state.location} onChange={this.changeInput}/>
          </div>
        </div>

        <div className="wrapper">
          <div className="left-item">
            <span>Group Size:</span>
          </div>
          <div className="right-item">
            <Select name="size" labelId="group size" id="group size" onChange={this.changeInput} variant="outlined" value={this.state.size}>
              <MenuItem value={"2-4"}>2-4</MenuItem>
              <MenuItem value={"5-8"}>5-8</MenuItem>
              <MenuItem value={"8+"}>8+</MenuItem>
            </Select>
          </div>
        </div>

        <div className="wrapper">
          <div className="left-item">
            <span>Period:</span>
          </div>
          <div className="right-item">
            <Select name="period" labelId="period" id="period" onChange={this.changeInput} variant="outlined" value={this.state.period}>
              <MenuItem value={"Weeks-Trip"}>Weeks-Trip</MenuItem>
              <MenuItem value={"Day-Trip"}>Day-Trip</MenuItem>
              <MenuItem value={"Exchange(student)"}>Exchange(student)</MenuItem>
              <MenuItem value={"Long-Trip"}>Long-Trip</MenuItem>
            </Select>
          </div>
        </div>

        <div className="wrapper">
          <div className="left-item">
            <span>Travelling Style:</span>
          </div>
          <div className="right-item">
            <Select name="travel-style" labelId="travel-style" id="travel-style" onChange={this.changeInput} variant="outlined" value={this.state.travel_style}>
              <MenuItem value={"None"}>None</MenuItem>
              <MenuItem value={"Sporty"}>Sporty</MenuItem>
              <MenuItem value={"Shopping"}>Shopping</MenuItem>
              <MenuItem value={"Cultural"}>Cultural</MenuItem>
            </Select>
          </div>
        </div>

        <div className="wrapper">
          <div className="left-item">
            <span>Remark:</span>
          </div>
          <div className="right-item">
            <textarea rows="3" placeholder="Enter something..." name="remark" value={this.state.remark} onChange={this.changeInput}></textarea>
          </div>
        </div>

        <Button type="submit" variant="contained" color="primary" mx='auto' style={{
            width: '30%',
            marginInline: '10%'
          }} onClick={this.handlePost}>
          SAVE CHANGES
        </Button>

      </header>);
    } else if (this.state.post) {
      return (<header className="container">
        <h1>You are not the Post Owner.</h1>
      </header>)
    } else {
      return (<header></header>)
    }
  }

}

export default EditPost;
