import React from "react";
import SearchField from "react-search-field";
import * as tf from '@tensorflow/tfjs';
import FilteringTable from './FilteringTable.jsx';

{/* Template Source: https://github.com/nutboltu/react-search-field */}

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            image:null,
            train:null,
            p1:null,
            p2:null,
            p3:null,
            place:null,
            loaded:false,
        };
        // props.location.state stores the data passed from Homepage
        // if you go to search tab by clicking "Search" on top, props.location.state is undefined
        // if you use the search function in Homepage, there will be data
        if (props.location.state != null){
            console.log("Data Passed In", props.location.state);
        }
        this.onChange = this.onChange.bind(this);
        this.loadImage = this.loadImage.bind(this);
        this.load = this.load.bind(this);
        const knnClassifier = require('@tensorflow-models/knn-classifier');
        this.classifier = knnClassifier.create();
    }

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

    // Upon uploading an image, it perform neural network inference and find closest location
    loadImage = async(event) =>{
        require('@tensorflow/tfjs-backend-webgl');
        if ((event.target.files[0]) == null){return};
        var url = URL.createObjectURL(event.target.files[0]);
        this.setState({image:url});
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
            const result = await this.classifier.predictClass(inf_activation, 1);
            this.setState({place:result.label});
            console.log(result);
        }
    };

    onChange(value, event){
        console.log(value);
        console.log(event);
    }

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

    load() {
        if (this.state.loaded){
            console.log('data loaded');
            return
        }
        //can be change to other source
        require('@tensorflow/tfjs-backend-webgl');
        var data = require('./myData.json')
        console.log(data)
        let tensorObj = data
        //covert back to tensor
        Object.keys(tensorObj).forEach((key) => {
            tensorObj[key] = tf.tensor(tensorObj[key], [tensorObj[key].length / 1024, 1024])
        })
        this.classifier.setClassifierDataset(tensorObj);
        console.log("Model Loaded");
        this.setState({loaded:true});
    }

    render(){
        
        return (
            <header>
                <SearchField
                placeholder="Search..."
                onChange={this.onChange}
                searchText="This is initial search text"
                classNames="test-class"
                />
                <div>
                    <input type="file" id="input_image" onChange={this.loadImage}/>
                </div>
                <div>
                    <button onClick={this.load} id="button2">Load</button>
                </div>
                <div>
                    <img src={this.state.image} id="image" crossOrigin="anonymous" alt="test"></img>
                </div>
                <div>
                    <h5>Similar 1st: {this.state.p1}</h5>
                    <h5>Similar 2nd: {this.state.p2}</h5>
                    <h5>Similar 3rd: {this.state.p3}</h5>
                    <h1>Similar Location: {this.state.place}</h1>
                </div>
                <FilteringTable/>
            </header>
        );
    }
}

export default Search;