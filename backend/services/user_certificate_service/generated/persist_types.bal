// AUTO-GENERATED FILE. DO NOT MODIFY.
// This file is an auto-generated file by Ballerina persistence layer for model.
// It should not be modified by hand.
import ballerina/time;

public enum status {
    PENDING,
    APPROVED,
    REJECTED,
    COLLECTED
}

public type UserCertificate record {|
    readonly string id;
    string asgardeo_external_id;
    time:Date? issued_date;
    time:Date? collected_date;
    status status;
|};

public type UserCertificateOptionalized record {|
    string id?;
    string asgardeo_external_id?;
    time:Date? issued_date?;
    time:Date? collected_date?;
    status status?;
|};

public type UserCertificateTargetType typedesc<UserCertificateOptionalized>;

public type UserCertificateInsert UserCertificate;

public type UserCertificateUpdate record {|
    string asgardeo_external_id?;
    time:Date? issued_date?;
    time:Date? collected_date?;
    status status?;
|};

