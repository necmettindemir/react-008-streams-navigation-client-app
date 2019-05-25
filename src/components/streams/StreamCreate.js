import React from 'react';
//import { Field, reduxForm } from 'redux-form';

import { connect } from 'react-redux';
import { createStream} from '../../actions';

import StreamForm from './StreamForm';

// Field     : react component to show on screen
// reduxForm : func

//const StreamCreate = () => {
class StreamCreate extends React.Component {        

/*     renderinput(formProps){
        return (
            <input 
                onChange={formProps.input.onChange}
                value={formProps.input.value}
            />
        );
    }
 */

/*     renderinput(formProps)    
    {
        return (
            <input {...formProps.input}/>
        );
    }
 */

   /*  renderError({error, touched}) 
    {
        if (touched && error) {
            return(
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>                    
                </div>
            );
        }
        else{
            ;
        }

    } */
        
    /*  renderinput = ( {input,label, meta} ) =>
     {
        const className = `field ${meta.error && meta.touched ? 'error' : ''} `;
       
       // console.log('meta: ', meta);

         return (
             <div className={className}>
                 <label>{label}</label>
                <input {...input} autoComplete="off"/>                
                {this.renderError(meta)}
             </div>
             
         );
     } */

    onSubmit = (formValues)  => {
       // console.log(formValues);
       this.props.createStream(formValues);
    }

    render() {

        //console.log('render : ' , this.props);

        return (
          <div>
              <h3>create a stream</h3>
              <StreamForm onSubmit={this.onSubmit} />
          </div>

        );
    }
};

/* 
const customValidate = (formValues) => {
    
    const errors = {};

    if (!formValues.title) {
        errors.title = 'you must enter title';
    }

    if (!formValues.description) {
        errors.description = 'you must enter desc';
    }
    
    return errors;

}

 */
//export default StreamCreate;

/* export default reduxForm({
    form: 'streamCreate',
    validate: customValidate
})(StreamCreate);
 */

/* export default connect()(reduxForm({
    form: 'streamCreate',
    validate: customValidate
})(StreamCreate));
 */


/* const formWrapped = reduxForm({
    form: 'streamCreate',
    validate: customValidate
})(StreamCreate); */

export default connect(null, {createStream})(StreamCreate);