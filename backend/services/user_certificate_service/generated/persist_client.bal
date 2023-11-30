// AUTO-GENERATED FILE. DO NOT MODIFY.
// This file is an auto-generated file by Ballerina persistence layer for model.
// It should not be modified by hand.
import ballerina/jballerina.java;
import ballerina/persist;
import ballerina/sql;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
import ballerinax/persist.sql as psql;

const USER_CERTIFICATE = "usercertificates";

public isolated client class Client {
    *persist:AbstractPersistClient;

    private final mysql:Client dbClient;

    private final map<psql:SQLClient> persistClients;

    private final record {|psql:SQLMetadata...;|} & readonly metadata = {
        [USER_CERTIFICATE] : {
            entityName: "UserCertificate",
            tableName: "UserCertificate",
            fieldMetadata: {
                id: {columnName: "id"},
                asgardeo_external_id: {columnName: "asgardeo_external_id"},
                issued_date: {columnName: "issued_date"},
                collected_date: {columnName: "collected_date"},
                status: {columnName: "status"}
            },
            keyFields: ["id"]
        }
    };

    public isolated function init() returns persist:Error? {
        mysql:Client|error dbClient = new (host = host, user = user, password = password, database = database, port = port, options = connectionOptions);
        if dbClient is error {
            return <persist:Error>error(dbClient.message());
        }
        self.dbClient = dbClient;
        self.persistClients = {[USER_CERTIFICATE] : check new (dbClient, self.metadata.get(USER_CERTIFICATE), psql:MYSQL_SPECIFICS)};
    }

    isolated resource function get usercertificates(UserCertificateTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get usercertificates/[string id](UserCertificateTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post usercertificates(UserCertificateInsert[] data) returns string[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(USER_CERTIFICATE);
        }
        _ = check sqlClient.runBatchInsertQuery(data);
        return from UserCertificateInsert inserted in data
            select inserted.id;
    }

    isolated resource function put usercertificates/[string id](UserCertificateUpdate value) returns UserCertificate|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(USER_CERTIFICATE);
        }
        _ = check sqlClient.runUpdateQuery(id, value);
        return self->/usercertificates/[id].get();
    }

    isolated resource function delete usercertificates/[string id]() returns UserCertificate|persist:Error {
        UserCertificate result = check self->/usercertificates/[id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(USER_CERTIFICATE);
        }
        _ = check sqlClient.runDeleteQuery(id);
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

