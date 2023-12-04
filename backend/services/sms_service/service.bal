import ballerina/http;
import ballerina/sql;
import ballerina/log;
import ballerinax/twilio;


type TwilioConfig record {|
    string fromMobile;
    string toMobile;
    string accountSId;
    string authToken;
|};


configurable string accountSId = "AC32b96232ef92c9ea76d7241c91f08bec";
configurable string authToken = "b7d397a1d5ccfdebf201b240fd10a404";

configurable TwilioConfig twillioConfig = ?;

twilio:Client twilioClient = check new ({
    twilioAuth: {
         accountSId: accountSId,
         authToken: authToken
    }
});


public function send_twilio_message(string message) returns error? {
    var details = twilioClient->sendSms(twillioConfig.fromMobile, twillioConfig.toMobile, message);
    //Response is printed as log messages
    if (details is twilio:SmsResponse) {
        log:printInfo("SMS_SID: " + details.sid.toString() + ", Body: " + details.body.toString());
    } else {
        log:printInfo(details.message());
    }
}


service /api/v1 on new http:Listener(8080) {

    resource function get send_approved_message() returns string|sql:Error|error?{
        string message = "Your request has been approved. Please contact the grama niladhari office for more information.";
        var result = send_twilio_message(message);
        return result;
    } 

    resource function get send_rejected_message() returns string|sql:Error|error?{
        string message = "Your request has been rejected. Please contact the grama niladhari office for more information.";
        var result = send_twilio_message(message);
        return result;
    }

    
}




