import {MigrationInterface, QueryRunner} from "typeorm";

export class transportdb1631642451685 implements MigrationInterface {
    name = 'transportdb1631642451685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "drivers" ("id" SERIAL NOT NULL, "firstname" character varying(100) NOT NULL, "lastname" character varying(100), "phone" character varying, "cel" character varying(30), "email" character varying(150), "password" character varying(60), "postCode" character varying(5), "ort" character varying(150), "city" character varying(150), "hauseNumber" character varying(20) NOT NULL, "language" character varying(20) NOT NULL, "startPrice" numeric NOT NULL, "trips" integer NOT NULL, "doHelp" boolean NOT NULL DEFAULT false, "isOnline" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL, "isVerified" boolean NOT NULL, "driverAvatarUrl" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "carsId" integer, CONSTRAINT "UQ_b97a5a68c766d2d1ec25e6a85b2" UNIQUE ("phone"), CONSTRAINT "UQ_0c009f36b326d3f2f5e43b9abc3" UNIQUE ("cel"), CONSTRAINT "UQ_d4cfc1aafe3a14622aee390edb2" UNIQUE ("email"), CONSTRAINT "REL_cf8418b68e84a3e37f693bfcc3" UNIQUE ("carsId"), CONSTRAINT "PK_92ab3fb69e566d3eb0cae896047" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cars" ("id" SERIAL NOT NULL, "carName" character varying(100) NOT NULL, "carBrand" character varying(50) NOT NULL, "licensePlate" character varying NOT NULL, "carImgUrl1" character varying NOT NULL, "carImgUrl2" character varying NOT NULL, "carImgUrl3" character varying NOT NULL, "carImgUrl4" character varying NOT NULL, "carImgUrl5" character varying NOT NULL, "docUrl" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstname" character varying(100) NOT NULL, "lastname" character varying(100), "phone" character varying, "cel" character varying(30), "email" character varying NOT NULL, "password" character varying(60), "postCode" character varying(5), "ort" character varying(150), "city" character varying(150), "floor" integer, "pickUp" character varying NOT NULL, "dropOff" character varying NOT NULL, "isActive" boolean NOT NULL, "isVerified" boolean NOT NULL, "scheduling" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "statusId" integer, CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "UQ_fef935dafbb0415c8bfc37c8a61" UNIQUE ("cel"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rating" ("id" SERIAL NOT NULL, "rating" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tokens" ("id" SERIAL NOT NULL, "token" character varying(255) NOT NULL, "email" character varying(150) NOT NULL, CONSTRAINT "UQ_d60a53f7fd2e12866a82a02a9f4" UNIQUE ("email"), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "drivers" ADD CONSTRAINT "FK_cf8418b68e84a3e37f693bfcc32" FOREIGN KEY ("carsId") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drivers" DROP CONSTRAINT "FK_cf8418b68e84a3e37f693bfcc32"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`DROP TABLE "rating"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "cars"`);
        await queryRunner.query(`DROP TABLE "drivers"`);
    }

}
