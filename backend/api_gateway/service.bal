import api_gateway.DTO;
import api_gateway.address;
import api_gateway.identity;

import ballerina/http;
import ballerina/io;

isolated service /api/v1 on new http:Listener(9090) {

    private identity:IdentityClient identity_client = check new ();
    private address:AddressClient address_client = check new ();

    public function init() returns error? {

    }

    # A resource to request a certificate
    # + certificate_request - request contains the address and nic
    # + return - http:Created,http:BadRequest or http:InternalServerError
    isolated resource function post certificate/request(DTO:CertificateRequestCreationDTO
    certificate_request) returns http:Created|http:BadRequest|http:InternalServerError {

        lock {
            boolean|error identity_check_result = self.identity_client.validate_nic(certificate_request.nic);

            if (identity_check_result is error) {
                io:println("Error: " + identity_check_result.toString());
                return <http:InternalServerError>{
                    body: {
                        "message": "Error occurred while validating the nic."
                    }
                };
            }

            boolean|error address_check_result = self.address_client.verify_address(certificate_request.nic, certificate_request.address.line_01, certificate_request.address.line_02, certificate_request.address.city, certificate_request.address.line_03 is string ? certificate_request.address.line_03.toString() : "");

            if (address_check_result is error) {
                io:println("Error: " + address_check_result.toString());
                return <http:InternalServerError>{
                    body: {
                        "message": "Error occurred while verifying the address."
                    }
                };
            }

            if (!identity_check_result || !address_check_result) {
                return <http:BadRequest>{
                    body: {
                        "message": "Invalid nic or address."
                    }
                };
            } else {
                return <http:Created>{
                    body: {
                        "message": "Certificate request created successfully."
                    }
                };
            }
        }

    }
}
