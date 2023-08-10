import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1691690587203 implements MigrationInterface {
    name = 'Auto1691690587203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TrackToFavs" DROP CONSTRAINT "FK_7da2422268f0417c4cfbeac8739"`);
        await queryRunner.query(`ALTER TABLE "TrackToFavs" DROP CONSTRAINT "REL_7da2422268f0417c4cfbeac873"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TrackToFavs" ADD CONSTRAINT "REL_7da2422268f0417c4cfbeac873" UNIQUE ("trackId")`);
        await queryRunner.query(`ALTER TABLE "TrackToFavs" ADD CONSTRAINT "FK_7da2422268f0417c4cfbeac8739" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
