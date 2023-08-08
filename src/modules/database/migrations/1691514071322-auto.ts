import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1691514071322 implements MigrationInterface {
    name = 'Auto1691514071322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "TrackToFavs" ("id" SERIAL NOT NULL, "trackId" uuid NOT NULL, CONSTRAINT "REL_7da2422268f0417c4cfbeac873" UNIQUE ("trackId"), CONSTRAINT "PK_47817c9c6dd4d8d9131b5079178" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "AlbumToFavs" ("id" SERIAL NOT NULL, "albumId" uuid NOT NULL, CONSTRAINT "REL_f4a5806bf40172ec5525c874b7" UNIQUE ("albumId"), CONSTRAINT "PK_043c7850d48816620aedf37f7ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ArtistToFavs" ("id" SERIAL NOT NULL, "artistId" uuid NOT NULL, CONSTRAINT "REL_069e58b178a043a5e525fcc7dc" UNIQUE ("artistId"), CONSTRAINT "PK_cb0a14d50f6c33fc296b437cc19" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "TrackToFavs" ADD CONSTRAINT "FK_7da2422268f0417c4cfbeac8739" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "AlbumToFavs" ADD CONSTRAINT "FK_f4a5806bf40172ec5525c874b77" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ArtistToFavs" ADD CONSTRAINT "FK_069e58b178a043a5e525fcc7dc2" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ArtistToFavs" DROP CONSTRAINT "FK_069e58b178a043a5e525fcc7dc2"`);
        await queryRunner.query(`ALTER TABLE "AlbumToFavs" DROP CONSTRAINT "FK_f4a5806bf40172ec5525c874b77"`);
        await queryRunner.query(`ALTER TABLE "TrackToFavs" DROP CONSTRAINT "FK_7da2422268f0417c4cfbeac8739"`);
        await queryRunner.query(`DROP TABLE "ArtistToFavs"`);
        await queryRunner.query(`DROP TABLE "AlbumToFavs"`);
        await queryRunner.query(`DROP TABLE "TrackToFavs"`);
    }

}
