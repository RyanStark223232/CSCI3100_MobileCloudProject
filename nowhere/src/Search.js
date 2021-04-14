import React from "react";
import * as tf from '@tensorflow/tfjs';
import FirebaseCrud from './FirebaseCrud.js';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SearchIcon from '@material-ui/icons/Search';

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            image:null,
            train:null,
            p1:null,
            p2:null,
            p3:null,
            autocompletePlace:"Stark",
            loaded:false,

            location:'',
            type:'',
            period:'',
            
        };
        // props.location.state stores the data passed from Homepage
        // if you go to search tab by clicking "Search" on top, props.location.state is undefined
        // if you use the search function in Homepage, there will be data
        this.props = props;
        this.loadImage = this.loadImage.bind(this);
        this.loadImagePassIn = this.loadImagePassIn.bind(this);
        this.load = this.load.bind(this);
        this.neuralInference = this.neuralInference.bind(this);
        const knnClassifier = require('@tensorflow-models/knn-classifier');
        this.classifier = knnClassifier.create();
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangePeriod = this.onChangePeriod.bind(this);
        this.updateStates = this.updateStates.bind(this);

        // Default Input Options for Material UI
        this.defaultPropsLocations = {
            options: topLocations,
            getOptionLabel: (option) => option.name,
        };

        this.defaultPropsSize = {
            options: sampleSize,
            getOptionLabel: (option) => option.size,
        };

        this.defaultPropsType = {
            options: sampleType,
            getOptionLabel: (option) => option.type,
        };

        this.defaultPropsPeriod = {
            options: samplePeriod,
            getOptionLabel: (option) => option.type,
        };
    }

    componentDidMount(){
        if (this.props.location.state != null){
            this.updateStates();     
            if (this.props.location.state.image != null){
                this.loadImagePassIn(this.props.location.state.image);
                this.props.location.state.image = null;
            }
        }
        
    }

    updateStates = async() =>{
        await this.setState({   location:this.props.location.state.location,
                                type:this.props.location.state.type,
                                period:this.props.location.state.period });
        console.log(this.props.location.state.location, this.props.location.state.type, this.props.location.state.period);
        console.log(this.state);
    }

    // onChange for Location Input
    onChangeLocation (event, values){
        var temp_location = '';
        if (values != null){
            temp_location = values.name;
        }
        else {
            temp_location = event.target.value            
        }

        if (temp_location){
            this.setState({location:temp_location});
        }
        else {
            this.setState({location:''});
        }
    }

    // onChange for Type
    onChangeType (event, values){
        if (values != null){
            console.log(values.type)
            this.setState({type:values.type});
        }
        else {
            console.log(event.target.value);
            this.setState({type:event.target.value});
        }
    }

    // onChange for Period
    onChangePeriod (event, values){
        if (values != null){
            console.log(values.type)
            this.setState({period:values.type});
        }
        else {
            console.log(event.target.value);
            this.setState({period:event.target.value});
        }
    }

    // Neural Inference
    neuralInference = async() =>{
        const img = document.getElementById('image');
        const mobilenet = require('@tensorflow-models/mobilenet');

        const model = await mobilenet.load();
        const predictions = await model.classify(img);

        console.log('Predictions: ');
        console.log(predictions);

        this.setState({p1:predictions[0].className,
                       p2:predictions[1].className,
                       p3:predictions[2].className
        })

        if (this.classifier.getNumClasses() > 0) {      
            // Get the activation from mobilenet from the webcam.
            const inf_activation = model.infer(img, 'conv_preds');
            // Get the most likely class and confidence from the classifier module.
            const result = await this.classifier.predictClass(inf_activation, 5);
            this.setState({location: result.label,});
            console.log("NN INFERENCE:", result);
        }
    }

    // Upon uploading an image, it perform neural network inference and find closest location
    loadImage = async(event) =>{
        await this.load();
        require('@tensorflow/tfjs-backend-webgl');
        if ((event.target.files[0]) == null){return};
        var url = URL.createObjectURL(event.target.files[0]);
        await this.setState({image:url});
        await this.neuralInference();
    };

    loadImagePassIn = async(url) =>{
        await this.load();
        require('@tensorflow/tfjs-backend-webgl');
        await this.setState({image:url});
        await this.neuralInference();
    };

    load() {
        if (this.state.loaded){
            console.log('data loaded');
            return
        }
        //can be change to other source
        require('@tensorflow/tfjs-backend-webgl');
        const data = require('./myData2.json')

        let tensorObj = data
        //covert back to tensor
        try {
            Object.keys(tensorObj).forEach((key) => {
                tensorObj[key] = tf.tensor(tensorObj[key], [tensorObj[key].length / 1024, 1024])
            })
        }
        catch(err) {
            console.log("Already Converted");
        }
        this.classifier.setClassifierDataset(tensorObj);
        console.log("Model Loaded");
        this.setState({loaded:true});
    }

    render(){
        const {classes} = this.props;
        return (
            <header>
                <div>
                    <img src={this.state.image} id="image" crossOrigin="anonymous" alt="test" style={{display: "none"}}></img>
                    <FormControl  className={classes.formControl}>
                        <div>
                            <Autocomplete
                                className={classes.search_bar}
                                {...this.defaultPropsLocations}
                                id="Location"
                                value={{name:this.state.location}}
                                debug
                                defaultValue={{ name: (this.props.location.state == null)?'': this.props.location.state.location}}
                                onChange={this.onChangeLocation}
                                renderInput={(params) => <TextField {...params}
                                    label="Location"
                                    variant="filled"
                                    margin="normal"
                                    onChange={this.onChangeLocation}
                                />}
                            />
                        </div>
                    </FormControl>

                    <FormControl  className={classes.formControl}>
                        <div>
                            <Autocomplete
                                className={classes.search_bar}
                                {...this.defaultPropsType}
                                id="Type"
                                debug
                                defaultValue={{ type: (this.props.location.state == null)?'': this.props.location.state.type}}
                                onChange={this.onChangeType}
                                renderInput={(params) => <TextField {...params}
                                    label="Type"
                                    variant="filled"
                                    margin="normal"
                                    value={this.state.type}
                                    onChange={this.onChangeType}
                                />}
                            />
                        </div>
                    </FormControl>

                    <FormControl  className={classes.formControl}>
                        <div>
                            <Autocomplete
                                className={classes.search_bar}
                                {...this.defaultPropsPeriod}
                                id="Period"
                                debug
                                defaultValue={{ type: (this.props.location.state == null)?'': this.props.location.state.period}}
                                onChange={this.onChangePeriod}
                                renderInput={(params) => <TextField {...params}
                                    label="Period"
                                    variant="filled"
                                    margin="normal"
                                    value={this.state.period}
                                    onChange={this.onChangePeriod}
                                />}
                            />
                        </div>
                    </FormControl>

                    <FormControl className={classes.imageControl} >
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={this.loadImage}
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained"
                                className={classes.upload_button}
                                component="span"
                                startIcon={<CloudUploadIcon />}>
                                Upload Image
                            </Button>
                        </label>
                        <Button
                            variant="contained"
                            color="default"
                            className={classes.search_button}
                            startIcon={<SearchIcon />}>
                            Search
                        </Button>
                    </FormControl>
                </div>

                <FirebaseCrud state={{state:this.state}}/>
            </header>
        );
    }
}

