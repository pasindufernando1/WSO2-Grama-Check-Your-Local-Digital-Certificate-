import ballerina/http;
import ballerina/io;

configurable string EMAIL_SERVICE_API_URL = ?;
configurable string SMS_SERVICE_API_URL = ?;

public const string certificate_request_email_subject = "New certificate request";
public const string certificate_request_email_body = "A new certificate request has been received. Please check the certificate request page for more details and approve/reject the request.";

# Description.
# This is the NotificationClient object which is used to send emails and sms messages.
public isolated class NotificationClient {

    private http:Client email_client = check new (EMAIL_SERVICE_API_URL);
    private http:Client sms_client = check new (SMS_SERVICE_API_URL);

    public function init() returns error? {
        return ();
    }

    public isolated function send_email_without_html_body(string to, string email_subject, string email_body) returns error? {

        lock {
            http:Response|error response = self.email_client->/sendemail.post({
                email: to,
                subject: email_subject,
                message: email_body,
                isHTMLMsg: false
            });

            if (response is http:Response) {
                if (response.statusCode == 201) {
                    return ();
                } else {
                    io:println(response.statusCode);
                    io:println(response.getJsonPayload());
                    return error("Error occurred while sending email");
                }
            } else {
                return response;
            }
        }

    }

    public isolated function send_email_with_html_body(string to, string email_subject, string email_body) returns error? {

        lock {
            http:Response|error response = self.email_client->/sendemail.post({
                email: to,
                subject: email_subject,
                message: email_body,
                isHTMLMsg: true
            });

            if (response is http:Response) {
                if (response.statusCode == 201) {
                    return ();
                } else {
                    io:println(response.statusCode);
                    io:println(response.getJsonPayload());
                    return error("Error occurred while sending email");
                }
            } else {
                return response;
            }
        }

    }

    public isolated function notify_certificate_request_status(boolean is_approved) returns error? {

        lock {
            http:Response|error response;

            if (is_approved) {
                response = self.sms_client->/send_approved_message.get();
            } else {
                response = self.sms_client->/send_rejected_message.get();
            }

            if (response is http:Response) {
                if (response.statusCode == 201 || response.statusCode == 200) {
                    return ();
                } else {
                    io:println(response.statusCode);
                    io:println(response.getJsonPayload());
                    return error("Error: sms service api call failed");
                }
            } else {
                return response;
            }
        }

    }

}
