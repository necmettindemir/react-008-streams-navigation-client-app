import React from 'react';

import { connect } from 'react-redux';
import { signIn, signOut} from '../actions';

class GoogleAuth extends React.Component {

    //state = { isSignedIn: null };

    componentDidMount() {
        window.gapi.load('client:auth2', ()=> {
            window.gapi.client.init({
                clientId: '645399559453-ipcscud7tv3hqnirfa9atcj4rcvvfsg4.apps.googleusercontent.com',
                scope: 'email'
            }).then( () => {
                this.auth = window.gapi.auth2.getAuthInstance();
                
                
                this.onAuthChange(this.auth.isSignedIn.get());
                //this.props.signIn();

                //console.log('this.auth.isSignedIn.get() : ' , this.auth.isSignedIn.get());

                
                this.auth.isSignedIn.listen(this.onAuthChange);
            }) 
        });
    }

   /*  onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get()});
        console.log('this.state.isSignedIn: ',this.state.isSignedIn);
    } */

      onAuthChange = (isSignedIn) => {
        if (isSignedIn) 
        {
            const userId = this.auth.currentUser.get().getId();
            this.props.signIn(userId);// dispatch action
            
           // console.log('onAuthChange isSignedIn true:  ' , isSignedIn)
        }
        else 
        {
            this.props.signOut();//dispatch action

           // console.log('onAuthChange isSignedIn false:  ' , isSignedIn)
        }
    } 

    onSigninClick = () => {
        this.auth.signIn();//.then( () => { this.props.signIn();});
        //this.props.signIn();
        //console.log('signed in');
    }

    onSignOutClick = () => 
    {        
        this.auth.signOut();//.then( () => { this.props.signOut();});
        //this.props.signOut();
                // .then(()=> 
                // { 
                //     this.auth.disconnect();
                //     console.log('signed out');
                // });                                
    }

    renderAuthButton() {

       // console.log('in renderAuthButton : ' , this.props.isSignedIn);

        //if (this.state.isSignedIn === null)


        if (this.props.isSignedIn === null)
        {
           // console.log('in render isSignedIn === null');
            return <div>..</div>
        }
        //else if (this.state.isSignedIn=== true)
        else 
        if (this.props.isSignedIn === true)
        {
           // console.log('in render  isSignedIn === true');
            return (
                <div>
                   <button 
                        onClick={this.onSignOutClick}
                        className="ui red google button">
                        <i className="google icon" />
                        Sign Out
                   </button>
                </div>
            );
        }
        else 
        {
           // console.log('in render  isSignedIn === false');

            return (
                <div>
                     <button 
                        onClick={this.onSigninClick}
                        className="ui red google button">
                        <i className="google icon" />
                        Sign in
                   </button>
                </div>);
        }

    }

    render() {
        return (
            <div>
                { this.renderAuthButton() }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log('in mapStateToProps state.auth.isSignedIn  : ' ,  state.auth.isSignedIn);
    return {isSignedIn: state.auth.isSignedIn};
}

//export default GoogleAuth;

export default connect(  
                        mapStateToProps, 
                        { signIn, signOut} //to be able to dispatch with these 2 actions
                       )(GoogleAuth);