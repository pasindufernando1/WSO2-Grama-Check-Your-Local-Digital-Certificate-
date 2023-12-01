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
    string user_id;
    time:Date? issued_date;
    time:Date? collected_date;
    status status;
    string nic;
    string line_01;
    string line_02;
    string? line_03;
    string city;
    string grama_divisionId;
|};

public type UserCertificateOptionalized record {|
    string id?;
    string user_id?;
    time:Date? issued_date?;
    time:Date? collected_date?;
    status status?;
    string nic?;
    string line_01?;
    string line_02?;
    string? line_03?;
    string city?;
    string grama_divisionId?;
|};

public type UserCertificateWithRelations record {|
    *UserCertificateOptionalized;
    GramaDivisionOptionalized grama_division?;
|};

public type UserCertificateTargetType typedesc<UserCertificateWithRelations>;

public type UserCertificateInsert UserCertificate;

public type UserCertificateUpdate record {|
    string user_id?;
    time:Date? issued_date?;
    time:Date? collected_date?;
    status status?;
    string nic?;
    string line_01?;
    string line_02?;
    string? line_03?;
    string city?;
    string grama_divisionId?;
|};

public type GramaDivision record {|
    readonly string id;
    string name;
|};

public type GramaDivisionOptionalized record {|
    string id?;
    string name?;
|};

public type GramaDivisionWithRelations record {|
    *GramaDivisionOptionalized;
    UserCertificateOptionalized[] user_certificates?;
|};

public type GramaDivisionTargetType typedesc<GramaDivisionWithRelations>;

public type GramaDivisionInsert GramaDivision;

public type GramaDivisionUpdate record {|
    string name?;
|};

