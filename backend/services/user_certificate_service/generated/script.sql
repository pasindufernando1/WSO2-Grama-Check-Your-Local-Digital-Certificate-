-- AUTO-GENERATED FILE.

-- This file is an auto-generated file by Ballerina persistence layer for model.
-- Please verify the generated scripts and execute them against the target DB server.

DROP TABLE IF EXISTS `UserCertificate`;
DROP TABLE IF EXISTS `GramaDivision`;

CREATE TABLE `GramaDivision` (
	`id` VARCHAR(191) NOT NULL,
	`name` VARCHAR(191) NOT NULL,
	PRIMARY KEY(`id`)
);

CREATE TABLE `UserCertificate` (
	`id` VARCHAR(191) NOT NULL,
	`user_id` VARCHAR(191) NOT NULL,
	`issued_date` DATE,
	`collected_date` DATE,
	`status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'COLLECTED') NOT NULL,
	`nic` VARCHAR(191) NOT NULL,
	`line_01` VARCHAR(191) NOT NULL,
	`line_02` VARCHAR(191) NOT NULL,
	`line_03` VARCHAR(191),
	`city` VARCHAR(191) NOT NULL,
	`grama_divisionId` VARCHAR(191) NOT NULL,
	FOREIGN KEY(`grama_divisionId`) REFERENCES `GramaDivision`(`id`),
	PRIMARY KEY(`id`)
);
