import ballerina/http;
import ballerina/persist;
import ballerina/time;
import ballerina/uuid;

# A service representing a network-accessible API
# bound to port `9000`.
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

type UserCertificateInsertDTO record {|
    string user_id;
    string nic;
    string line_01;
    string line_02;
    string line_03;
    string city;
    string grama_divisionId;
|};

service /api/v1/user\-certificate\-service on new http:Listener(9000) {
    private final Client serviceDBClient;

    public function init() returns error? {
        //create a client to the service db
        self.serviceDBClient = check new ();
    }

    # A resource for checking if the user can request a certificate (cannot request a certificate if there is already a pending request with no issued date)
    # + userId - string - the user's asgardeo id
    # + return - boolean - true if the user can request a certificate, false otherwise. throws an error for internal server errors
    resource function get can\-request\-newcertificate(string userId) returns boolean|error {
        //get the user's last certificate request date
        stream<UserCertificate, persist:Error?> userCertificates = self.serviceDBClient->/usercertificates.get( 
            whereClause = `user_id = ${userId}`);

        UserCertificate[] arr = check from var userCertificate in userCertificates where userCertificate.issued_date == null && userCertificate.status == PENDING select userCertificate;

        if (arr.length() == 0) {
            //no certificate requests found, the user can request a certificate
            return true;
        } else {
            //multiple certificate requests found, throw an error
            return false;
        }
    }

    # A resource for adding a new user certificate request
    # + requestPayload - UserCertificateInsert - the user certificate request payload
    # + return - RequestCreated - the created request id. throws an error for internal server errors
    
    resource function post create\-user\-certificate\-request(UserCertificateInsertDTO requestPayload) returns RequestCreated|error {
        //create a new user certificate request
        UserCertificate userCertificate = {
            id: uuid:createType4AsString(),
            user_id: requestPayload.user_id,
            nic: requestPayload.nic,
            line_01: requestPayload.line_01,
            line_02: requestPayload.line_02,
            line_03: requestPayload.line_03,
            city: requestPayload.city,
            issued_date: null,
            collected_date: null,
            status : PENDING,
            grama_divisionId: requestPayload.grama_divisionId
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

    # A resource for getting all user certificate requests (also query params to filter by user id, grama division id and grama division name)
    # + userId - string - the user's asgardeo id
    # + gramaDivisionId - string - the grama division id
    # + gramaDivisionName - string - the grama division name
    # + return - UserCertificate[] - all user certificate requests. throws an error for internal server errors
    
    resource function get get\-all\-user\-certificate\-requests(string? userId, string? gramaDivisionId, string? gramaDivisionName) returns UserCertificate[]|CertificateNotFound|error {
        //get all user certificate requests
        stream<UserCertificate, persist:Error?> userCertificates = self.serviceDBClient->/usercertificates;
        UserCertificate[] arr = check from var userCertificate in userCertificates select userCertificate;

        if userId is () && gramaDivisionId is () && gramaDivisionName is () {
            return arr;
        }

        if userId is string {
            if gramaDivisionId is string {
                arr = from var userCertificate in arr where userCertificate.user_id == userId && userCertificate.grama_divisionId == gramaDivisionId select userCertificate;
            }
            else{
                arr = from var userCertificate in arr where userCertificate.user_id == userId select userCertificate;
            }
        }
        else{
            if gramaDivisionId is string {
                arr = from var userCertificate in arr where userCertificate.grama_divisionId == gramaDivisionId select userCertificate;
            }
        }

        //now filter by grama division name
        if gramaDivisionName is string {
            //get the grama division id by name
            stream<GramaDivision, persist:Error?> gramaDivisions = self.serviceDBClient->/gramadivisions;

            GramaDivision[] gramaDivisionsArr = check from var gramaDivision in gramaDivisions select gramaDivision;

            gramaDivisionsArr = gramaDivisionsArr.filter(function (GramaDivision gramaDivision) returns boolean {
                //regex to check if the grama division name contains the given grama division name
                string:RegExp regex = re `.*${string:toLowerAscii(gramaDivisionName.toString())}.*`;
                return regex.isFullMatch(string:toLowerAscii(gramaDivision.name));
            });

            //filter by grama division id
            arr = from var userCertificate in arr 
                from var gramaDivision in gramaDivisionsArr 
                where userCertificate.grama_divisionId == gramaDivision.id
                select userCertificate;
        }

        if(arr.length() == 0) {
            //no user certificate requests found, throw an error
            CertificateNotFound response = {
                body : {
                    message : "Could not find any user certificate requests for the given parameters"
                }
            };

            return response;
        }

        return arr;
    }

    # A resource for getting a user certificate request by id
    # + id - string - the user certificate request id
    # + return - UserCertificate - the user certificate request. throws an error for internal server errors
    # + return - CertificateNotFound - the user certificate request not found error
    
    resource function get get\-user\-certificate\-requests/[string id]() returns CertificateNotFound|UserCertificate|error {
        //get the user certificate request by id
        UserCertificate|error userCertificate = self.serviceDBClient->/usercertificates/[id];

        if (userCertificate is error) {
            //no user certificate request found, throw an error
            CertificateNotFound response = {
                body : {
                    message : "User certificate request not found"
                }
            };

            return response;
            
        } else {
            //user certificate request found, return it
            return userCertificate;
        }
    }

    # A resource for getting all user certificate requests by user id
    # + userId - string - the user's asgardeo id
    # + return - UserCertificate - the user certificate request. throws an error for internal server errors
    
    resource function get get\-user\-certificate\-requests\-by\-user\-id(string userId) returns UserCertificate[]| CertificateNotFound| error {
        //get the user certificate request by user id
        stream<UserCertificate, persist:Error?> userCertificates = self.serviceDBClient->/usercertificates.get( 
            whereClause = `user_id = ${userId}`);

        UserCertificate[] arr = check from var userCertificate in userCertificates select userCertificate;

        if (arr.length() == 0) {
            //no user certificate request found, throw an error
            CertificateNotFound response = {
                body : {
                    message : "Could not find any user certificate requests for the given user"
                }
            };

            return response;
            
        } else {
            //user certificates found, return them
            return arr;
        }
    }

    # A resource for getting all user certificate requests by grama division id
    # + gramaDivisionId - string - the grama division id
    # + return - UserCertificate - the user certificate request. throws an error for internal server errors
    
    resource function get get\-user\-certificate\-requests\-by\-grama\-division\-id(string gramaDivisionId) returns UserCertificate[]| CertificateNotFound| error {
        //get the user certificate request by grama division id
        stream<UserCertificate, persist:Error?> userCertificates = self.serviceDBClient->/usercertificates.get( 
            whereClause = `grama_divisionId = ${gramaDivisionId}`);

        UserCertificate[] arr = check from var userCertificate in userCertificates select userCertificate;

        if (arr.length() == 0) {
            //no user certificate request found, throw an error
            CertificateNotFound response = {
                body : {
                    message : "Could not find any user certificate requests for the given grama division"
                }
            };

            return response;
        } else {
            //user certificates found, return them
            return arr;
        }
    }

    # A resource for getting all user certificate requests by grama division name
    # + gramaDivisionName - string - the grama division name
    # + return - UserCertificate[] - the user certificate requests. throws an error for internal server errors
    
    resource function get get\-user\-certificate\-requests\-by\-grama\-division\-name(string gramaDivisionName) returns UserCertificate[]| CertificateNotFound| error {
        //get the user certificate request by grama division name
        stream<UserCertificate, persist:Error?> userCertificates = self.serviceDBClient->/usercertificates;

        stream<GramaDivision, persist:Error?> gramaDivisions = self.serviceDBClient->/gramadivisions;

        GramaDivision[] gramaDivisionsArr = check from var gramaDivision in gramaDivisions select gramaDivision;
        //filter by grama division name
        gramaDivisionsArr = gramaDivisionsArr.filter(function (GramaDivision gramaDivision) returns boolean {
            //regex to check if the grama division name contains the given grama division name
            string:RegExp regex = re `.*${string:toLowerAscii(gramaDivisionName.toString())}.*`;
            return regex.isFullMatch(string:toLowerAscii(gramaDivision.name));
        });

        UserCertificate[] arr = check from var userCertificate in userCertificates 
            from var gramaDivision in gramaDivisionsArr 
            where userCertificate.grama_divisionId == gramaDivision.id
            select userCertificate;


        if (arr.length() == 0) {
            //no user certificate request found, throw an error
            CertificateNotFound response = {
                body : {
                    message : "Could not find any user certificate requests for the given grama division"
                }
            };

            return response;
        } else {
            //user certificates found, return them
            return arr;
        }
    }


    # A resource for updating a user certificate request
    # + id - string - the user certificate request id
    # + updatingStatus - string - the user certificate request status
    # + return - UserCertificate - the updated user certificate request. throws an error for internal server errors
    # + return - CertificateNotFound - the user certificate request not found error 
    
    resource function put update\-user\-certificate\-requests/[string id](status updatingStatus) returns CertificateNotFound|UserCertificate|CertificateBadRequest|error {
        //get the user certificate request by id
        UserCertificate|error userCertificate = self.serviceDBClient->/usercertificates/[id];

        if (userCertificate is error) {
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
                if(userCertificate.status != APPROVED) {
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

    # A resource for getting all grama divisions
    # + return - GramaDivision[] - all grama divisions. throws an error for internal server errors
    
    resource function get get\-grama\-divisions(string? divisionName) returns GramaDivision[]|error {
        //get all grama divisions
        stream<GramaDivision, persist:Error?> gramaDivisions = self.serviceDBClient->/gramadivisions.get();
        if divisionName is () {
            GramaDivision[] arr = check from var gramaDivision in gramaDivisions select gramaDivision;

            return arr;
        }

        //filter by grama division name using regex
        string:RegExp regex = re `.*${string:toLowerAscii(divisionName.toString())}.*`;
        GramaDivision[] arr = check from var gramaDivision in gramaDivisions where regex.isFullMatch(string:toLowerAscii(gramaDivision.name)) select gramaDivision;
        return arr;
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