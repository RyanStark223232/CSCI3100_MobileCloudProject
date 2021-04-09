import React from "react";
import './CreatePost.css';
import db from "./Firebase.js";
import {storage, f_database, auth} from "./Firebase.js";


class CreatePost extends React.Component {

  constructor(){
    super();
    this.state = {
      title:null,
      description:null,
      location:null,
      size:'2-4',
      period:'Weeks-Trip',
      travel_style:'Sporty',
      remark:null,
      post_id:null,
      cover:null,
      temp_cover:null,
      url:'123'
    };

    this.changeInput = this.changeInput.bind(this);
  }




  changeInput=(event)=>{
    this.setState({
      [event.target.name]: event.target.value
    });

  }

  handleImage=(event)=>{
    this.setState({
      cover:event.target.files[0],
      temp_cover:URL.createObjectURL(event.target.files[0])
    },()=>{
      console.log(this.state.cover);
    });
  }

  checking=()=>{
    console.log(this.state);
    var uid = auth.currentUser.uid;
    console.log(uid);
  }


  handlePost=()=>{
    console.log(this.state);
    try{
      const uploadImage = storage.ref('cover_images/' + this.state.cover.name).put(this.state.cover);
      uploadImage.on(
        "state_changed",snapshot=>{},
        error=>{
          console.log(error);
        },
        ()=>{
          storage.ref("cover_images").child(this.state.cover.name).getDownloadURL().
            then(url=>{
              console.log(url)
              this.setState({
                url: url
              });
              console.log("error?");
            })
        }
      );
      console.log(this.state);


      var current_uid = auth.currentUser.uid;

      f_database.ref("posts/" + this.state.title).set({
        url: this.state.url,
        title: this.state.title,
        description: this.state.description,
        location: this.state.location,
        size: this.state.size,
        travel_style: this.state.travel_style,
        remark: this.state.remark,
        uid:current_uid
      });

      alert("Submitted to database title/"+ this.state.title)
    } catch(e) {
      console.log(e)
      alert(e)
    }
  }

    render(){
        return (
            <header className="container">
                <h1>Create / Edit Post Page</h1>
                <div className="wrapper">
                  <div className="left-item"><span>Cover Photo:</span></div>

                  <div className="right-item"><img src={this.state.temp_cover} id="image" /><input type="file" accept="image/*" onChange={this.handleImage}></input></div>
                </div>
                <div className="wrapper">
                  <div className="left-item"><span>Title:</span></div>
                  <div className="right-item"><input size="60" type="text" placeholder="Enter something..." name="title" value={this.state.title} onChange={this.changeInput}></input></div>
                </div>
                <div className="wrapper">
                  <div className="left-item"><span>Description:</span></div>
                  <div className="right-item"><textarea rows="5" placeholder="Enter something..." name="description" value={this.state.description} onChange={this.changeInput}></textarea></div>
                </div>
                <div className="wrapper">
                  <div className="left-item"><span>Location:</span></div>
                  <div className="right-item"><input type="text" placeholder="Enter something..." name="location" value={this.state.location} onChange={this.changeInput}></input></div>
                </div>
                <div className="wrapper">
                  <div className="left-item"><span>Group Size:</span></div>
                  <div className="right-item">
                    <select id="group-size" name="group size"onChange={this.changeInput}>
                      <option value="2-4" >2-4</option>
                      <option value="5-8">5-8</option>
                      <option value="8+">8+</option>
                    </select>
                  </div>
                </div>
                <div className="wrapper">
                  <div className="left-item"><span>Period:</span></div>
                  <div className="right-item">
                    <select id="period" name="period" onChange={this.changeInput}>
                      <option value="Weeks-Trip" >Weeks-Trip</option>
                      <option value="Day-Trip">Day-Trip</option>
                      <option value="Exchange(student)">Exchange(student)</option>
                      <option value="Long-Trip">Long-Trip</option>
                    </select>
                  </div>
                </div>
                <div className="wrapper">
                  <div className="left-item"><span>Travelling Style:</span></div>
                  <div className="right-item">
                    <select id="travel-style" name="travel-style" onChange={this.changeInput}>
                      <option value="Sporty" >Sporty</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Cultural">Cultural</option>
                    </select>
                  </div>
                </div>
                <div className="wrapper">
                  <div className="left-item"><span>Remark:</span></div>
                  <div className="right-item"><textarea rows="3" placeholder="Enter something..." name="remark" value={this.state.remark} onChange={this.changeInput}></textarea></div>
                </div>
                <div id="save-btn"><button onClick={this.handlePost}>Save</button></div>
                <button onClick={this.checking}>Testing</button>
            </header>
        );
    }
}

export default CreatePost;
