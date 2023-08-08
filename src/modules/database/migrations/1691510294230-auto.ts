import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1691510294230 implements MigrationInterface {
    name = 'Auto1691510294230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Track" DROP COLUMN "artistId"`);
        await queryRunner.query(`ALTER TABLE "Track" ADD "artistId" uuid`);
        await queryRunner.query(`ALTER TABLE "Track" ADD CONSTRAINT "UQ_aa1f298d1ff6728d65b4232713f" UNIQUE ("artistId")`);
        await queryRunner.query(`ALTER TABLE "Track" DROP COLUMN "albumId"`);
        await queryRunner.query(`ALTER TABLE "Track" ADD "albumId" uuid`);
        await queryRunner.query(`ALTER TABLE "Track" ADD CONSTRAINT "UQ_8cd82637ad035c862207206de57" UNIQUE ("albumId")`);
        await queryRunner.query(`ALTER TABLE "Track" ADD CONSTRAINT "FK_aa1f298d1ff6728d65b4232713f" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Track" ADD CONSTRAINT "FK_8cd82637ad035c862207206de57" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Track" DROP CONSTRAINT "FK_8cd82637ad035c862207206de57"`);
        await queryRunner.query(`ALTER TABLE "Track" DROP CONSTRAINT "FK_aa1f298d1ff6728d65b4232713f"`);
        await queryRunner.query(`ALTER TABLE "Track" DROP CONSTRAINT "UQ_8cd82637ad035c862207206de57"`);
        await queryRunner.query(`ALTER TABLE "Track" DROP COLUMN "albumId"`);
        await queryRunner.query(`ALTER TABLE "Track" ADD "albumId" text`);
        await queryRunner.query(`ALTER TABLE "Track" DROP CONSTRAINT "UQ_aa1f298d1ff6728d65b4232713f"`);
        await queryRunner.query(`ALTER TABLE "Track" DROP COLUMN "artistId"`);
        await queryRunner.query(`ALTER TABLE "Track" ADD "artistId" text`);
    }

}
