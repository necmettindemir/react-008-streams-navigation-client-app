import React from 'react';
import { Field, reduxForm } from 'redux-form';


// Field     : react component to show on screen
// reduxForm : func


class StreamForm extends React.Component {        

    renderError({error, touched}) 
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

    }
        
     renderinput = ( {input,label, meta} ) =>
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
     }

    onSubmit = (formValues)  => {
       // console.log(formValues);
      // this.props.createStream(formValues);
      this.props.onSubmit(formValues);
    }

    render() {

        //console.log('render : ' , this.props);

        return (
            <form  
            onSubmit={this.props.handleSubmit(this.onSubmit)} 
            className="ui form error">

                <Field
                    label="enter title" 
                    name="title" 
                    component={this.renderinput}
                />                
                <br />
                <Field
                    label="enter desc" 
                    name="description" 
                    component={this.renderinput}
                />
                <br />
                <button className="ui button primary"> Submit </button>                

            </form>
        );
    }
};


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



export default reduxForm({
    form: 'streamForm',
    validate: customValidate
})(StreamForm);

