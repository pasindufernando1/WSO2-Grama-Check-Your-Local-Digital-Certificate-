import ballerina/constraint;
import ballerina/time;

# Description.
#
# + nic - national identity card number in valid format without spaces  
# + fullname - full name as a string
# + dob - should be a json object of format { "year": 2017, "month": 10, "day": 23 }  
# + gender - gender must be one of 'male' or 'female' values
public type IdetityDetailsCreationDTO record {|

    @constraint:String {
        pattern: {
            value: re `^(([1,2]{1})([0,9]{1})([0-9]{2})([0,1,2,3,5,6,7,8]{1})([0-9]{7}))|^(([5,6,7,8,9]{1})([0-9]{1})([0,1,2,3,5,6,7,8]{1})([0-9]{6})([v|V|x|X]))`,
            message: "nic:NIC entered is invalid"
        }
    }
    string nic;

    string fullname;

    @constraint:Date {
        option: {
            value: constraint:PAST,
            message: "dob:Date of birth should be in the past date"
        }
    }
    time:Date dob;
    Gender gender;
|};

public enum Gender {
    male,
    female
};
