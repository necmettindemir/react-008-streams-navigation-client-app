import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';


class StreamDelete extends React.Component {


    componentDidMount() {

       // console.log('id : ', this.props.match.params.id);
       this.props.fetchStream( this.props.match.params.id );

    }


    

    renderActions() {

        //const id = this.props.match.params.id;

        const {id}= this.props.match.params;

            return (
                <React.Fragment>
                    
                    <button onClick={ () => this.props.deleteStream(id) } 
                            className="ui button negative">Delete</button>
                    <Link to="/" className="ui button">Cancel</Link>

                </React.Fragment>
            );
    }

    renderContent() {
        if (!this.props.stream) {
            return ' are you sure ?'
        }

        return `are you sure to delete stream with title : 
               ${this.props.stream.title}`  ;
    }

    render() { 

        return (
                          
                <Modal 
                    title="delete stream"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={ () => history.push('/') }
                />
            
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
} 

export default connect(mapStateToProps, 
                { fetchStream, deleteStream}
                )(StreamDelete);

//export default StreamDelete;