// Constant Variable for class styling
const useStyles = theme => ({
    formControl: {
      margin: theme.spacing(-1),
      marginTop: theme.spacing(3),
      minWidth: 200,
      background: "white",
      borderRadius: "10px",

    },
    imageControl: {
      margin: theme.spacing(2),
      marginTop: theme.spacing(0),
    },
    input: {
        display: 'none',
    },
    upload_button: {
        marginTop: theme.spacing(4),
        background:"white",
        width: "200px",
    },
    search_button: {
        marginTop: theme.spacing(0.5),
        background:"white",
        width: "200px",
    },
    search_bar: {
        borderRadius: "25px",
        marginTop: theme.spacing(0.5),
        background:"white",
        width: "200px",
        display: 'flex',
    },
});

export default withStyles(useStyles)(Search);

// Options for each input field
const topLocations = [
    { name: ''},
    { name: 'Japan' },
    { name: 'Britain' },
    { name: 'Hong Kong' },
    { name: 'United States' },
    { name: 'Africa' },
    { name: 'India' },
];

const sampleSize = [
    { size: ''},
    { size: '2-4' },
    { size: '4-8' },
    { size: '8+' },
];

const sampleType = [
    { type: ''},
    { type: 'Sporty' },
    { type: 'Shopping' },
    { type: 'Nature' },
]

const samplePeriod = [
    { type: ''},
    { type: 'Day-Trip' },
    { type: 'Weeks-Trip' },
    { type: 'Months-Trip' },
    { type: 'Exchange(student)'},
]

// Code for training, Commented out since it is useless now
/*
loadTrain = async(event) =>{
    require('@tensorflow/tfjs-backend-webgl');
    var url = URL.createObjectURL(event.target.files[0]);
    this.setState({train:url});
    const img = document.getElementById("train");
    const label = document.getElementById("train_class").value;
    const mobilenet = require('@tensorflow-models/mobilenet');
    const model = await mobilenet.load();
    const activation = await model.infer(img, true);
    await this.classifier.addExample(activation, label);
    console.log("Example Added");
}
*/

// Code for saving training, Commented out since it is useless now
/*
save() {
    let dataset = this.classifier.getClassifierDataset()
    var datasetObj = {}
    Object.keys(dataset).forEach((key) => {
        let data = dataset[key].dataSync();
        // use Array.from() so when JSON.stringify() it covert to an array string e.g [0.1,-0.2...]
        // instead of object e.g {0:"0.1", 1:"-0.2"...}
        datasetObj[key] = Array.from(data);
    });
    let jsonStr = JSON.stringify(datasetObj)
    //localStorage.setItem("myData", jsonStr);
    const blob = new Blob([jsonStr], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = "myData.json";
    link.href = url;
    link.click();
    console.log("Model Saved");
}
*/
