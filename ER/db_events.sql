-- MySQL Script generated by MySQL Workbench
-- Fri Nov  3 15:17:23 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema events_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema events_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `events_db` DEFAULT CHARACTER SET utf8 ;
USE `events_db` ;

-- -----------------------------------------------------
-- Table `events_db`.`table1`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `events_db`.`table1` (
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `events_db`.`tbl_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `events_db`.`tbl_users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(255) NULL,
  `birth_day` DATE NULL,
  `genre` VARCHAR(45) NULL,
  `disabled` TINYINT NULL,
  `role` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `phone_number` VARCHAR(45) NULL,
  `picture` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `events_db`.`tbl_events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `events_db`.`tbl_events` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `subtitle` VARCHAR(45) NULL,
  `location` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `date` DATE NULL,
  `disabled` TINYINT NULL,
  `image` VARCHAR(255) NULL,
  `partner` VARCHAR(45) NULL,
  `start_date` DATETIME NULL,
  `end_date` DATETIME NULL,
  `price` DOUBLE NULL,
  `dress_code` VARCHAR(45) NULL,
  `disabled` TINYINT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `events_db`.`tbl_events_created`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `events_db`.`tbl_events_created` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tbl_users_id` INT NOT NULL,
  `tbl_events_id` INT NOT NULL,
  PRIMARY KEY (`id`, `tbl_events_id`),
  INDEX `fk_tbl_events_created_tbl_users_idx` (`tbl_users_id` ASC) VISIBLE,
  INDEX `fk_tbl_events_created_tbl_events1_idx` (`tbl_events_id` ASC) VISIBLE,
  CONSTRAINT `fk_tbl_events_created_tbl_users`
    FOREIGN KEY (`tbl_users_id`)
    REFERENCES `events_db`.`tbl_users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_events_created_tbl_events1`
    FOREIGN KEY (`tbl_events_id`)
    REFERENCES `events_db`.`tbl_events` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `events_db`.`tbl_events_saved`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `events_db`.`tbl_events_saved` (
  `id` INT NOT NULL,
  `tbl_users_id` INT NOT NULL,
  `tbl_events_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tbl_events_saved_tbl_users1_idx` (`tbl_users_id` ASC) VISIBLE,
  INDEX `fk_tbl_events_saved_tbl_events1_idx` (`tbl_events_id` ASC) VISIBLE,
  CONSTRAINT `fk_tbl_events_saved_tbl_users1`
    FOREIGN KEY (`tbl_users_id`)
    REFERENCES `events_db`.`tbl_users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_events_saved_tbl_events1`
    FOREIGN KEY (`tbl_events_id`)
    REFERENCES `events_db`.`tbl_events` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
