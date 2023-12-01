import ballerina/http;
import ballerina/io;

configurable string IDENTITY_API_URL = ?;

public isolated class IdentityClient {

    private http:Client identity_api_client = check new (IDENTITY_API_URL);

    public isolated function init() returns error? {
    }

    public isolated function validate_nic(string nic) returns error|boolean {

        lock {
            json|error response = self.identity_api_client->get("/identity/check/" + nic);

            if (response is error) {
                io:println("Error: " + response.message());
                return error("Identity module Error");
            } else {
                json response_payload = response;
                json|error validity = response_payload.validity;
                if (validity is error) {
                    io:println("Error: " + validity.message());
                    return error("Identity Api Service Response Error");
                } else {
                    return <boolean>validity;
                }
            }
        }
    }

};
