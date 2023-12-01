import ballerina/persist as _;
import ballerina/time;

type UserCertificate record {|
    readonly string id;
    string user_id;
    time:Date? issued_date; //can be null
    time:Date? collected_date;   //can be null
    status status;
    string nic;
    string line_01;
    string line_02;
    string? line_03;
    string city;
	GramaDivision grama_division; //issued by one division
|};

type GramaDivision record {|
    readonly string id;
    string name;
    UserCertificate[] user_certificates; //there are many certificates for one grama division
|};

enum status {
    PENDING,
    APPROVED,
    REJECTED,
    COLLECTED
};


