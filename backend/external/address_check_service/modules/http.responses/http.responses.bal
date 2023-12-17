import ballerina/http;

public type AddressResponse record {|
    *http:NotFound;

    json body;
|};