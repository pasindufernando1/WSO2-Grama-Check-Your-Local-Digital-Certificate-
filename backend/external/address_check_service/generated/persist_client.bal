// AUTO-GENERATED FILE. DO NOT MODIFY.
// This file is an auto-generated file by Ballerina persistence layer for model.
// It should not be modified by hand.
import ballerina/jballerina.java;
import ballerina/persist;
import ballerina/sql;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
import ballerinax/persist.sql as psql;

const ADDRESS_DETAILS = "addressdetails";

public isolated client class Client {
    *persist:AbstractPersistClient;

    private final mysql:Client dbClient;

    private final map<psql:SQLClient> persistClients;

    private final record {|psql:SQLMetadata...;|} & readonly metadata = {
        [ADDRESS_DETAILS] : {
            entityName: "AddressDetails",
            tableName: "AddressDetails",
            fieldMetadata: {
                nic: {columnName: "nic"},
                line_01: {columnName: "line_01"},
                line_02: {columnName: "line_02"},
                line_03: {columnName: "line_03"},
                city: {columnName: "city"}
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
        self.persistClients = {[ADDRESS_DETAILS] : check new (dbClient, self.metadata.get(ADDRESS_DETAILS), psql:MYSQL_SPECIFICS)};
    }

    isolated resource function get addressdetails(AddressDetailsTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get addressdetails/[string nic](AddressDetailsTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post addressdetails(AddressDetailsInsert[] data) returns string[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(ADDRESS_DETAILS);
        }
        _ = check sqlClient.runBatchInsertQuery(data);
        return from AddressDetailsInsert inserted in data
            select inserted.nic;
    }

    isolated resource function put addressdetails/[string nic](AddressDetailsUpdate value) returns AddressDetails|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(ADDRESS_DETAILS);
        }
        _ = check sqlClient.runUpdateQuery(nic, value);
        return self->/addressdetails/[nic].get();
    }

    isolated resource function delete addressdetails/[string nic]() returns AddressDetails|persist:Error {
        AddressDetails result = check self->/addressdetails/[nic].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(ADDRESS_DETAILS);
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

