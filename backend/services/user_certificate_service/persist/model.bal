import ballerina/persist as _;
import ballerina/time;

type UserCertificate record {|
    readonly int id;
    string asgardeo_external_id;
    time:Date? issued_date; //can be null
    time:Date? collected_date;   //can be null
    status status;
|};

enum status {
    PENDING,
    APPROVED,
    REJECTED,
    COLLECTED
};


