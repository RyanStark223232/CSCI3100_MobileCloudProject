
import hk from './hk-Trim.png';
import './Home.css';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from "react";
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from "react-router-dom";

class Home extends React.Component{
    constructor(props){
        super(props);
        // State of this class
        this.state = {
            image:null,
            location:null,
            group_size:null,
            type:null,
            period:null,
        };
        // Bind function to class
        this.onChangeSize = this.onChangeSize.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangePeriod = this.onChangePeriod.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
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

    uploadImage = async(event) =>{
        if ((event.target.files[0]) == null){return};
        var url = URL.createObjectURL(event.target.files[0]);
        await this.setState({image:url});
        console.log(this.state);
    };

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

    render(){
        const {classes} = this.props;
        return (
            <header>
                <div className="container">
                    <img src={hk} alt="hk" className="hk"></img>
                    <div>

                        <FormControl  className={classes.formControl}>
                            <div>
                                <Autocomplete
                                    className={classes.search_bar}
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
                            </div>
                        </FormControl>

                        <FormControl  className={classes.formControl}>
                            <div>
                                <Autocomplete
                                    className={classes.search_bar}
                                    {...this.defaultPropsType}
                                    id="Type"
                                    debug
                                    onChange={this.onChangeType}
                                    renderInput={(params) => <TextField {...params}
                                        label="Type"
                                        variant="filled"
                                        margin="normal"
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
                                    onChange={this.onChangePeriod}
                                    renderInput={(params) => <TextField {...params}
                                        label="Period"
                                        variant="filled"
                                        margin="normal"
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
                                onChange={this.uploadImage}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained"
                                    className={classes.upload_button}
                                    component="span"
                                    startIcon={<CloudUploadIcon />}>
                                    Upload Image
                                </Button>
                            </label>
                            <Link to={{pathname:"/search", state:this.state}}>
                                <Button
                                    variant="contained"
                                    color="default"
                                    className={classes.search_button}
                                    startIcon={<SearchIcon />}>
                                    Search
                                </Button>
                            </Link>
                        </FormControl>
                    </div>
                </div>
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

export default withStyles(useStyles)(Home);

// Options for each input field
const topLocations = [
    { name: 'Japan' },
    { name: 'Britain' },
    { name: 'Hong Kong' },
    { name: 'United States' },
    { name: 'Africa' },
    { name: 'India' },
];

const sampleSize = [
    { size: '2-4' },
    { size: '4-8' },
    { size: '8+' },
];

const sampleType = [
    { type: 'Sporty' },
    { type: 'Shopping' },
    { type: 'Nature' },
]

const samplePeriod = [
    { type: 'Day-Trip' },
    { type: 'Weeks-Trip' },
    { type: 'Months-Trip' },
    { type: 'Exchange(student)'},
]
