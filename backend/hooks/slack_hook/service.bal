import ballerina/http;
import ballerinax/trigger.slack;
import ballerina/log;
import ballerinax/slack as slackClient;

# A service representing the slack service
# bound to port `9090`.

configurable string SLACK_USER_OAUTH_TOKEN = ?;
configurable string SLACK_VERIFICATION_TOKEN = ?;
configurable string SLACK_HELP_CHANNEL_ID = ?;
configurable string SUPPORT_TEAM_EMAIL = ?;
configurable string EMAIL_SERVICE_URL = ?;

slack:ListenerConfig slackConfig = {    //this is for the webhook
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

            slackClient:ConnectionConfig slackClientConfig = {  //this is for the slack client
                auth : {
                    token : SLACK_USER_OAUTH_TOKEN
                }
            };

            slackClient:Client|error slackClientConection = check new (slackClientConfig);

            if (slackClientConection is error) {
                log:printError("Error while creating the slack client", slackClientConection);
                return;
            }

            slackClient:User|error userResponse = slackClientConection->getUserInfoByUserId(user);

            if (userResponse is error) {
                log:printError("Error while getting the user info", userResponse);
                return;
            }

            string userName = userResponse.name;

            string emailMsg = "There is a new message in the help channel from " + userName + ":\n\n" + text;

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
