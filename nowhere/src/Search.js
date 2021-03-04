import React from "react";
import SearchField from "react-search-field";

{/* Template Source: https://github.com/nutboltu/react-search-field */}

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            image:null,
            p1:null,
            p2:null,
            p3:null,
        };
        this.onChange = this.onChange.bind(this);
        this.loadImage = this.loadImage.bind(this);
    }

    loadImage = async(event) =>{
        require('@tensorflow/tfjs-backend-webgl');
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
    };

    onChange(value, event){
        console.log(value);
        console.log(event);
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
                    <img src={this.state.image} id="image" crossOrigin="anonymous" alt="test"></img>
                </div>
                <div>
                    <h5>1st: {this.state.p1}</h5>
                    <h5>2nd: {this.state.p2}</h5>
                    <h5>3rd: {this.state.p3}</h5>
                </div>
            </header>
        );
    }
}

export default Search;