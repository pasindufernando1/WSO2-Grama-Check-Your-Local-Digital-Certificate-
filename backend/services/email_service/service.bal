import ballerina/http;
import ballerina/email;

# A service representing a network-accessible API
# bound to port `9090`.

configurable string SMTP_EMAIL = ?;
configurable string SMTP_PASSWORD = ?;
configurable string SMTP_HOST = ?;
configurable int SMTP_PORT = ?;

# payload for sending the email
# + email - the email address to send the relevant message
# + message - the string message to be sent
# + isHTMLMsg - boolean to check if the message string contains a html or not
# + subject - the string subject of the email
type EmailMessage record {|
    string email;
    string message;
    boolean isHTMLMsg;
    string subject;
|};

type InternalServerError record {|
    *http:InternalServerError;
    json body;
|};

type EmailCreated record {|
    *http:Created;
    json body;
|};


service /api/v1 on new http:Listener(9090) {
    private final email:SmtpClient smtpClient;

    public function init() returns error? {
        // email:SmtpConfiguration config = {
        //     port: SMTP_PORT
        // };
        self.smtpClient = check new (SMTP_HOST, SMTP_EMAIL, SMTP_PASSWORD);
    }

    # A resource for sending an email, with relevant message
    # + emailMsgParams - EmailMessage record type 
    # + return - Returns internal server error if failed to send the email, sends 201 created for succesfully sending the email
    resource function post sendemail(EmailMessage emailMsgParams) returns InternalServerError|EmailCreated|error {
        email:Message sendingEmail;

        if(emailMsgParams.isHTMLMsg) {
            sendingEmail = {
                to: [emailMsgParams.email],
                subject : emailMsgParams.subject,
                sender : SMTP_EMAIL,
                'from : SMTP_EMAIL,
                htmlBody : emailMsgParams.message
            };
        }
        else{
            sendingEmail = {
                to: [emailMsgParams.email],
                subject : emailMsgParams.subject,
                sender : SMTP_EMAIL,
                'from : SMTP_EMAIL,
                body : emailMsgParams.message
            };          
        }

        email:Error? response = check self.smtpClient->sendMessage(sendingEmail);

        if(response is ()){ //email send is successful
            EmailCreated created = {
                body : {
                    "message": "Email Successfully sent"
                }
            };

            return created;
        }

        InternalServerError e = {
            body : {
                "message" : "An error occurred while sending the email",
                "error" : response.message()
            }
        };
        
        return e;
    }
}
