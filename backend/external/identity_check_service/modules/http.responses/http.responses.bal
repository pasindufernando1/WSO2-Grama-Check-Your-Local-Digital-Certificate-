import ballerina/http;

# Description.
# returns if record with given NIC is not found
# + body - body is in the format {validity: boolean, message: string}
public type NotFoundResponse record {|
    *http:NotFound;

    record {
        boolean validity = false;
        string message;
    } body;
|};

# Description.
# returns for requests with invalid payload
# + body - error in json format. Do not enforce a rigid structure.
public type BadRequestResponse record {|
    *http:BadRequest;

    json body;
|};

# Description.
# returns for successful post requests
# + body - success message. Do not enforce a rigid structure.
public type CreatedResponse record {|
    *http:Created;

    json body;
|};