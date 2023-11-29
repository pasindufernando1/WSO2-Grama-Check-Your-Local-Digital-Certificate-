import ballerina/http;
import ballerinax/slack;

# A service representing the slack service
# bound to port `9090`.
# 
configurable string SLACK_USER_OAUTH_TOKEN = ?;

# InternalServerError represents an internal server error.
# + body - contains the error details

type InternalServerError record {|
    *http:InternalServerError;
    json body;
|};

type ChannelCreated record {|
    *http:Created;
    json body;
|};

type BadRequestError record {|
    *http:BadRequest;
    json body;
|};

slack:ConnectionConfig slackConfig = {
    auth : {
        token : SLACK_USER_OAUTH_TOKEN
    }
};

type newChannelParams record {|
    string channelName;
    boolean isPrivate;
    string slackEmail;
|};


service /api/v1/slack\-service on new http:Listener(9090) {
    private final slack:Client slackClient;

    public function init() returns error?{
        self.slackClient = check new(slackConfig);
        return ();
    }

    # A resource function to post a message to a slack channel
    # + channelName - username of the user so that we can find the channel that the user is in (only one channel per user)
    # + messageToSend - message to be posted
    # + return - returns the response from the slack service
    resource function post postmessage(string channelName, string messageToSend) returns InternalServerError | string {
        //TODO: get the channel name from the username (bal persist)
        slack:Message messageParams = {
            channelName: channelName,
            text: messageToSend
        };

        string | error response = self.slackClient->postMessage(messageParams);
        if (response is error) {
            InternalServerError e = {
                body: {
                    "message": response.message()
                }
            };
            return e;
        } else {
            return response;
        }
    }

    #A resource function to create a new channel for an user (Single user channel)
    # + channelParams - channel name, isPrivate and slackEmail of the user
    # + return - returns the response from the slack service
    
    resource function post createchannel(newChannelParams channelParams) returns BadRequestError | InternalServerError | http:Created | error {
        //first lookup the user by email
        slack:User | error? userResponse = self.slackClient->lookupUserByEmail(channelParams.slackEmail);
        if (userResponse is error) {
            BadRequestError e = {
                body: {
                    "message": "An error occurred while looking up the user",
                    "error": userResponse.message()
                }
            };
            return e;
        }


        slack:Channel | error response = self.slackClient->createConversation(channelParams.channelName);
        if (response is error) {
            InternalServerError e = {
                body: {
                    "message": "An error occurred while creating the channel",
                    "error": response.message()
                }
            };
            return e;
        }

        //now invite the user to the channel
        slack:Channel channel = response;

        string? userId = userResponse?.id;

        if (userId is ()){
            BadRequestError e = {
                body: {
                    "message": "User not found"
                }
            };
            return e;
        }

        string[*] members = [userId];

        slack:Channel | error inviteResponse = self.slackClient->inviteUsersToConversation(channel.name, members);
        if (inviteResponse is error) {
            InternalServerError e = {
                body: {
                    "message": "An error occurred while inviting the user to the channel",
                    "error": inviteResponse.message()
                }
            };
            return e;
        }

        ChannelCreated channelCreated = {
            body: {
                "message": "Channel created successfully and user invited to the channel"
            }
        };
        return channelCreated;   
    }


}
