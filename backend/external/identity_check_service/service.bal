import ballerina/http;
import ballerina/io;
import ballerina/persist;

import identity_check_service.http.responses;

service /api/v1 on new http:Listener(8000) {

    private final Client db;

    public function init() {
        Client | persist:Error db_connection = new();

        if (db_connection is Client) {
            self.db = db_connection;
            io:println("Database connection successful");
            io:println("Identity Check Service started on port 8000 ...");
        } else {
            io:println(db_connection.message());
            panic error("Database connection failed");
        }
    }

    resource function get identity/'check/[string nic]() returns responses:NotFoundResponse | json {
        IdentityDetails | persist:Error person = self.db->/identitydetails/[nic];

        if ( person is IdentityDetails) {
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
}
