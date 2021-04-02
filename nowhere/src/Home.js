import nowhere from './NowHere-logos-Trim.jpeg';
import hk from './hk.jpg';
import './Home.css';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from "react";
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SearchIcon from '@material-ui/icons/Search';

// Constant Variable for class styling
const useStyles = theme => ({
    formControl: {
      margin: theme.spacing(0),
      marginTop: theme.spacing(1),
      minWidth: 200,
      background:"white",
    },
    imageControl: {
      margin: theme.spacing(0),
      marginTop: theme.spacing(0),
    },
    input: {
        color: "black",
    },
    button: {
        marginTop: theme.spacing(1.5),
    },
});

class Home extends React.Component{
    constructor(props){
        super(props);
        // State of this class
        this.state = {
            image:null,
            location:null,
            group_size:null,
        };
        // You need to bind function to class
        this.onChangeSize = this.onChangeSize.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        // Default Input Options for Material UI
        this.defaultPropsLocations = {
            options: topLocations,
            getOptionLabel: (option) => option.name,
        };
        this.defaultPropsSize = {
            options: sampleSize,
            getOptionLabel: (option) => option.size,
        };
    }

    // onChange for Location Input
    onChangeLocation (event, values){
        if (values != null){
            console.log(values.name)
            this.setState({location:values.name});
        }
        else {
            console.log(event.target.value);
            this.setState({location:event.target.value});
        }
    }

    // onChange for Size Input
    onChangeSize (event, values){
        if (values != null){
            console.log(values.size)
            this.setState({group_size:values.size});
        }
        else {
            console.log(event.target.value);
            this.setState({group_size:event.target.value});
        }
    }

    render(){
        const {classes} = this.props;
        return (
            <header>
                <div name="Logo" class="logo">
                    <img src={nowhere} alt="logo"></img>
                </div>
                <div class="container">
                    <img src={hk} alt="hk" class="hk"></img>
                    <div>
                        <FormControl  className={classes.formControl} >
                            <Autocomplete
                                class="search"
                                {...this.defaultPropsLocations}
                                id="Location"
                                debug
                                onChange={this.onChangeLocation}
                                renderInput={(params) => <TextField {...params} 
                                    label="Location" 
                                    variant="filled" 
                                    margin="normal" 
                                    onChange={this.onChangeLocation}
                                />}
                            />
                        </FormControl>

                        <FormControl className={classes.formControl} >
                            <Autocomplete
                                class="search"
                                {...this.defaultPropsSize}
                                id="GroupSize"
                                debug
                                onChange={this.onChangeSize}
                                renderInput={(params) => <TextField {...params} 
                                    label="Group Size" 
                                    variant="filled" 
                                    margin="normal" 
                                    onChange={this.onChangeSize}
                                />}
                            />
                        </FormControl>

                        <FormControl className={classes.imageControl} >
                            <Button
                                variant="contained"
                                color="default"
                                className={classes.button}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload Image
                            </Button>
                            <Button
                                variant="contained"
                                color="default"
                                className={classes.button}
                                startIcon={<SearchIcon />}
                            >
                                Search
                            </Button>
                        </FormControl>
                    </div>
                </div>
            </header>
        );
    }
}
export default withStyles(useStyles)(Home);

// Options for each input field
const topLocations = [
    { name: 'Japan' },
    { name: 'Britain' },
    { name: 'Hong Kong' },
    { name: 'United States' },
    { name: 'Africa' },
];

const sampleSize = [
    { size: '2-4' },
    { size: '4-8' },
    { size: '8+' },
]
