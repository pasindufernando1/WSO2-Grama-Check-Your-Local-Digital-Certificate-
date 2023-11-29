-- AUTO-GENERATED FILE.

-- This file is an auto-generated file by Ballerina persistence layer for model.
-- Please verify the generated scripts and execute them against the target DB server.

DROP TABLE IF EXISTS `AddressDetails`;

CREATE TABLE `AddressDetails` (
	`nic` VARCHAR(191) NOT NULL,
	`line_01` VARCHAR(191) NOT NULL,
	`line_02` VARCHAR(191) NOT NULL,
	`line_03` VARCHAR(191) NOT NULL,
	`city` VARCHAR(191) NOT NULL,
	PRIMARY KEY(`nic`)
);
