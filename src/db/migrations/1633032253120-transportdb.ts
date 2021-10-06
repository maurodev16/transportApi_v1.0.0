import {MigrationInterface, QueryRunner} from "typeorm";

export class transportdb1633032253120 implements MigrationInterface {
    name = 'transportdb1633032253120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "driverRequest" ("id" SERIAL NOT NULL, "floor" integer, "pickUp" character varying NOT NULL, "dropOff" character varying NOT NULL, "scheduling" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_93db6253763440e9a3f2d3b9a9b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rating" ("id" SERIAL NOT NULL, "rating" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "token" ("id" SERIAL NOT NULL, "token" character varying(255) NOT NULL, "email" character varying(150) NOT NULL, CONSTRAINT "UQ_0e2d5f48b40ada015f98b8a169a" UNIQUE ("email"), CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicle" ("id" SERIAL NOT NULL, "vehicleName" character varying(100) NOT NULL, "vehicleBrand" character varying(50) NOT NULL, "licensePlate" character varying NOT NULL, "vehicleImgUrl1" character varying NOT NULL, "vehicleImgUrl2" character varying NOT NULL, "vehicleImgUrl3" character varying NOT NULL, "vehicleImgUrl4" character varying NOT NULL, "vehicleImgUrl5" character varying NOT NULL, "docUrl" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_187fa17ba39d367e5604b3d1ec9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstname" character varying(100) NOT NULL, "lastname" character varying(100), "email" character varying(150), "password" character varying(60), "cel" character varying(30), "city" character varying(150), "postCode" character varying(5), "ort" character varying(150), "status" boolean NOT NULL DEFAULT false, "hauseNumber" character varying(20) NOT NULL, "language" character varying(20) NOT NULL, "startPrice" numeric NOT NULL, "avatarUrl" character varying NOT NULL, "doHelp" boolean NOT NULL, "isEmailConfirmed" boolean NOT NULL DEFAULT false, "isOnline" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "isVerified" boolean NOT NULL DEFAULT false, "isDriver" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_c370786a9bec317aff97065803d" UNIQUE ("cel"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD CONSTRAINT "FK_86aea53f0b2b4f046e25e8315d1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicle" DROP CONSTRAINT "FK_86aea53f0b2b4f046e25e8315d1"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "vehicle"`);
        await queryRunner.query(`DROP TABLE "token"`);
        await queryRunner.query(`DROP TABLE "rating"`);
        await queryRunner.query(`DROP TABLE "driverRequest"`);
    }

}
