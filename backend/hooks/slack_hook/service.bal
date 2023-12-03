import ballerina/http;
import ballerinax/trigger.slack;
import ballerina/log;

# A service representing the slack service
# bound to port `9090`.

configurable string SLACK_VERIFICATION_TOKEN = ?;
configurable string SLACK_HELP_CHANNEL_ID = ?;
configurable string SUPPORT_TEAM_EMAIL = ?;
configurable string EMAIL_SERVICE_URL = ?;

slack:ListenerConfig slackConfig = {
    verificationToken: SLACK_VERIFICATION_TOKEN
};

listener slack:Listener slackListener = new (slackConfig);

service slack:MessageService on slackListener{
    isolated remote function onMessage(slack:Message payload) returns error? {
        if SLACK_HELP_CHANNEL_ID == payload.event.channel {
            //send the email to support team email address using email service
            //create a new email client
            http:Client|error emailClient = new (EMAIL_SERVICE_URL);

            if (emailClient is error) {
                log:printError("Error while creating the email client", emailClient);
                return;
            }

            log:printInfo(payload.toJsonString());

            string user = payload.event["user"].toString();
            string text = payload.event["text"].toString();

            string emailMsg = "There is a new message in the help channel from " + user + ":\n\n" + text;

            json emailPayload = {
                "email": SUPPORT_TEAM_EMAIL,
                "subject": "New message in the Help channel of Grama-Sewa app in Slack",
                "message": emailMsg,
                "isHTMLMsg": false
            };

            http:Response|http:ClientError unionResult = emailClient->/sendemail.post(emailPayload);

            if unionResult is http:ClientError {
                log:printError("Error while sending the email due to a client error", unionResult);
                return;
            }

            if unionResult.statusCode == 201 {
                log:printInfo("Email sent successfully");
                return;
            } 
            else if unionResult.statusCode == 500 {
                log:printError("Error while sending the email due to an internal server error");
                return;
            }
            else{
                log:printError("Error while sending the email due to an unknown error");
                return;
            }
        }
    }

    remote function onMessageAppHome(slack:GenericEventWrapper payload) returns error? {
        return;
    }

    remote function onMessageChannels(slack:GenericEventWrapper payload) returns error? {
        return;
    }

    remote function onMessageGroups(slack:GenericEventWrapper payload) returns error? {
        return;
    }

    remote function onMessageIm(slack:GenericEventWrapper payload) returns error? {
        return;
    }

    remote function onMessageMpim(slack:GenericEventWrapper payload) returns error? {
        return;
    }
}
