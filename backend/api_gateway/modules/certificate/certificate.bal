import ballerina/http;
import ballerina/io;

configurable string CERTIFICATE_API_URL = ?;

public class CertificateClient {
    private http:Client certificate_api_client = check new (CERTIFICATE_API_URL);

    public isolated function init() returns error? {
    }

    public isolated function can_user_apply(string user_id) returns boolean|error {

        lock {
            json response = check self.certificate_api_client->/can\-request\-newcertificate(userId = user_id);

            return true == response;
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
                grama_divisionId: req_gram_division_id
            });
            if (response is error) {
                return error("Error: error occured at create_user_certificate_request function");
            } else {
                if (response.statusCode == 201) {
                    return true;
                } else {
                    return false;
                }
            }

        }
    }

    public isolated function update_status(string req_id, string new_status) returns int|error {

        http:Response|error response = self.certificate_api_client->/update\-user\-certificate\-requests/[req_id].put({
            },
            updatingStatus = new_status
        );

        if (response is error) {
            io:println(response.message());
            return error("Error: error occured at update_status function");
        } else {
            return response.statusCode;
        }
    }

    public isolated function get_certificate_details(string certtificate_id) returns error|json|http:BadRequest {

        http:Response|error response = self.certificate_api_client->/get\-user\-certificate\-requests/[certtificate_id].get();

        if (response is error) {
            io:println(response.message());
            return error("Error: error occured at get_certificate_details function");
        } else {
            if (response.statusCode == 200) {
                return response.getJsonPayload();
            } else {
                return <http:BadRequest>{
                };
            }
        }
    }

    public isolated function get_grama_division_details(string? division_name) returns error|json|http:BadRequest {

        http:Response|error response = new ();
        if (division_name is string) {
            response = self.certificate_api_client->/get\-grama\-divisions.get({
                divisionName: division_name
            });
        } else {
            response = self.certificate_api_client->/get\-grama\-divisions.get();
        }

        if (response is error) {
            io:println(response.message());
            return error("Error: error occured at get_grama_division_details function");
        } else {
            if (response.statusCode == 200) {
                return response.getJsonPayload();
            } else {
                return <http:BadRequest>{
                };
            }
        }
    }
};
