-- AUTO-GENERATED FILE.

-- This file is an auto-generated file by Ballerina persistence layer for model.
-- Please verify the generated scripts and execute them against the target DB server.

DROP TABLE IF EXISTS `IdentityDetails`;

CREATE TABLE `IdentityDetails` (
	`nic` VARCHAR(191) NOT NULL,
	`fullname` VARCHAR(191) NOT NULL,
	`dob` DATE NOT NULL,
	`gender` VARCHAR(191) NOT NULL,
	PRIMARY KEY(`nic`)
);
