const keys = require('../../config/keys');
//CONTAINS ACTUAL HTML DISPLAYED IN EMAILS
module.exports = (survey) => {
    return `
    <html>
        <body>
            <div style="text-align: center;">
                <h3>I'd like your input!</h3>
                <p>please answer the following question:</p>
                <p>${survey.body}</p>
                <div>
                    <a href="${keys.redirectDomain}/api/surveys/${survey.id}/Yes">Yes</a>
                </div>
                <div>
                    <a href="${keys.redirectDomain}/api/surveys/${survey.id}/No">No</a>
            </div>
            </div>
        </body>
    </html>
    `;
}



