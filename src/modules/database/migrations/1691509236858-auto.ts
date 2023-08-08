import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1691509236858 implements MigrationInterface {
    name = 'Auto1691509236858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Album" DROP COLUMN "artistId"`);
        await queryRunner.query(`ALTER TABLE "Album" ADD "artistId" uuid`);
        await queryRunner.query(`ALTER TABLE "Album" ADD CONSTRAINT "UQ_7e5f0ed6b42c66789d4435ba8eb" UNIQUE ("artistId")`);
        await queryRunner.query(`ALTER TABLE "Album" ADD CONSTRAINT "FK_7e5f0ed6b42c66789d4435ba8eb" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Album" DROP CONSTRAINT "FK_7e5f0ed6b42c66789d4435ba8eb"`);
        await queryRunner.query(`ALTER TABLE "Album" DROP CONSTRAINT "UQ_7e5f0ed6b42c66789d4435ba8eb"`);
        await queryRunner.query(`ALTER TABLE "Album" DROP COLUMN "artistId"`);
        await queryRunner.query(`ALTER TABLE "Album" ADD "artistId" text`);
    }

}
