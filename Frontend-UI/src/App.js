import React , {Component} from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import './App.css';
import Particles from 'react-particles-js';
import  Clarifai  from 'clarifai' ;
import Demographics from './Components/Demographics/Demographics';
import D1 from './Components/Demographics/D1';
const app = new Clarifai.App({
  apiKey: 'c271dec1f3aa41dc8c861580156772ca'
 });
 
const particleoption ={
  particles : {
  number: {
    value: 250,
    density: {
      enable: true,
      value_area: 800
    }
  } 
 }
}

const isImage=1;
class App extends Component {
  constructor(){
    super();
    this.state={
      input : '',
      imageUrl :'',
      box : {},
      Appearance : {},
      gender :{},
      route : 'signin',
      isSignedIn : false,
      user : {
        id : '',
				name : '',
				email : '',
				count : 0,
				joined : '',
      }
    }
  }


  loadUser = (user) =>{
    console.log('before loading user',this.state.user);
    this.setState({
       user : {
        id : user.id,
        name : user.name,
        email : user.email,
        count : user.entries,
        joined: user.joined,
      }
    })
    console.log('after loading user',this.state.user);
  }


  calculateFaceBox = (data) =>{
    const face=data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(face);
    const image=document.getElementById('inputImage');
    const width=Number(image.width);
    const height=Number(image.height);
    console.log(width, height);
    return {
      leftCol : face.left_col * width ,
      topRow : face.top_row * height , 
      rightCol : width - (face.right_col * width) ,
      bottomRow : height - (face.bottom_row * height) 
    }
  }

  calculateGender = (data) =>{
   /* var demographics = {
      male:{},
      female:{},
      appearance:{},
    }
    demographics.male=data.outputs[0].data.regions[0].data.face.gender_appearance.concepts[0].value;
    demographics.female=data.outputs[0].data.regions[0].data.face.gender_appearance.concepts[1];
    demographics.appearance=data.outputs[0].data.regions[0].data.face.multicultural_appearance.concepts;*/
    return {
      gender1 : data.outputs[0].data.regions[0].data.concepts[20].name,
      value1  : data.outputs[0].data.regions[0].data.concepts[20].value,
      gender2 : data.outputs[0].data.regions[0].data.concepts[21].name,
      value2  : data.outputs[0].data.regions[0].data.concepts[21].value
    }
  }

  calculateAppearance = (response) =>{
    /*const name=data.outputs[0].data.regions[0].data.face.multicultural_appearance.concepts.map((item)=>{
      return item.name;
    })
    const value=data.outputs[0].data.regions[0].data.face.multicultural_appearance.concepts.map((item)=>{
      return item.value;
    })
    console.log("names are ",name);
    console.log("values are ",value);*/
    return {
      name1 : response.outputs[0].data.regions[0].data.concepts[22].name,
      value1 : response.outputs[0].data.regions[0].data.concepts[22].value,
      name2 : response.outputs[0].data.regions[0].data.concepts[23].name,
      value2 : response.outputs[0].data.regions[0].data.concepts[23].value,
      name3 : response.outputs[0].data.regions[0].data.concepts[24].name,
      value3 : response.outputs[0].data.regions[0].data.concepts[24].value,
      name4 : response.outputs[0].data.regions[0].data.concepts[25].name,
      value4 : response.outputs[0].data.regions[0].data.concepts[25].value,
      name5 : response.outputs[0].data.regions[0].data.concepts[26].name,
      value5 : response.outputs[0].data.regions[0].data.concepts[26].value,
      name6 : response.outputs[0].data.regions[0].data.concepts[27].name,
      value6 : response.outputs[0].data.regions[0].data.concepts[27].value,
      name7 : response.outputs[0].data.regions[0].data.concepts[28].name,
      value7 : response.outputs[0].data.regions[0].data.concepts[28].value
    }
  }

  displayAppearance = (Appearance) => {
    console.log("appearance is ",Appearance);
    this.setState({Appearance:Appearance});
    console.log("apperance state changed is", this.state.Appearance);
  }

  displayGender = (gender) => {
    console.log("gender is " , gender.gender2);
    this.setState({gender : gender});
    console.log("demographics after setting the state are", this.state.gender);
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box : box});
  }
  onInputChange = (event) => {
    this.setState({input : event.target.value});
  }

  onSubmit = () => {
    this.setState({imageUrl : this.state.input});
    app.models.predict("c0c0ac362b03416da06ab3fa36fb58e3",this.state.input)
    .then(response =>{
      if(response){
        fetch('http://localhost:3000/image',{
          method:'put',
          headers:{'content-type':'application/json'},
          body:JSON.stringify({
            id:this.state.user.id
          })
        })
        .then(response=>response.json())
        .then(count=>{
          this.setState(
            Object.assign(this.state.user , {count : count})
          )
        })
      }
      console.log(response);
      console.log(response.outputs[0].data.regions[0].data.concepts[20].name);
      this.displayFaceBox(this.calculateFaceBox(response));
      console.log(1);
      this.displayGender(this.calculateGender(response));
      console.log(2);
      this.displayAppearance(this.calculateAppearance(response));
    })
    .catch(error => console.log(error));
  }

  onRouteChange = (route) => {
    if(route==='signout'){
      this.setState({isSignedIn :false});
    }
    else if(route==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route})
    console.log('1');
  }

  render(){
    return (
      <div className='App'>
            <Particles className='particles'
              params={particleoption}
      />
      <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
     { this.state.route ==='home'

     ?<div>
        <Logo/>
        <Rank name={this.state.user.name} count={this.state.user.count}/>
        {this.state.imageUrl?<div><Demographics gender={this.state.gender} Appearance={this.state.Appearance}/></div>:<D1 />}
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
        <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
      </div>
    :(
      this.state.route ==='signin' 
      ?<Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
      :<Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
    )

     }
      </div>
    );
  }
}
export default App;
