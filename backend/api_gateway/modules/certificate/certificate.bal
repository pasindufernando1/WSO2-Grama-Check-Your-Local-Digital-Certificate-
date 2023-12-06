import ballerina/http;
import ballerina/io;

configurable string CERTIFICATE_API_URL = ?;

# Description.
# Client used to communicate with the certificate API.
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

    public isolated function apply_certificate_request(string req_user_id, string req_nic, string req_line_01, string req_line_02, string req_line_03, string req_city, string req_gram_division_id) returns error|string|boolean {

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
                    json|error response_json = response.getJsonPayload();
                    if (response_json is json) {
                        json|error email = response_json.gramaDivisionEmail;
                        if (email is json) {
                            return <string>email;
                        } else {
                            io:println("Error: " + email.message());
                            return true;
                        }
                    } else {
                        io:println("Error: " + response_json.message());
                        return true;
                    }
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

    public isolated function get_certificate_details(string certtificate_id) returns error|json|http:Response {

        http:Response|error response = self.certificate_api_client->/get\-user\-certificate\-requests/[certtificate_id].get();

        if (response is error) {
            io:println(response.message());
            return error("Error: error occured at get_certificate_details function");
        } else {
            if (response.statusCode == 200) {
                return response.getJsonPayload();
            } else {
                io:println(response.statusCode);
                io:println(response.getJsonPayload());
                return response;
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
                io:println(response.statusCode);
                io:println(response.getJsonPayload());
                return <http:BadRequest>{
                };
            }
        }
    }

    public isolated function get_certificate_details_by_user_id(string user_id) returns error|json|http:Response {

        http:Response|error response = self.certificate_api_client->/get\-all\-user\-certificate\-requests.get(userId = user_id);

        if (response is error) {
            io:println(response.message());
            return error("Error: error occured at get_certificate_details_by_user_id function");
        } else {
            if (response.statusCode == 200) {
                return response.getJsonPayload();
            } else {
                io:println(response.statusCode);
                io:println(response.getJsonPayload());
                return response;
            }
        }
    }

    public isolated function get_certificate_details_by_grama_division(string? grama_division_id, string? grama_division_name) returns json|error|http:Response {

        http:Response|error response = self.certificate_api_client->/get\-all\-user\-certificate\-requests.get(
            gramaDivisionId = grama_division_id.toString(),
            gramaDivisionName = grama_division_name.toString()
        );

        if (response is error) {
            io:println(response.message());
            return error("Error: error occured at get_certificate_details_by_grama_division function");
        } else {
            if (response.statusCode == 200) {
                return response.getJsonPayload();
            } else {
                io:println(response.statusCode);
                io:println(response.getJsonPayload());
                return response;
            }
        }
    }

    public isolated function get_last_certificate_request(string user_id) returns json|http:Response|error? {

        lock {
            http:Response|error response = self.certificate_api_client->/get\-user\-certificate\-request\-current/[user_id];

            if (response is error) {
                io:println("Error: " + response.message());
                return error("Error: error occured at get_last_certificate_request function");
            } else {
                if (response.statusCode == 200) {
                    return response.getJsonPayload();
                } else {
                    io:println(response.statusCode);
                    io:println(response.getJsonPayload());
                    return response;
                }
            }
        }

    }
};
