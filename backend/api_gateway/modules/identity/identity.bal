import ballerina/http;
import ballerina/io;

configurable string IDENTITY_API_URL = ?;

# Description.
# This is the client for the identity API.
public isolated class IdentityClient {

    private http:Client identity_api_client = check new (IDENTITY_API_URL);

    public isolated function init() returns error? {
    }

    public isolated function validate_nic(string nic) returns error|boolean|int {

        lock {
            http:Response|error response = self.identity_api_client->get("/identity/check/" + nic);

            if (response is error) {
                io:println("Error: " + response.message());
                return error("Identity module Error");
            } else {
                if (response.statusCode != 200) {
                    io:println(response.statusCode.toString());
                    io:println(response.getJsonPayload());
                    return response.statusCode;
                } else {
                    json|error response_payload = response.getJsonPayload();
                    if (response_payload is error) {
                        io:println("Error: " + response_payload.message());
                        return error("Identity Api Service Response Error");
                    }
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
    }

};
