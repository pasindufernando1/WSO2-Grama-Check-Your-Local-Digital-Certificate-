// AUTO-GENERATED FILE. DO NOT MODIFY.

// This file is an auto-generated file by Ballerina persistence layer for model.
// It should not be modified by hand.

public type AddressDetails record {|
    readonly string nic;
    string line_01;
    string line_02;
    string line_03;
    string city;
|};

public type AddressDetailsOptionalized record {|
    string nic?;
    string line_01?;
    string line_02?;
    string line_03?;
    string city?;
|};

public type AddressDetailsTargetType typedesc<AddressDetailsOptionalized>;

public type AddressDetailsInsert AddressDetails;

public type AddressDetailsUpdate record {|
    string line_01?;
    string line_02?;
    string line_03?;
    string city?;
|};

