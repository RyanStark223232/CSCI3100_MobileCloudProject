import React from "react";
import ReactDom from "react-dom";
import { render } from "react-dom";
import AvatarEditor from "react-avatar-editor";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

class PicUpload extends React.Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.setEditorRef = this.setEditorRef.bind(this);
    this.handleZoomSlider = this.handleZoomSlider.bind(this);
    this.rotateLeft = this.rotateLeft.bind(this);
    this.rotateRight = this.rotateRight.bind(this);
    this.state = {
      cropperOpen: false,
      img: null,
      zoom: 2,
      rotate: 0,
      croppedImg:
        this.props.img
    };
  }

  componentDidUpdate(prevProps) {
    if(this.props.img != prevProps.img){
      this.setState({croppedImg:this.props.img});
    }
  }

  //For zoom sliders
  handleZoomSlider(event, value) {
    let state = this.state;
    state.zoom = value;
    this.setState(state);
  }

  //For uploading file
  handleFileChange(e) {
    let url = window.URL.createObjectURL(e.target.files[0]);
    ReactDom.findDOMNode(this.refs.in).value = "";
    let state = this.state;
    state.img = url;
    state.cropperOpen = true;
    this.setState(state);
  }

  //For saving the file
  handleSave(e) {
    if (this.editor) {
      const canvasScaled = this.editor.getImageScaledToCanvas();
      const croppedImg = canvasScaled.toDataURL();

      let state = this.state;
      state.img = null;
      state.cropperOpen = false;
      state.croppedImg = croppedImg;
      state.rotate = 0;
      this.setState(state);
      //Update to EditProfile img state
      this.props.onSave(croppedImg);
    }
  }
  //For cancelling the editor
  handleCancel() {
    let state = this.state;
    state.cropperOpen = false;
    this.setState(state);
  }
  setEditorRef(editor) {
    this.editor = editor;
  }

  //For rotate buttons
  rotateLeft() {
    this.setState({
      rotate: this.state.rotate - 90
    });
  }

  rotateRight() {
    this.setState({
      rotate: this.state.rotate + 90
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div style={{ height: 475, display:'block', textAlign: 'center'  }}>
          <img src={this.state.croppedImg} style={{height:400, width: 400,  marginLeft: 'auto', marginRight: 'auto' }}/>
          <div
            style={{marginLeft: 'auto', marginRight: 'auto', paddingInline: '5%', marginTop:'2%' }}
          >
            <input
              ref="in"
              id="contained-button-file"
              type="file"
              accept="image/*"
              onChange={this.handleFileChange}
              style={{display:'none'}}
            />
            <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
                Upload Profile Picture
                </Button>
            </label>
          </div>
          {this.state.cropperOpen && (
            <div
              className="cropper-wrapper"
              style={{
                position: "absolute",
                top: 0,
                width: "100%",
                height: "100%",
                background: "rgba(200,200,200,.8)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: 'fixed',
                bottom: 0,
                right: 0,
                zIndex: 99,
              }}
            >
              <AvatarEditor
                ref={this.setEditorRef}
                image={this.state.img}
                width={500}
                height={500}
                border={50}
                color={[255, 255, 255, 0.6]} // RGBA
                rotate={this.state.rotate}
                scale={this.state.zoom}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <label
                  style={{
                    fontSize: 15,
                    marginRight: 10,
                    fontWeight: 600
                  }}
                >
                  Zoom
                </label>
                <Slider
                  min={1}
                  max={10}
                  step={0.1}
                  value={this.state.zoom}
                  onChange={this.handleZoomSlider}
                  style={{ width: 200 }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <label
                  style={{
                    fontSize: 15,
                    marginRight: 10,
                    fontWeight: 600
                  }}
                >
                  Rotate
                </label>
                <Button variant="contained" size="small" component="span" onClick={this.rotateLeft}>Left</Button>
                <Button variant="contained" size="small" component="span" onClick={this.rotateRight}>Right</Button>
              </div>
              <div>
                <Button
                  onClick={this.handleSave}
                  variant="contained"
                  size='small'
                  startIcon={<SaveIcon />}
                  color="primary"
                > Save
                </Button>
                <Button
                  onClick={this.handleCancel}
                  variant="contained"
                  size='small'
                  color="secondary"
                  startIcon={<CancelIcon />}
                > Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default PicUpload;