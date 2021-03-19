import React from "react";
import './CreatePost.css';
const axios = require('axios').default;



<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

class CreatePost extends React.Component {

  state = {
    selectedFiles: null
  }

  fileSelector =(event) =>{
    this.setState({
      selectedFiles: event.target.files[0]
    })
    console.log(event);
  }
  fileUpload = () =>{
    console.log(this.selectFiles.name);
    const fd = new FormData();
    fd.append('image',this.selectedFiles,this.selectedFiles.name);
    axios.post('./',fd).then(res =>{
      console.log(res);
    });
  }

    render(){
        return (
            <header className="container">
                <h1>
                    Create / Edit Post Page
                </h1>
                <div className="wrapper">
                  <div className="left-item"><span>Title:</span></div>
                  <div className="right-item"><input size="60" type="text" placeholder="Enter something..."></input></div>
                </div>
                <div className="wrapper">
                  <div className="left-item"><span>Description:</span></div>
                  <div className="right-item"><textarea rows="5" placeholder="Enter something..."></textarea></div>
                </div>
                <div className="wrapper">
                  <div className="left-item"><span>Location:</span></div>
                  <div className="right-item"><input type="text" placeholder="Enter something..."></input></div>
                </div>
                <div className="wrapper">
                  <div className="left-item"><span>Size:</span></div>
                  <div className="right-item"><input type="text" placeholder="Enter something..."></input></div>
                </div>
                <div className="wrapper">
                  <div className="left-item"><span>Period:</span></div>
                  <div className="right-item"><input type="text" placeholder="Enter something..."></input></div>
                </div>
                <div className="wrapper">
                  <div className="left-item"><span>Travelling Style:</span></div>
                  <div className="right-item"><input type="text" placeholder="Enter something..."></input></div>
                </div>
                <div className="wrapper">
                  <div className="left-item"><span>Remark:</span></div>
                  <div className="right-item"><textarea rows="3" placeholder="Enter something..."></textarea></div>
                </div>
                <div className="wrapper">
                  <div className="left-item">Upload Images:</div>
                  <div className="right-item"><input type="file" onChange={this.fileSelector}></input></div>
                </div>
                  <div id="save-btn"><button onChange={this.fileUpload}>Save</button></div>

            </header>
        );
    }

}

export default CreatePost;
