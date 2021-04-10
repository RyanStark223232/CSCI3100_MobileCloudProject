import React from "react";
import './CreatePost.css';
import {storage, f_database, auth} from "./Firebase.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


class CreatePost extends React.Component {

  constructor(){
    super();
    this.state = {
      title:null,
      description:null,
      location:null,
      size:null,
      period:null,
      travel_style:null,
      remark:null,
      post_id:null,
      cover:null,
      temp_cover:null,
      url:null,
      pid:null
    };

    this.changeInput = this.changeInput.bind(this);
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
        this.setState({
          title:this.state.post.title,
          description:this.state.post.description,
          location:this.state.post.location,
          size:this.state.post.size,
          period:this.state.post.period,
          travel_style:this.state.post.travel_style,
          remark:this.state.post.remark,
          post_id:this.state.post.post_id,
          url:this.state.post.url
        })
      })
    });

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
    var data =null;
    f_database.ref("posts").orderByChild('pid').limitToLast(1).on("value", snapshot=>{
      snapshot.forEach(snap=>{
        data=snap.val()
      });
      console.log(data);
      if(data.pid != null){
        this.setState({
          pid:data.pid+1
        });
      }else{
        this.setState({
          pid: 0
        })
      }
      console.log(this.state.pid);
    });
  }

  handlePost=()=>{
    console.log(this.state);

    var image_url;
    try{

      var data =null;
      f_database.ref("posts").orderByChild('pid').limitToLast(1).on("value", snapshot=>{
        snapshot.forEach(snap=>{
          data=snap.val()
        });
        console.log(data);
        if(data.pid != null){
          this.setState({
            pid:data.pid+1
          });
        }else{
          this.setState({
            pid: 0
          })
        }
        console.log(this.state.pid);
      });

      const uploadImage = storage.ref('cover_images/' + this.state.cover.name).put(this.state.cover);
      uploadImage.on(
        'state_changed',(snapshot)=>{},
        error=>{
          console.log(error);
        },
        ()=>{
          storage.ref("cover_images").child(this.state.cover.name).getDownloadURL().
            then(url=>{
              image_url=url;
              this.setState({
                url:image_url
              })
              console.log(typeof image_url);
            }
          ).then(()=>{
            console.log(image_url);
            var current_uid = auth.currentUser.uid;

            f_database.ref("posts/" + this.state.title).set({
              title: this.state.title,
              description: this.state.description,
              location: this.state.location,
              size: this.state.size,
              travel_style: this.state.travel_style,
              remark: this.state.remark,
              uid:  current_uid,
              period: this.state.period,
              url: image_url,
              pid: this.state.pid
            });

            alert("Submitted to database title/"+ this.state.title);
          })
        });
    } catch(e) {
      console.log(e);
      alert(e);
    }
  }


    render(){
      if(this.state.post){
        return (
            <header className="container">
                <h1>Create / Edit Post Page</h1>
                <div className="wrapper">
                  <div className="left-item"><span>Cover Photo:</span></div>

                  <div className="right-item"><img src={this.state.temp_cover?this.state.temp_cover:this.state.url} id="image" /><input type="file" accept="image/*" onChange={this.handleImage}></input></div>
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
                    <select id="group-size" name="group size" onChange={this.changeInput}>
                      <option value="2-4">2-4</option>
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
    }else{
      return(
        <header></header>
      )
    }
  }

}

export default CreatePost;
