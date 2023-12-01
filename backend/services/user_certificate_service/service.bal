import ballerina/http;
import ballerina/persist;
import ballerina/time;
import ballerina/uuid;

# A service representing a network-accessible API
# bound to port `9090`.
# 
const time:Seconds CERTIFICATE_REQUEST_INTERVAL_SEC = 6 * 30 * 24 * 60 * 60; //6 months in seconds

type RequestCreated record {|
    *http:Created;
    json body;
|};

type CertificateNotFound record {|
    *http:NotFound;
    json body;
|};

type CertificateBadRequest record {|
    *http:BadRequest;
    json body;
|};

service /api/v1/user\-certificate\-service on new http:Listener(9000) {
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

    # A resource for adding a new user certificate request
    # + asgardeoExternalId - string - the user's asgardeo external id
    # + return - RequestCreated - the created request id. throws an error for internal server errors
    
    resource function post create\-user\-certificate\-request(string asgardeoExternalId) returns RequestCreated|error {
        //create a new user certificate request
        UserCertificate userCertificate = {
            id: uuid:createType4AsString(),
            asgardeo_external_id: asgardeoExternalId,
            issued_date: null,
            collected_date: null,
            status : PENDING
        };

        //add the user certificate request to the service db
        string[] ids = check self.serviceDBClient->/usercertificates.post([userCertificate]);

        RequestCreated response = {
            body : {
                message : "User certificate request created successfully",
                id : ids[0]
            }
        };

        return response;
    }

    # A resource for getting all user certificate requests
    # + return - UserCertificate[] - all user certificate requests. throws an error for internal server errors
    
    resource function get get\-all\-user\-certificate\-requests() returns UserCertificate[]|error {
        //get all user certificate requests
        stream<UserCertificate, persist:Error?> userCertificates = self.serviceDBClient->/usercertificates.get();

        UserCertificate[] arr = check from var userCertificate in userCertificates select userCertificate;

        return arr;
    }

    # A resource for getting a user certificate request by id
    # + id - string - the user certificate request id
    # + return - UserCertificate - the user certificate request. throws an error for internal server errors
    # + return - CertificateNotFound - the user certificate request not found error
    
    resource function get get\-user\-certificate\-requests/[string id]() returns CertificateNotFound|UserCertificate|error {
        //get the user certificate request by id
        stream<UserCertificate, persist:Error?> userCertificates = self.serviceDBClient->/usercertificates.get( 
            whereClause = `id = ${id}`);

        UserCertificate[] arr = check from var userCertificate in userCertificates select userCertificate;

        if (arr.length() == 0) {
            //no user certificate request found, throw an error
            CertificateNotFound response = {
                body : {
                    message : "User certificate request not found"
                }
            };

            return response;
            
        } else {
            //user certificate request found, return it
            return arr[0];
        }
    }

    # A resource for updating a user certificate request
    # + id - string - the user certificate request id
    # + updatingStatus - string - the user certificate request status
    # + return - UserCertificate - the updated user certificate request. throws an error for internal server errors
    # + return - CertificateNotFound - the user certificate request not found error 
    
    resource function put update\-user\-certificate\-requests/[string id](status updatingStatus) returns CertificateNotFound|UserCertificate|CertificateBadRequest|error {
        //get the user certificate request by id
        stream<UserCertificate, persist:Error?> userCertificates = self.serviceDBClient->/usercertificates.get( 
            whereClause = `id = ${id}`);

        UserCertificate[] arr = check from var userCertificate in userCertificates select userCertificate;

        if (arr.length() == 0) {
            //no user certificate request found, throw an error
            CertificateNotFound response = {
                body : {
                    message : "User certificate request not found"
                }
            };

            return response;
            
        } else {
            //user certificate request found, update it
            if updatingStatus == APPROVED {
                //update the user certificate request in the service db
                time:Utc currTime = time:utcNow();

                //split the date and time by T using regex
                string:RegExp regex = re `T`;

                string[] splitDate = regex.split(time:utcToString(currTime));

                //second split between -
                regex = re `-`;

                splitDate = regex.split(splitDate[0]);


                UserCertificate userCertificateResult = check self.serviceDBClient->/usercertificates/[id].put({
                    status: updatingStatus,
                    issued_date: {
                        year: check int:fromString(splitDate[0]),
                        month: check int:fromString(splitDate[1]),
                        day: check int:fromString(splitDate[2])
                    }
                });

                return userCertificateResult;
            }
            else if(updatingStatus == COLLECTED) {
                //check if the current status is approved
                if(arr[0].status != APPROVED) {
                    //the current status is not approved, throw an error
                    CertificateBadRequest response = {
                        body : {
                            message : "User certificate request status is not approved"
                        }
                    };

                    return response;   
                }

                //update the user certificate request in the service db
                time:Utc currTime = time:utcNow();

                //split the date and time by T using regex
                string:RegExp regex = re `T`;

                string[] splitDate = regex.split(time:utcToString(currTime));

                //second split between -
                regex = re `-`;

                splitDate = regex.split(splitDate[0]);

                UserCertificate userCertificateResult = check self.serviceDBClient->/usercertificates/[id].put({
                    status: updatingStatus,
                    collected_date: {
                        year: check int:fromString(splitDate[0]),
                        month: check int:fromString(splitDate[1]),
                        day: check int:fromString(splitDate[2])
                    }
                });

                return userCertificateResult;
            }
            else {
                //update the user certificate request in the service db
                UserCertificate userCertificateResult = check self.serviceDBClient->/usercertificates/[id].put({
                    status: updatingStatus
                });

                return userCertificateResult;
            }
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