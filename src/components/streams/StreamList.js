import React from 'react';
import { connect } from 'react-redux';
import {Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {

    componentDidMount() {
        this.props.fetchStreams();//call action creater
    }

    //render admin buttons for each line
    renderAdmin = (stream) => {

        if (
             (stream.userId === this.props.currentUserId) 
             && (stream.userId)
            )

        return (
            <div  className="right floated content">                
               
                <Link to={`/streams/edit/${stream.id}`} 
                     className="ui button primary">
                     Edit
                </Link>

                <Link to={`/streams/delete/${stream.id}`} 
                     className="ui button negative">
                     Delete
                </Link>

                
            </div>
        );
    }

    //render all list of stream
    renderStreams = () => {
            return this.props.streams.map(stream =>{
                return ( 
                    <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera"/>
                    
                    <div className="content">
                        
                        <Link
                            className="header"
                             to={`/streams/${stream.id}`}>
                            {stream.title}
                        </Link>
                        
                        <div className="description"><i>{stream.description}</i></div>                        
                    </div>

                    
                    
                </div>
                );              
            } 
        );
    }


    //if user is signed in show the button of createStream 
    renderCreate =() => {
        if (this.props.isSignedIn)
        return (
            <div stlye={{textAlign:'right'}}>
                <Link  to="/streams/new" className="ui button primary">
                Create Stream
                </Link>
            </div>
        );
    }


    //default render method
    render() {
        
        console.log(this.props.streams);

        return (
            <div>
                <h2>StreamList</h2>
                <div className="ui celled list">
                    {this.renderStreams()}
                </div>
                {this.renderCreate()}
            </div>
        );
    }

};

const mapStateToProps = (state) => {
    return { 
                streams: Object.values( state.streams),
                currentUserId: state.auth.userId,
                isSignedIn: state.auth.isSignedIn
           }
}

//after running of action creator reducers work.
//after reducers work store is updated
//after store is updated render methods of related components rerun
export default connect(mapStateToProps, {fetchStreams})(StreamList);