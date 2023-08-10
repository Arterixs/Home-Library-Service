import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1691693017781 implements MigrationInterface {
    name = 'Auto1691693017781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TrackToFavs" ADD CONSTRAINT "UQ_7da2422268f0417c4cfbeac8739" UNIQUE ("trackId")`);
        await queryRunner.query(`ALTER TABLE "TrackToFavs" ADD CONSTRAINT "FK_7da2422268f0417c4cfbeac8739" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TrackToFavs" DROP CONSTRAINT "FK_7da2422268f0417c4cfbeac8739"`);
        await queryRunner.query(`ALTER TABLE "TrackToFavs" DROP CONSTRAINT "UQ_7da2422268f0417c4cfbeac8739"`);
    }

}
