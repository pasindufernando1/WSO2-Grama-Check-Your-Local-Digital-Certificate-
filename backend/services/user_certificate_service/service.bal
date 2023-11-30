import ballerina/http;
import ballerina/persist;

# A service representing a network-accessible API
# bound to port `9090`.
# 
const string CERTIFICATE_REQUEST_INTERVAL = "6 MONTH";

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
            whereClause = `asgardeo_external_id = ${asgardeoExternalId} AND issued_date >= CURDATE() - INTERVAL ${CERTIFICATE_REQUEST_INTERVAL}`, 
            orderByClause = `issued_date DESC`,
            limitClause = `1`);

        if (userCertificates.count() == 0) {
            //no certificate requests found, the user can request a certificate
            return true;
        } else {
            //multiple certificate requests found, throw an error
            return false;
        }
    }
}
