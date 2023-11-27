import ballerina/persist as _;
import ballerina/time;

type IdentityDetails  record {|
    readonly string nic;
    string fullname;
    time:Date dob;
    string gender;
|};


