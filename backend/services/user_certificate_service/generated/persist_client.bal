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
const GRAMA_DIVISION = "gramadivisions";

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
                user_id: {columnName: "user_id"},
                issued_date: {columnName: "issued_date"},
                collected_date: {columnName: "collected_date"},
                status: {columnName: "status"},
                nic: {columnName: "nic"},
                line_01: {columnName: "line_01"},
                line_02: {columnName: "line_02"},
                line_03: {columnName: "line_03"},
                city: {columnName: "city"},
                grama_divisionId: {columnName: "grama_divisionId"},
                "grama_division.id": {relation: {entityName: "grama_division", refField: "id"}},
                "grama_division.name": {relation: {entityName: "grama_division", refField: "name"}}
            },
            keyFields: ["id"],
            joinMetadata: {grama_division: {entity: GramaDivision, fieldName: "grama_division", refTable: "GramaDivision", refColumns: ["id"], joinColumns: ["grama_divisionId"], 'type: psql:ONE_TO_MANY}}
        },
        [GRAMA_DIVISION] : {
            entityName: "GramaDivision",
            tableName: "GramaDivision",
            fieldMetadata: {
                id: {columnName: "id"},
                name: {columnName: "name"},
                "user_certificates[].id": {relation: {entityName: "user_certificates", refField: "id"}},
                "user_certificates[].user_id": {relation: {entityName: "user_certificates", refField: "user_id"}},
                "user_certificates[].issued_date": {relation: {entityName: "user_certificates", refField: "issued_date"}},
                "user_certificates[].collected_date": {relation: {entityName: "user_certificates", refField: "collected_date"}},
                "user_certificates[].status": {relation: {entityName: "user_certificates", refField: "status"}},
                "user_certificates[].nic": {relation: {entityName: "user_certificates", refField: "nic"}},
                "user_certificates[].line_01": {relation: {entityName: "user_certificates", refField: "line_01"}},
                "user_certificates[].line_02": {relation: {entityName: "user_certificates", refField: "line_02"}},
                "user_certificates[].line_03": {relation: {entityName: "user_certificates", refField: "line_03"}},
                "user_certificates[].city": {relation: {entityName: "user_certificates", refField: "city"}},
                "user_certificates[].grama_divisionId": {relation: {entityName: "user_certificates", refField: "grama_divisionId"}}
            },
            keyFields: ["id"],
            joinMetadata: {user_certificates: {entity: UserCertificate, fieldName: "user_certificates", refTable: "UserCertificate", refColumns: ["grama_divisionId"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE}}
        }
    };

    public isolated function init() returns persist:Error? {
        mysql:Client|error dbClient = new (host = host, user = user, password = password, database = database, port = port, options = connectionOptions);
        if dbClient is error {
            return <persist:Error>error(dbClient.message());
        }
        self.dbClient = dbClient;
        self.persistClients = {
            [USER_CERTIFICATE] : check new (dbClient, self.metadata.get(USER_CERTIFICATE), psql:MYSQL_SPECIFICS),
            [GRAMA_DIVISION] : check new (dbClient, self.metadata.get(GRAMA_DIVISION), psql:MYSQL_SPECIFICS)
        };
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

    isolated resource function get gramadivisions(GramaDivisionTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get gramadivisions/[string id](GramaDivisionTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post gramadivisions(GramaDivisionInsert[] data) returns string[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(GRAMA_DIVISION);
        }
        _ = check sqlClient.runBatchInsertQuery(data);
        return from GramaDivisionInsert inserted in data
            select inserted.id;
    }

    isolated resource function put gramadivisions/[string id](GramaDivisionUpdate value) returns GramaDivision|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(GRAMA_DIVISION);
        }
        _ = check sqlClient.runUpdateQuery(id, value);
        return self->/gramadivisions/[id].get();
    }

    isolated resource function delete gramadivisions/[string id]() returns GramaDivision|persist:Error {
        GramaDivision result = check self->/gramadivisions/[id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(GRAMA_DIVISION);
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

