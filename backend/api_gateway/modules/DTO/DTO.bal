import ballerina/constraint;

# Description.
#
# + nic - valid nic in old or new format 
# + address - address of the applicant
public type CertificateRequestCreationDTO record {|

    @constraint:String {
        pattern: {
            value: re `^(([1,2]{1})([0,9]{1})([0-9]{2})([0,1,2,3,5,6,7,8]{1})([0-9]{7}))|^(([5,6,7,8,9]{1})([0-9]{1})([0,1,2,3,5,6,7,8]{1})([0-9]{6})([v|V|x|X]))`,
            message: "nic:NIC entered is invalid"
        }
    }
    string nic;

    Address address;
|};

# Description.
#
# + line_01 - number of the house
# + line_02 - second line of the address 
# + line_03 - third line of the address, this can be optional
# + city - city of the address
public type Address record {|
    string line_01;
    string line_02;
    string line_03?;
    string city;
|};
