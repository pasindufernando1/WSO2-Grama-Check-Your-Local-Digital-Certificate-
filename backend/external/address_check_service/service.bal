import ballerina/http;
import ballerina/io;
import ballerina/persist;


service /api/v1 on new http:Listener(8080) {

    private final Client db;

    public function init() {
        Client | persist:Error db_connection = new();

        if (db_connection is Client) {
            self.db = db_connection;
            io:println("Database connection successful");
            io:println("Address Check Service started on port 8080 ...");
        } else {
            io:println(db_connection.message());
            panic error("Database connection failed");
        }
    }

     resource function get address/'check (string nic,string line_01, string line_02, string line_03, string city) returns json {
        AddressDetails | persist:Error address = self.db->/addressdetails/[nic];
        

        if ( address is AddressDetails) {
            io:println("Query parameters: " + nic + " " + line_01 + " " + line_02 + " " + line_03 + " " + city);
            io:println("Retreived results: " + address.nic + " " + address.line_01 + " " + address.line_02 + " " + address.line_03 + " " + address.city);
            if(address.line_01 == line_01 && address.line_02 == line_02 && address.line_03 == line_03 && address.city == city){
                return {
                    body:{
                        validity: true,
                        message: "Matching address found for the NIC",
                        addressDB: {
                            line_01: address.line_01,
                            line_02: address.line_02,
                            line_03: address.line_03,
                            city: address.city
                        }
                    }
                };
            } else {
                return {
                    body:{
                        validity: false,
                        message: "Matching address not found for the NIC",
                        addressDB: {
                            line_01: address.line_01,
                            line_02: address.line_02,
                            line_03: address.line_03,
                            city: address.city
                        },
                        addressInput: {
                            line_01: line_01,
                            line_02: line_02,
                            line_03: line_03,
                            city: city
                        }
                    }
                };
            }
            
        } else {
            return {
                body:{
                    validity: false,
                    message: "Address not found for the NIC"
                }
            };
        }
    }
}
