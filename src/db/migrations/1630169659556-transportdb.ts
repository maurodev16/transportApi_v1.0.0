import {MigrationInterface, QueryRunner} from "typeorm";

export class transportdb1630169659556 implements MigrationInterface {
    name = 'transportdb1630169659556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`transportdb\`.\`auth\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(100) NOT NULL, \`last_name\` varchar(100) NOT NULL, \`phone\` varchar(255) NULL, \`cel\` varchar(30) NOT NULL, \`email\` varchar(150) NOT NULL, \`password\` varchar(60) NOT NULL, \`post_code\` varchar(5) NOT NULL, \`ort\` varchar(150) NOT NULL, \`city\` varchar(150) NOT NULL, \`created_at\` timestamp NOT NULL, \`updated_at\` timestamp NOT NULL, UNIQUE INDEX \`IDX_bed5ff7f50dae39532b8c99a2b\` (\`phone\`), UNIQUE INDEX \`IDX_0df5e9d1320647be5ba33e38ab\` (\`cel\`), UNIQUE INDEX \`IDX_b54f616411ef3824f6a5c06ea4\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`transportdb\`.\`drivers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`driver_Id\` int NOT NULL, \`hause_number\` varchar(20) NOT NULL, \`driver_avatar_url\` varchar(255) NOT NULL, \`car_img_url_1\` varchar(255) NOT NULL, \`car_img_url_2\` varchar(255) NOT NULL, \`car_img_url_3\` varchar(255) NOT NULL, \`car_img_url_4\` varchar(255) NOT NULL, \`car_img_url_5\` varchar(255) NOT NULL, \`doc_url_1\` varchar(255) NOT NULL, \`doc_url_2\` varchar(255) NOT NULL, \`doc_url_3\` varchar(255) NOT NULL, \`doc_url_4\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`transportdb\`.\`cars\` (\`id\` int NOT NULL AUTO_INCREMENT, \`car_name\` varchar(100) NOT NULL, \`car_brand\` varchar(50) NOT NULL, \`car_image\` varchar(255) NULL, \`license_plate\` varchar(255) NOT NULL, \`price\` double NOT NULL, \`do_help\` tinyint NOT NULL DEFAULT 0, \`created_at\` timestamp NOT NULL, \`updated_at\` timestamp NOT NULL, \`driver_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`transportdb\`.\`tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(255) NOT NULL, \`email\` varchar(150) NOT NULL, UNIQUE INDEX \`IDX_d60a53f7fd2e12866a82a02a9f\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`transportdb\`.\`cars\` ADD CONSTRAINT \`FK_1403195e3b80cf083352758adb0\` FOREIGN KEY (\`driver_id\`) REFERENCES \`transportdb\`.\`drivers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transportdb\`.\`cars\` DROP FOREIGN KEY \`FK_1403195e3b80cf083352758adb0\``);
        await queryRunner.query(`DROP INDEX \`IDX_d60a53f7fd2e12866a82a02a9f\` ON \`transportdb\`.\`tokens\``);
        await queryRunner.query(`DROP TABLE \`transportdb\`.\`tokens\``);
        await queryRunner.query(`DROP TABLE \`transportdb\`.\`cars\``);
        await queryRunner.query(`DROP TABLE \`transportdb\`.\`drivers\``);
        await queryRunner.query(`DROP INDEX \`IDX_b54f616411ef3824f6a5c06ea4\` ON \`transportdb\`.\`auth\``);
        await queryRunner.query(`DROP INDEX \`IDX_0df5e9d1320647be5ba33e38ab\` ON \`transportdb\`.\`auth\``);
        await queryRunner.query(`DROP INDEX \`IDX_bed5ff7f50dae39532b8c99a2b\` ON \`transportdb\`.\`auth\``);
        await queryRunner.query(`DROP TABLE \`transportdb\`.\`auth\``);
    }

}
