import ballerina/http;
import ballerina/io;

configurable string POLICE_CHECK_API_URL = ?;

# Description.
# This is the client for the police check API.
public isolated class PoliceCheckClient {
    private http:Client police_check_client = check new (POLICE_CHECK_API_URL);

    public function init() returns error? {
        return ();
    }

    public isolated function get_police_records_by_NIC(string nic) returns json|error|http:BadRequest {

        lock {
            http:Response|error response = self.police_check_client->/'check/[nic];
            if (response is error) {
                io:println("Error: " + response.message());
                return error("Error: error in calling police check API");
            } else {
                if (response.statusCode == 200) {
                    json|error response_body = response.getJsonPayload();
                    if (response_body is error) {
                        io:println("Error: " + response_body.message());
                        return error("Error: error in response body police check API");
                    } else {
                        return response_body.clone();
                    }
                } else {
                    io:println(response.statusCode);
                    io:println(response.getJsonPayload());
                    return <http:BadRequest>{
                    };
                }
            }
        }

    }
}
