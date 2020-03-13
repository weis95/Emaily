import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
    renderFields(){
        return _.map(formFields, ({label, name}) => {
            return <Field key={name} component={SurveyField} type="text" label={label} name={name}/>
        })
    }
    render(){
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link className="red btn-flat left white-text" 
                    to="/surveys">
                        Cancel
                        <i className="material-icons right">cancel</i>
                    </Link>
                    <button className="teal btn-flat right white-text" 
                    type="submit">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

//Takes single arg from values to validate right data.
//Will automatically find the value.ELEMENT and sends the right error.
function validate(values) {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFields, ({ name }) => {
        //FOR RUNTIME JS WE USE THE [], ON THE FREAKING FLY
        if(!values[name]) {
            errors[name] = "Please provide a value";
        }
    });

    //emails regex function from utils.
    
    //return errors.
    return errors;
}

export default reduxForm({
    //es6 insted of validate: validate.
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);