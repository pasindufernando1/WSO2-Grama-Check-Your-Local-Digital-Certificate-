// AUTO-GENERATED FILE. DO NOT MODIFY.
// This file is an auto-generated file by Ballerina persistence layer for model.
// It should not be modified by hand.
import ballerina/time;

public type PoliceDetails record {|
    readonly string id;
    string nic;
    string 'record;
    time:Date date;
|};

public type PoliceDetailsOptionalized record {|
    string id?;
    string nic?;
    string 'record?;
    time:Date date?;
|};

public type PoliceDetailsTargetType typedesc<PoliceDetailsOptionalized>;

public type PoliceDetailsInsert PoliceDetails;

public type PoliceDetailsUpdate record {|
    string nic?;
    string 'record?;
    time:Date date?;
|};

