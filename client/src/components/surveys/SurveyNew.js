import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import SurveyForm from './SurveyForm';
import SurverFormReview from './SurveyFormReview';

class SurveyNew extends Component {

    //ES& constructor shortcut. setting state with props super etc
    state = { showFormReview: false};

    renderContent() {
        if (this.state.showFormReview) {
            return <SurverFormReview 
            //passing a callback for the SurveyFromReview
            onCancel={() => this.setState({ showFormReview: false})}
            />;
        }

        return (
            <SurveyForm 
            onSurveySubmit={() => this.setState({ showFormReview: true })}
            />
        );
    }

    render(){
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default withRouter(reduxForm({
    form: 'surveyForm'
  })(SurveyNew));