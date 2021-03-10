import React from "react";
import SearchField from "react-search-field";
import * as tf from '@tensorflow/tfjs';

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
        };
        this.onChange = this.onChange.bind(this);
        this.loadImage = this.loadImage.bind(this);
        this.load = this.load.bind(this);
        this.save = this.save.bind(this);
        const knnClassifier = require('@tensorflow-models/knn-classifier');
        this.classifier = knnClassifier.create();
    }

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
            const result = await this.classifier.predictClass(inf_activation);
            this.setState({place:result.label});
            console.log(result);
        }
    };

    onChange(value, event){
        console.log(value);
        console.log(event);
    }

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
        //can be change to other source
        localStorage.setItem("myData", jsonStr);
        console.log("Model Saved");
    }

    load() {
        //can be change to other source
       let dataset = localStorage.getItem("myData")
       let tensorObj = JSON.parse(dataset)
       //covert back to tensor
       Object.keys(tensorObj).forEach((key) => {
         tensorObj[key] = tf.tensor(tensorObj[key], [tensorObj[key].length / 1024, 1024])
       })
       this.classifier.setClassifierDataset(tensorObj);
       console.log("Model Loaded");
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
                    <input type="file" id="train_image" onChange={this.loadTrain}/>
                    <input type="text" id="train_class" name="train_class"></input>
                </div>
                <div>
                    <button onClick={this.save} id="button1">Save</button>
                    <button onClick={this.load} id="button2">Load</button>
                </div>
                <div>
                    <img src={this.state.image} id="image" crossOrigin="anonymous" alt="test"></img>
                </div>
                <div>
                    <img src={this.state.train} id="train" crossOrigin="anonymous" alt="train"></img>
                </div>
                <div>
                    <h5>1st: {this.state.p1}</h5>
                    <h5>2nd: {this.state.p2}</h5>
                    <h5>3rd: {this.state.p3}</h5>
                    <h1>Self Trained: {this.state.place}</h1>
                </div>
            </header>
        );
    }
}

export default Search;