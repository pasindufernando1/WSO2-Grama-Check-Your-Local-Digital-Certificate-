import api_gateway.DTO;
import api_gateway.address;
import api_gateway.certificate;
import api_gateway.identity;
import api_gateway.policecheck;

import ballerina/http;
import ballerina/io;

isolated service /api/v1 on new http:Listener(9090) {

    private identity:IdentityClient identity_client = check new ();
    private address:AddressClient address_client = check new ();
    private certificate:CertificateClient certificate_client = check new ();
    private policecheck:PoliceCheckClient police_check_client = check new ();

    public function init() returns error? {

    }

    # A resource to request a certificate
    # + certificate_request - request contains the address and nic
    # + return - http:Created,http:BadRequest or http:InternalServerError
    isolated resource function post certificate/request(DTO:CertificateRequestCreationDTO
    certificate_request) returns http:Created|http:BadRequest|http:InternalServerError {

        certificate_request.address.line_03 = certificate_request.address.line_03 is string ? certificate_request.address.line_03 : "";

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

            boolean|error address_check_result = self.address_client.verify_address(certificate_request.nic, certificate_request.address.line_01, certificate_request.address.line_02, certificate_request.address.city, certificate_request.address.line_03.toString());

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
            }

            boolean|error certificate_check_result = self.certificate_client.can_user_apply(certificate_request.user_id);

            if (certificate_check_result is error) {
                io:println("Error: " + certificate_check_result.toString());
                return <http:InternalServerError>{
                    body: {
                        "message": "Error occurred while checking the certificate validity."
                    }
                };
            }

            if (!certificate_check_result) {
                return <http:BadRequest>{
                    body: {
                        "message": "Cannot apply requests for the same nic within its validity period."
                    }
                };
            }

            boolean|error response = self.certificate_client.apply_certificate_request(certificate_request.user_id, certificate_request.nic, certificate_request.address.line_01, certificate_request.address.line_02, certificate_request.address.city, certificate_request.address.line_03.toString(),
                certificate_request.grama_division_id);

            if (response is error) {
                io:println("Error: " + response.toString());
                return <http:InternalServerError>{
                    body: {
                        "message": "Error occurred while applying the certificate request."
                    }
                };
            } else {
                if (response) {
                    // TODO: send notification to the gramaniladhari
                    return <http:Created>{
                        body: {
                            "message": "Certificate request created successfully."
                        }
                    };
                } else {
                    return <http:BadRequest>{
                        body: {
                            "message": "Request creation failed please check entered details again."
                        }
                    };
                }

            }
        }

    }

    # A resource to update the certificate status
    #
    # + id - id of the certificate
    # + new_status - new status of the certificate, should be one of the following
    # - APPROVED
    # - REJECTED
    # - COLLECTED
    # + return - http:Accepted,http:BadRequest or http:InternalServerError
    resource function patch certificate/[string id]/status/update(DTO:CertificateStatus new_status) returns http:InternalServerError|http:BadRequest|http:Accepted {

        lock {
            int|error update_result = self.certificate_client.update_status(id, new_status);

            if (update_result is error) {
                io:println("Error: " + update_result.toString());
                return <http:InternalServerError>{
                    body: {
                        "message": "Error occurred while updating the certificate status."
                    }
                };
            } else {
                if (update_result == 404 || update_result == 400) {
                    return <http:BadRequest>{
                        body: {
                            "message": "Update failed please check entered details again."
                        }
                    };
                } else {
                    // TODO: send notification to the user
                    return <http:Accepted>{
                        body: {
                            "message": "Certificate status updated successfully."
                        }
                    };
                }
            }
        }
    }

    # A resource to get the certificate details
    #
    # + id - id of the certificate
    # + return - http:Ok,http:BadRequest or http:InternalServerError
    resource function get certificate/[string id]/status() returns http:Ok|http:BadRequest|http:InternalServerError {

        lock {
            json|http:BadRequest|error certificate = self.certificate_client.get_certificate_details(id);

            if (certificate is error) {
                return <http:InternalServerError>{
                    body: {
                        "message": "Error occurred while getting the certificate details."
                    }
                };
            }
            if (certificate is json) {
                json|error certificate_status = certificate.status;
                if (certificate_status is error) {
                    io:println("Error: Response doesn't contain status");
                    return <http:InternalServerError>{
                        body: {
                            "message": "Error occurred while getting the certificate status."
                        }
                    };
                }
                return <http:Ok>{
                    body: {
                        "id": id,
                        "status": certificate_status.toString()
                    }
                };
            }
            return <http:BadRequest>{
                body: {
                    "message": "Certificate for the given id is not found."
                }
            };

        }
    }

    # A resource to get the grama division details
    #
    # + return - http:Ok,http:BadRequest or http:InternalServerError
    resource function get gramadivisions() returns http:Ok|http:BadRequest|http:InternalServerError {

        lock {
            json|error|http:BadRequest grama_divisions = self.certificate_client.get_grama_division_details(());

            if (grama_divisions is error) {
                return <http:InternalServerError>{
                    body: {
                        "message": "Error occurred while getting the grama division details."
                    }
                };
            }
            if (grama_divisions is json) {
                return <http:Ok>{
                    body: grama_divisions.clone()
                };
            }
            return <http:BadRequest>{
                body: {
                    "message": "Grama division for the given name is not found."
                }
            };
        }
    }

    # A resource to get the certificate details by user id, grama division id or grama division name
    #
    # + user_id - id of the user
    # + grama_division_id - id of the grama division
    # + grama_division_name - name of the grama division
    # + return - http:Ok,http:BadRequest or http:InternalServerError
    resource function get certificates(string? user_id, string? grama_division_id, string? grama_division_name) returns http:Ok|http:BadRequest|http:InternalServerError {

        lock {

            json|error|http:BadRequest response = <json>{};

            if (user_id is string) {
                response = self.certificate_client.get_certificate_details_by_user_id(user_id);
            }
            else if (grama_division_id is string || grama_division_name is string) {
                response = self.certificate_client.get_certificate_details_by_grama_division(grama_division_id, grama_division_name);
            } else {
                return <http:BadRequest>{
                    body: {
                        "message": "Invalid request. Please provide either user id or grama division details"
                    }
                };
            }

            if (response is error) {
                return <http:InternalServerError>{
                    body: {
                        "message": "Error occurred while getting the certificate details."
                    }
                };
            }
            if (response is json) {
                return <http:Ok>{
                    body: response.clone()
                };
            }
            return <http:BadRequest>{
                body: {
                    "message": "Certificate for the given id is not found."
                }
            };
        }

    }

    # A resource to get the certificate details by user id, grama division id or grama division name
    #
    # + certificate_id - id of the certificate
    # + return - http:Ok,http:BadRequest or http:InternalServerError
    resource function get certificate/[string certificate_id]() returns http:Ok|http:BadRequest|http:InternalServerError {

        lock {

            json|error|http:BadRequest response = self.certificate_client.get_certificate_details(certificate_id);

            if (response is error) {
                return <http:InternalServerError>{
                    body: {
                        "message": "Error occurred while getting the certificate details."
                    }
                };
            }
            if (response is json) {
                json|error nic = response.nic;
                if (nic is error) {
                    io:println("Error: Response doesn't contain nic");
                    return <http:InternalServerError>{
                        body: {
                            "message": "Error occurred while getting the nic."
                        }
                    };
                } else {
                    json|error|http:BadRequest police_check_response = self.police_check_client.get_police_records_by_NIC(nic.toString());
                    if (police_check_response is error) {
                        return <http:InternalServerError>{
                            body: {
                                "message": "Error occurred while getting the police check details."
                            }
                        };
                    }
                    if (police_check_response is json) {
                        return <http:Ok>{
                            body: {
                                "id": certificate_id,
                                "certificate_details": response.clone(),
                                "police_check_details": police_check_response.clone()
                            }
                        };
                    }
                }
            }
            return <http:BadRequest>{
                body: {
                    "message": "Invalid request."
                }
            };
        }

    }
}
