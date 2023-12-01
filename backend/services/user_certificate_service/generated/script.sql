-- AUTO-GENERATED FILE.

-- This file is an auto-generated file by Ballerina persistence layer for model.
-- Please verify the generated scripts and execute them against the target DB server.

DROP TABLE IF EXISTS `UserCertificate`;

CREATE TABLE `UserCertificate` (
	`id` VARCHAR(191) NOT NULL,
	`asgardeo_external_id` VARCHAR(191) NOT NULL,
	`issued_date` DATE,
	`collected_date` DATE,
	`status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'COLLECTED') NOT NULL,
	PRIMARY KEY(`id`)
);
