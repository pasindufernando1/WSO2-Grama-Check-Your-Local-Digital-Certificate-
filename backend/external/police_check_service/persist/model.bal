import ballerina/persist as _;
import ballerina/time;

public type PoliceDetails record {|
    readonly string id;
    string nic;
    string 'record;
    time:Date date;
|};


