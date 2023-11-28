import identity_check_service.DTO;
import identity_check_service.http.responses;

import ballerina/http;
import ballerina/io;
import ballerina/persist;

service /api/v1 on new http:Listener(8000) {

    private final Client db;

    public function init() {
        Client|persist:Error db_connection = new ();

        if (db_connection is Client) {
            self.db = db_connection;
            io:println("Database connection successful");
            io:println("Identity Check Service started on port 8000 ...");
        } else {
            io:println(db_connection.message());
            panic error("Database connection failed");
        }
    }

    resource function get identity/'check/[string nic]() returns responses:NotFoundResponse|json {
        IdentityDetails|persist:Error person = self.db->/identitydetails/[nic];

        if (person is IdentityDetails) {
            return {
                validity: true,
                message: "NIC number is valid"
            };
        } else {
            return <responses:NotFoundResponse>{
                body: {
                    validity: false,
                    message: "Invalid NIC number"
                }
            };
        }
    }

    resource function post identity/add(DTO:IdetityDetailsCreationDTO identitydetails) returns responses:BadRequestResponse|responses:CreatedResponse {

        IdentityDetails new_record = {
            nic: identitydetails.nic,
            fullname: identitydetails.fullname,
            dob: identitydetails.dob,
            gender: identitydetails.gender.toString()
        };

        string[]|persist:Error result = self.db->/identitydetails.post([new_record]);

        if (result is string[]) {
            return <responses:CreatedResponse>{
                body: {
                    message: "New record added successfully"
                }
            };
        } else {
            if (result is persist:AlreadyExistsError) {
                return <responses:BadRequestResponse>{
                    body: {
                        message: "Given NIC number is already available"
                    }
                };
            }
            io:println(result);
            return <responses:BadRequestResponse>{
                body: {
                    message: "Failed to add new record. Check details and try again"
                }
            };
        }

    }
}
