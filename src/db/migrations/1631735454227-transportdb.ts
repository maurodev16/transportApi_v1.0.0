import {MigrationInterface, QueryRunner} from "typeorm";

export class transportdb1631735454227 implements MigrationInterface {
    name = 'transportdb1631735454227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "driver" ("id" SERIAL NOT NULL, "firstname" character varying(100) NOT NULL, "lastname" character varying(100), "phone" character varying, "cel" character varying(30), "email" character varying(150), "password" character varying(60), "postCode" character varying(5), "ort" character varying(150), "city" character varying(150), "hauseNumber" character varying(20) NOT NULL, "language" character varying(20) NOT NULL, "startPrice" numeric NOT NULL, "trips" integer NOT NULL, "doHelp" boolean NOT NULL DEFAULT false, "isOnline" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "isVerified" boolean NOT NULL DEFAULT false, "driverAvatarUrl" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "carsId" integer, CONSTRAINT "UQ_a543b386d47b7e80c3047522a48" UNIQUE ("phone"), CONSTRAINT "UQ_a4308618cf71411e312e99ad6e2" UNIQUE ("cel"), CONSTRAINT "UQ_bb2050b01c92e5eb0ecee4c77fb" UNIQUE ("email"), CONSTRAINT "REL_0d76b8118e4d8480b2b0554800" UNIQUE ("carsId"), CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car" ("id" SERIAL NOT NULL, "carName" character varying(100) NOT NULL, "carBrand" character varying(50) NOT NULL, "licensePlate" character varying NOT NULL, "carImgUrl1" character varying NOT NULL, "carImgUrl2" character varying NOT NULL, "carImgUrl3" character varying NOT NULL, "carImgUrl4" character varying NOT NULL, "carImgUrl5" character varying NOT NULL, "docUrl" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "driverRequest" ("id" SERIAL NOT NULL, "floor" integer, "pickUp" character varying NOT NULL, "dropOff" character varying NOT NULL, "scheduling" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_93db6253763440e9a3f2d3b9a9b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstname" character varying(100) NOT NULL, "lastname" character varying(100), "phone" character varying, "cel" character varying(30), "email" character varying NOT NULL, "password" character varying(60), "postCode" character varying(5), "ort" character varying(150), "city" character varying(150), "isActive" boolean NOT NULL, "isVerified" boolean NOT NULL, "status" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "UQ_c370786a9bec317aff97065803d" UNIQUE ("cel"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rating" ("id" SERIAL NOT NULL, "rating" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "token" ("id" SERIAL NOT NULL, "token" character varying(255) NOT NULL, "email" character varying(150) NOT NULL, CONSTRAINT "UQ_0e2d5f48b40ada015f98b8a169a" UNIQUE ("email"), CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "driver" ADD CONSTRAINT "FK_0d76b8118e4d8480b2b05548000" FOREIGN KEY ("carsId") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driver" DROP CONSTRAINT "FK_0d76b8118e4d8480b2b05548000"`);
        await queryRunner.query(`DROP TABLE "token"`);
        await queryRunner.query(`DROP TABLE "rating"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "driverRequest"`);
        await queryRunner.query(`DROP TABLE "car"`);
        await queryRunner.query(`DROP TABLE "driver"`);
    }

}
