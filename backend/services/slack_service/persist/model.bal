import ballerina/persist as _;

type UserChannel record {|
    readonly int id;
    string slackEmail;
    string channel;
|};