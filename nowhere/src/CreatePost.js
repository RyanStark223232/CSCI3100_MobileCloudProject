import React from "react";
import './CreatePost.css';
import Button from '@material-ui/core/Button';
import {storage, f_database, auth} from "./Firebase.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';



class CreatePost extends React.Component {

  constructor(){
    super();
    this.state = {
      title:null,
      location:null,
      size:'2-4',
      period:'Weeks-Trip',
      travel_style:'Sporty',
      remark:null,
      cover:null,
      temp_cover:null,
      url:null,
      pid:null
    };
    this.changeInput = this.changeInput.bind(this);
  }

  componentWillMount(){
    var post_ref = f_database.ref("posts/");
    var data=null;
    post_ref.orderByChild('pid').limitToLast(1).once("value",
     snapshot=>{
      snapshot.forEach(snap=>{data=snap.val()});
      this.setState({pid:data.pid+1});
      data!=null ? this.setState({pid:data.pid+1}) : this.setState({pid: 0});
    });
  }




  changeInput=async(event)=>{
    await this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state);
  }

  handleImage=(event)=>{
    this.setState({
      cover:event.target.files[0],
      temp_cover:URL.createObjectURL(event.target.files[0])
    },()=>{
      console.log(this.state.cover);
    });
  }




  handlePost=()=>{


    console.log(this.state);

    try{
      var current_uid = auth.currentUser.uid;

      var post_ref = f_database.ref("posts/");
      var data=null;
      post_ref.orderByChild('pid').limitToLast(1).on("value",
       snapshot=>{
        snapshot.forEach(snap=>{
          data=snap.val()
          this.setState({pid:data.pid});
        });
      });


      var postdb = post_ref.child(this.state.pid);
      postdb.set({
        title: this.state.title,
        location: this.state.location,
        size: this.state.size,
        travel_style: this.state.travel_style,
        uid:  current_uid,
        period: this.state.period,
        pid: this.state.pid,
        owner: auth.currentUser.email,
      });
      if(this.state.remark) {postdb.update({remark: this.state.remark})}
      if (this.state.cover){
        const uploadImage = storage.ref('cover_images/' +this.state.pid + "/" + this.state.cover.name).put(this.state.cover);
        uploadImage.on('state_changed',(snapshot)=>{},
        error=>{console.log(error);},
        ()=>{storage.ref("cover_images").child(this.state.cover.name)
            .getDownloadURL()
            .then(i_url=>{postdb.update({url:i_url})})
        });
        setTimeout(()=>{
           alert("Submitted to database posts/"+ this.state.pid);
        } , 2500);
      }


    } catch(e) {
      console.log(e);
      alert(e);
    }
  }





    render(){
        return (
            <header className="container">
                <h1>Create Post</h1>

                <div className="wrapper">
                  <div className="left-item"><span>Cover Photo:</span></div>
                  <div className="right-item"><img src={this.state.temp_cover} id="image" /><input type="file" accept="image/*" onChange={this.handleImage}></input></div>
                </div>

                <div className="wrapper">
                  <div className="left-item">
                    <span>Title:</span>
                  </div>
                  <div className="right-item">
                      <TextField
                        name="title"
                        label="Title"
                        variant="filled"
                        onChange={this.changeInput}
                      />
                  </div>
                </div>

                <div className="wrapper">
                  <div className="left-item">
                    <span>Location:</span>
                  </div>
                  <div className="right-item">
                      <TextField
                        name="location"
                        label="Location"
                        variant="filled"
                        onChange={this.changeInput}
                      />
                  </div>
                </div>

                <div className="wrapper">
                  <div className="left-item">
                    <span>Group Size:</span>
                  </div>
                  <div className="right-item">
                    <Select
                      name="size"
                      labelId="group size"
                      id="group size"
                      onChange={this.changeInput}
                      variant="outlined"
                      defaultValue={"2-4"}
                    >
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
                    <Select
                      name="period"
                      labelId="period"
                      id="period"
                      onChange={this.changeInput}
                      variant="outlined"
                      defaultValue={"Weeks-Trip"}
                    >
                      <MenuItem value={"Weeks-Trip"}>Weeks-Trip</MenuItem>
                      <MenuItem value={"Day-Trip"}>Day-Trip</MenuItem>
                      <MenuItem value={"Exchange(student)"}>Exchange(student)</MenuItem>
                      <MenuItem value={"Long-Trip"}>Long-Trip</MenuItem>
                    </Select>
                  </div>
                </div>

                <div className="wrapper">
                  <div className="left-item"><span>Travelling Style:</span></div>
                  <div className="right-item">
                    <Select
                      name="travel-style"
                      labelId="travel-style"
                      id="travel-style"
                      onChange={this.changeInput}
                      variant="outlined"
                      defaultValue={"Sporty"}
                    >
                      <MenuItem value={"Sporty"}>Sporty</MenuItem>
                      <MenuItem value={"Shopping"}>Shopping</MenuItem>
                      <MenuItem value={"Cultural"}>Cultural</MenuItem>
                    </Select>
                  </div>
                </div>

                <div className="wrapper">
                  <div className="left-item"><span>Remark:</span></div>
                  <div className="right-item"><textarea rows="3" placeholder="Enter something..." name="remark" value={this.state.remark} onChange={this.changeInput}></textarea></div>
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    mx='auto'
                    style = {{width:'30%', marginInline:'10%'}}
                    onClick={this.handlePost}
                >
                    Create Post
                </Button>
            </header>
        );
    }
}

export default CreatePost;
