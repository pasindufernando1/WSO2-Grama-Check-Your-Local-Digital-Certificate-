-- AUTO-GENERATED FILE.

-- This file is an auto-generated file by Ballerina persistence layer for model.
-- Please verify the generated scripts and execute them against the target DB server.

DROP TABLE IF EXISTS `PoliceDetails`;

CREATE TABLE `PoliceDetails` (
	`id` VARCHAR(191) NOT NULL,
	`nic` VARCHAR(191) NOT NULL,
	`record` VARCHAR(191) NOT NULL,
	`date` DATE NOT NULL,
	PRIMARY KEY(`id`)
);
