import ballerina/http;

public type NotFoundResponse record {|
    *http:NotFound;

    record {
        boolean validity = false;
        string message;
    } body;
|};