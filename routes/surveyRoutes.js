const _ = require('lodash');
const { Path } = require('path-parser');
//DEFAULT MODULE IN NODE. HELPERS FOR URL PARSING
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require ('../services/emailTemplates/surveyTemplate');

//Importing survey to create a new instance.
const Survey = mongoose.model('surveys');

module.exports = app => {

    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id })
            .select({ recipients: false });

        res.send(surveys);
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!')
    });


    //for sendgrid, to minitor the data they click etc.
    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');
     
        _.chain(req.body)
          .map(({ email, url }) => {
            // Check for url here
            if (!url) {
              return res.status(400).json({ error: 'Some error message' });
            } else {
              const match = p.test(new URL(url).pathname); 
     
              if (match) {
                return {
                  email,
                  surveyId: match.surveyId,
                  choice: match.choice,
                };
              }
              
            }
          })
          .compact()
          .uniqBy('email', 'url', 'surveyId')
          .each(({ surveyId, email, choice }) => {
            Survey.updateOne(
              {
                _id: surveyId,
                recipients: { $elemMatch: { email: email, responded: false } },
              },
              {
                $inc: { [choice]: 1 },
                $set: { 'recipients.$.responded': true },
                lastResponded: new Date(),
              }
            ).exec();
          })
          .value();
      });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const {title, subject, body, recipients } = req.body;
        //this is an instance of a survey
        const survey = new Survey ({
            title,
            subject,
            body,
            //recipients is a sub domain collection located in models
            recipients: recipients.split(',').map(email => ({ email: email.trim() })), // we split the array with a comma and we make a new array with the map function. We create and object from the email object.
            _user: req.user.id, //indicating the relation, mongoose fetches the property
            dateSent: Date.now()
        });

        //Send email here after we created survey. creating new instance of mailer.
        //Template is created in services/emailTemplate/
        const mailer = new Mailer(survey, surveyTemplate(survey));
        //adding error handling, since a lot could go wrong
        try{
            //we send the mail.
            await mailer.send();
            //saving survey to db
            await survey.save();
            //user credit update
            req.user.credits -= 1;
            //waiting for user to be saved to update the user info across the site
            const user = await req.user.save();

            res.send(user);
        } catch (err) {
            res.status(422).send(err); //incase survey is wrong or so
        }
    });
};