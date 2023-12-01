import ballerina/http;
import ballerina/io;

configurable string CERTIFICATE_API_URL = ?;

public class CertificateClient {
    private http:Client certificate_api_client = check new (CERTIFICATE_API_URL);

    public isolated function init() returns error? {
    }

    public isolated function can_user_apply(string user_id) returns boolean|error {

        lock {
            return <boolean>check self.certificate_api_client->/can\-request\-newcertificate(userId = user_id);
        }
    }

    public isolated function apply_certificate_request(string req_user_id, string req_nic, string req_line_01, string req_line_02, string req_line_03, string req_city, string req_gram_division_id) returns error|boolean {

        lock {
            http:Response|error response = self.certificate_api_client->/create\-user\-certificate\-request.post({
                user_id: req_user_id,
                nic: req_nic,
                line_01: req_line_01,
                line_02: req_line_02,
                line_03: req_line_03,
                city: req_city,
                gram_divisionId: req_gram_division_id
            });

            if (response is error) {
                io:println("Error: " + response.message());
                return error("Error: error occured at create_user_certificate_request function");
            } else {
                if (response.statusCode == 200) {
                    return true;
                } else {
                    return false;
                }
            }

        }
    }
};
