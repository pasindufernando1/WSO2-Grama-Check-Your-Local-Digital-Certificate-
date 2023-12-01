import ballerina/http;
import ballerina/io;

configurable string ADDRESS_API_URL = ?;

public isolated class AddressClient {

    private http:Client address_api_client = check new (ADDRESS_API_URL);

    public function init() returns error? {
    }

    public isolated function verify_address(string req_nic, string req_line_01, string req_line_02, string req_city, string req_line_03 = "") returns error|boolean {
        lock {
            json|error response = self.address_api_client->/addresscheck(nic = req_nic, line_01 = req_line_01, line_02 = req_line_02, line_03 = req_line_03, city = req_city);

            if (response is error) {
                io:print("Error: " + response.message());
                return error("Address module error");
            } else {
                json|error response_json = response.body;
                if (response_json is error) {
                    io:println("Error: " + response_json.message());
                    return error("Address Api Service Resppnse error");
                }

                json|error valid = response_json.validity;

                if (valid is error) {
                    io:println("Error: " + valid.message());
                    return error("Address Api Service Resppnse error");
                } else {
                    return <boolean>valid;
                }

            }

        }

    }

}
