-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema magia_de_amor_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema magia_de_amor_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `magia_de_amor_db` DEFAULT CHARACTER SET utf8 ;
USE `magia_de_amor_db` ;

-- -----------------------------------------------------
-- Table `magia_de_amor_db`.`workshops`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `magia_de_amor_db`.`workshops` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NULL,
  `description` LONGTEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `magia_de_amor_db`.`lessons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `magia_de_amor_db`.`lessons` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fk_workshop_id` INT NULL,
  `title` VARCHAR(255) NULL,
  `description` LONGTEXT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_workshop_id_idx` (`fk_workshop_id` ASC) ,
  CONSTRAINT `workshops_lessons`
    FOREIGN KEY (`fk_workshop_id`)
    REFERENCES `magia_de_amor_db`.`workshops` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `magia_de_amor_db`.`lesson_contents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `magia_de_amor_db`.`lesson_contents` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fk_lesson_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_lesson_id_idx` (`fk_lesson_id` ASC) ,
  CONSTRAINT `lessons_lessons_contents`
    FOREIGN KEY (`fk_lesson_id`)
    REFERENCES `magia_de_amor_db`.`lessons` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `magia_de_amor_db`.`lesson_comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `magia_de_amor_db`.`lesson_comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fk_lesson_id` INT NULL,
  `comment` LONGTEXT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_lesson_id_idx` (`fk_lesson_id` ASC) ,
  CONSTRAINT `lessons_lessons_comments`
    FOREIGN KEY (`fk_lesson_id`)
    REFERENCES `magia_de_amor_db`.`lessons` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `magia_de_amor_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `magia_de_amor_db`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rol` INT NULL,
  `avatar` LONGTEXT NULL,
  `name` VARCHAR(45) NULL,
  `lastname` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `magia_de_amor_db`.`lessons_readed`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `magia_de_amor_db`.`lessons_readed` (
  `fk_user_id` INT NULL,
  `fk_lesson_id` INT NULL,
  INDEX `fk_user_id_idx` (`fk_user_id` ASC) ,
  INDEX `fk_lesson_id_idx` (`fk_lesson_id` ASC) ,
  CONSTRAINT `users_lessons_readed`
    FOREIGN KEY (`fk_user_id`)
    REFERENCES `magia_de_amor_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `lessons_lessons_readed`
    FOREIGN KEY (`fk_lesson_id`)
    REFERENCES `magia_de_amor_db`.`lessons` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
