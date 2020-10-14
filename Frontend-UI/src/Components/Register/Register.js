import React , {Component} from 'react';

class  Register extends Component {

    constructor(props){
        super(props);
        this.state={
            registerName:'',
            registerEmail:'',
            registerPassword:'',
        }
    }

    onNameChange = (event) =>{
        this.setState({registerName:event.target.value});
    }
    onEmailChange = (event) => {
        this.setState({registerEmail:event.target.value});
    }
    onPasswordChange = (event) => {
        this.setState({registerPassword:event.target.value});
    }
    onRegister = () => {
        fetch('http://localhost:3000/register',{
            method : 'post',
            headers:{'content-type':'application/json'},
            body:JSON.stringify({
                email:this.state.registerEmail,
                name:this.state.registerName,
                password:this.state.registerPassword,
            })
        })
        .then((response)=>response.json())
        .then((user)=>{
            console.log(user);
            if(user){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    }

    render(){

    return (
        <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow center">
            <main className="pa4 black-80">
            <div className="measure ">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                     onChange={this.onNameChange}
                     type="text" name="name"  id="name" />
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    onChange={this.onEmailChange}
                    type="email" name="email-address"  id="email-address" />
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    onChange={this.onPasswordChange}
                    type="password" name="password"  id="password" />
                </div>
                </fieldset>
                <div className="">
                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                onClick={this.onRegister}
                type="submit" value="Register" />
                </div>

            </div>
            </main>
        </article>      
        
        );
    }
}


export default Register;

/*()=>this.props.onRouteChange('home')*/