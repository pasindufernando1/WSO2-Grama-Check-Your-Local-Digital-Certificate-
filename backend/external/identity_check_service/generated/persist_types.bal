// AUTO-GENERATED FILE. DO NOT MODIFY.
// This file is an auto-generated file by Ballerina persistence layer for model.
// It should not be modified by hand.
import ballerina/time;

public type IdentityDetails record {|
    readonly string nic;
    string fullname;
    time:Date dob;
    string gender;
|};

public type IdentityDetailsOptionalized record {|
    string nic?;
    string fullname?;
    time:Date dob?;
    string gender?;
|};

public type IdentityDetailsTargetType typedesc<IdentityDetailsOptionalized>;

public type IdentityDetailsInsert IdentityDetails;

public type IdentityDetailsUpdate record {|
    string fullname?;
    time:Date dob?;
    string gender?;
|};

