import ballerina/http;
import ballerina/persist;

# Following is the bad request error record
# that is returned when the NIC is not valid
# + body - json that contains the error message

type InvalidNICError record {|
    *http:BadRequest;
    json body;
|};    

# the external api to check police reports
# bound to port `9090`. for now

service /api/v1/police\-check\-service on new http:Listener(9090) {

    private final Client serviceDBClient;

    public function init() returns error? {
        //create a client to the service db
        self.serviceDBClient = check new ();
    }



    # A resource for checking police records for a given NIC
    # + NIC - string
    # + return - a json object with following fields
    # {
    #   "records" : []
    #   "eligibility" : boolean
    # }
    resource function get 'check/[string NIC]() returns InvalidNICError | json | error {
        //nic format validation
        //there are two types of NICs in Sri Lanka
        //1. 9 digit and followed by a V NICs
        //2. 12 digit NICs

        //validate the NIC using regex
        string:RegExp nicRegex = re `^([0-9]{9}[x|X|v|V]|[0-9]{12})$`;

        //validate the NIC
        if(nicRegex.isFullMatch(NIC) == false) {
            InvalidNICError invalidNICError = {
                body: {
                    message: "Invalid NIC"
                }
            };
            return invalidNICError;
        }

        //first get all the records for the given NIC
        stream<PoliceDetails, persist:Error?> recordStream = self.serviceDBClient->/policedetails.get(whereClause =`nic = ${NIC}`);

        json[] records = check from var 'record in recordStream select { 
            "record" : 'record.'record,
            "date" : 'record.date.toJson()
        };

        json response = {
            "records": records.toJson(),
            "eligibility": records.length() == 0
        };

        return response;
    }
}
