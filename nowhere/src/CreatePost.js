import React from "react";
import './CreatePost.css';
import db from "./Firebase.js";

const axios = require('axios').default;
// import db from "./Firebase.js";


<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

class CreatePost extends React.Component {
  constructor(){
    super();
    this.state = {
      title:'',
      description:'',
      location:'',
      quota:'',
      periodStart:'',
      periodEnd:'',
      remark:'',
      selectedFiles: null
    };

    this.onInputchange=this.onInputchange.bind(this);
  }


  fileSelector =(event) =>{
    this.setState({
      selectedFiles: event.target.files[0]
    });
    console.log(event.target.files[0]);
  }
  fileUpload = () =>{
    console.log(this.selectFiles.name);
    const fd = new FormData();
    fd.append('image',this.selectedFiles,this.selectedFiles.name);
    axios.post('./',fd).then(res =>{
      console.log(res);
    });
  }

  onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // CreatePost(e){
  //   e.preventDefault
  //   try{
  //     console.log(auth);
  //   }catch(error){
  //     console.log(error);
  //   }
  // }

    render(){
        return (
            <header className="container">
                <h1>
                    Create / Edit Post Page
                </h1>
                <form>
                  <div className="wrapper">
                    <div className="left-item"><span>Title:</span></div>
                    <div className="right-item"><input size="60" type="text" name="title" placeholder="Enter something..." value={this.state.title} onChange={this.onInputchange}></input></div>
                  </div>
                  <div className="wrapper">
                    <div className="left-item"><span>Description:</span></div>
                    <div className="right-item"><textarea rows="5" name="description" placeholder="Enter something..." value={this.state.description} onChange={this.onInputchange}></textarea></div>
                  </div>
                  <div className="wrapper">
                    <div className="left-item"><span>Location:</span></div>
                    <div className="right-item"><input type="text" name="location" placeholder="Enter something..." value={this.state.location} onChange={this.onInputchange}></input></div>
                  </div>
                  <div className="wrapper">
                    <div className="left-item"><span>Quota:</span></div>
                    <div className="right-item"><input type="text" name="quota" placeholder="Enter something..." value={this.state.quota} onChange={this.onInputchange}></input></div>
                  </div>
                  <div className="wrapper">
                    <div className="left-item"><span>Period:</span></div>
                    <div className="right-item"><input type="text" placeholder="Enter something..."value={this.state.quota} onChange={this.onInputchange} name="period"></input>
                      // <input type="date" name="periodStart" onChange={this.onInputchange}></input> to <input type="date" name="periodEnd" onChange={this.onInputchange}></input></div>
                  </div>
                  <div className="wrapper">
                    <div className="left-item"><span>Remark:</span></div>
                    <div className="right-item"><textarea rows="3" name="remark" placeholder="Enter something..." value={this.state.remark} onChange={this.onInputchange}></textarea></div>
                  </div>
                  <div className="wrapper">
                    <div className="left-item">Upload Images:</div>
                    <div className="right-item"><input type="file" onChange={this.fileSelector}></input></div>
                  </div>
                    <div id="save-btn"><button onChange={this.fileUpload}>Save</button></div>
                  </form>
            </header>
        );
    }

}

export default CreatePost;
