import ballerina/persist as _;

type AddressDetails record {|
    readonly string nic;
    string line_01;
    string line_02;
    string line_03;
    string city;
|};