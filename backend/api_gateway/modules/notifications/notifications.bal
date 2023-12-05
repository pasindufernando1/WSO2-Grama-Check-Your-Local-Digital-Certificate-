import ballerina/http;
import ballerina/io;

configurable string EMAIL_SERVICE_API_URL = ?;

public const string certificate_request_email_subject = "New certificate request";
public const string certificate_request_email_body = "A new certificate request has been received. Please check the certificate request page for more details and approve/reject the request.";

public isolated class NotificationClient {

    private http:Client email_client = check new (EMAIL_SERVICE_API_URL);

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
}
