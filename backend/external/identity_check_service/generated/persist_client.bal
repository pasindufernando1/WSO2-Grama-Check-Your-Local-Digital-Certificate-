// AUTO-GENERATED FILE. DO NOT MODIFY.
// This file is an auto-generated file by Ballerina persistence layer for model.
// It should not be modified by hand.
import ballerina/jballerina.java;
import ballerina/persist;
import ballerina/sql;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
import ballerinax/persist.sql as psql;

const IDENTITY_DETAILS = "identitydetails";

public isolated client class Client {
    *persist:AbstractPersistClient;

    private final mysql:Client dbClient;

    private final map<psql:SQLClient> persistClients;

    private final record {|psql:SQLMetadata...;|} & readonly metadata = {
        [IDENTITY_DETAILS] : {
            entityName: "IdentityDetails",
            tableName: "IdentityDetails",
            fieldMetadata: {
                nic: {columnName: "nic"},
                fullname: {columnName: "fullname"},
                dob: {columnName: "dob"},
                gender: {columnName: "gender"}
            },
            keyFields: ["nic"]
        }
    };

    public isolated function init() returns persist:Error? {
        mysql:Client|error dbClient = new (host = host, user = user, password = password, database = database, port = port, options = connectionOptions);
        if dbClient is error {
            return <persist:Error>error(dbClient.message());
        }
        self.dbClient = dbClient;
        self.persistClients = {[IDENTITY_DETAILS] : check new (dbClient, self.metadata.get(IDENTITY_DETAILS), psql:MYSQL_SPECIFICS)};
    }

    isolated resource function get identitydetails(IdentityDetailsTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get identitydetails/[string nic](IdentityDetailsTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post identitydetails(IdentityDetailsInsert[] data) returns string[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(IDENTITY_DETAILS);
        }
        _ = check sqlClient.runBatchInsertQuery(data);
        return from IdentityDetailsInsert inserted in data
            select inserted.nic;
    }

    isolated resource function put identitydetails/[string nic](IdentityDetailsUpdate value) returns IdentityDetails|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(IDENTITY_DETAILS);
        }
        _ = check sqlClient.runUpdateQuery(nic, value);
        return self->/identitydetails/[nic].get();
    }

    isolated resource function delete identitydetails/[string nic]() returns IdentityDetails|persist:Error {
        IdentityDetails result = check self->/identitydetails/[nic].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(IDENTITY_DETAILS);
        }
        _ = check sqlClient.runDeleteQuery(nic);
        return result;
    }

    remote isolated function queryNativeSQL(sql:ParameterizedQuery sqlQuery, typedesc<record {}> rowType = <>) returns stream<rowType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor"
    } external;

    remote isolated function executeNativeSQL(sql:ParameterizedQuery sqlQuery) returns psql:ExecutionResult|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor"
    } external;

    public isolated function close() returns persist:Error? {
        error? result = self.dbClient.close();
        if result is error {
            return <persist:Error>error(result.message());
        }
        return result;
    }
}

