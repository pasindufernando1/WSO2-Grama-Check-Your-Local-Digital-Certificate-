import ballerina/http;
import ballerina/persist;
import ballerina/time;

# A service representing a network-accessible API
# bound to port `9090`.
# 
const time:Seconds CERTIFICATE_REQUEST_INTERVAL_SEC = 6 * 30 * 24 * 60 * 60; //6 months in seconds

service /api/v1/user\-certificate\-service on new http:Listener(9090) {
    private final Client serviceDBClient;

    public function init() returns error? {
        //create a client to the service db
        self.serviceDBClient = check new ();
    }

    # A resource for checking if the user can request a certificate (has passed 6 months since last request)
    # + asgardeoExternalId - string - the user's asgardeo external id
    # + return - boolean - true if the user can request a certificate, false otherwise. throws an error for internal server errors
    resource function get can\-request\-newcertificate(string asgardeoExternalId) returns boolean|error {
        //get the user's last certificate request date
        stream<UserCertificate, persist:Error?> userCertificates = self.serviceDBClient->/usercertificates.get( 
            whereClause = `asgardeo_external_id = ${asgardeoExternalId}`);

        UserCertificate[] arr = check from var userCertificate in userCertificates where userCertificate.issued_date != null && CERTIFICATE_REQUEST_INTERVAL_SEC > time:utcDiffSeconds(time:utcNow(), check time:utcFromString(convertDateToUTCString(userCertificate.issued_date))) select userCertificate;

        if (arr.length() == 0) {
            //no certificate requests found, the user can request a certificate
            return true;
        } else {
            //multiple certificate requests found, throw an error
            return false;
        }
    }
}


function convertDateToUTCString(time:Date? date) returns string {
    if date == null {
        return "";
    }

    string year = date.year.toString();
    string month;

    if date.month < 10 {
        month = "0" + date.month.toString();
    } else {
        month = date.month.toString();
    }

    string day;

    if date.day < 10 {
        day = "0" + date.day.toString();
    } else {
        day = date.day.toString();
    }

    string hour;
    if date.hour is () {
        hour = "00";
    } else {
        if(date.hour < 10) {
            hour = "0" + date.hour.toString();
        } else {
            hour = date.hour.toString();
        }
    }

    string minute;
    if date.minute is () {
        minute = "00";
    } else {
        if(date.minute < 10) {
            minute = "0" + date.minute.toString();
        } else {
            minute = date.minute.toString();
        }
    }

    string second;
    if date.second is () {
        second = "00.00";
    } else {
        if(date.second < 10d) {
            second = "0" + date.second.toString();
        } else {
            second = date.second.toString();
        }
    }

    return year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second + "Z";
}