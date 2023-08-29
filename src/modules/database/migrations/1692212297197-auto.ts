import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1692212297197 implements MigrationInterface {
  name = 'Auto1692212297197';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_7c07e38dd0d817a103966c5876e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_715d259ae16fb1e669fb69ef155" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "AlbumToFavs" ("id" SERIAL NOT NULL, "albumId" uuid NOT NULL, CONSTRAINT "REL_f4a5806bf40172ec5525c874b7" UNIQUE ("albumId"), CONSTRAINT "PK_043c7850d48816620aedf37f7ec" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ArtistToFavs" ("id" SERIAL NOT NULL, "artistId" uuid NOT NULL, CONSTRAINT "REL_069e58b178a043a5e525fcc7dc" UNIQUE ("artistId"), CONSTRAINT "PK_cb0a14d50f6c33fc296b437cc19" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "User" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" text NOT NULL, "version" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "password" text NOT NULL, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "artistId" uuid, "albumId" uuid, "duration" integer NOT NULL, CONSTRAINT "REL_aa1f298d1ff6728d65b4232713" UNIQUE ("artistId"), CONSTRAINT "REL_8cd82637ad035c862207206de5" UNIQUE ("albumId"), CONSTRAINT "PK_51ee6369b97c61b87ff510bcd33" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "TrackToFavs" ("id" SERIAL NOT NULL, "trackId" uuid NOT NULL, CONSTRAINT "REL_7da2422268f0417c4cfbeac873" UNIQUE ("trackId"), CONSTRAINT "PK_47817c9c6dd4d8d9131b5079178" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "Album" ADD CONSTRAINT "FK_7e5f0ed6b42c66789d4435ba8eb" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "AlbumToFavs" ADD CONSTRAINT "FK_f4a5806bf40172ec5525c874b77" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ArtistToFavs" ADD CONSTRAINT "FK_069e58b178a043a5e525fcc7dc2" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Track" ADD CONSTRAINT "FK_aa1f298d1ff6728d65b4232713f" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Track" ADD CONSTRAINT "FK_8cd82637ad035c862207206de57" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "TrackToFavs" ADD CONSTRAINT "FK_7da2422268f0417c4cfbeac8739" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "TrackToFavs" DROP CONSTRAINT "FK_7da2422268f0417c4cfbeac8739"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Track" DROP CONSTRAINT "FK_8cd82637ad035c862207206de57"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Track" DROP CONSTRAINT "FK_aa1f298d1ff6728d65b4232713f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ArtistToFavs" DROP CONSTRAINT "FK_069e58b178a043a5e525fcc7dc2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "AlbumToFavs" DROP CONSTRAINT "FK_f4a5806bf40172ec5525c874b77"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Album" DROP CONSTRAINT "FK_7e5f0ed6b42c66789d4435ba8eb"`,
    );
    await queryRunner.query(`DROP TABLE "TrackToFavs"`);
    await queryRunner.query(`DROP TABLE "Track"`);
    await queryRunner.query(`DROP TABLE "User"`);
    await queryRunner.query(`DROP TABLE "ArtistToFavs"`);
    await queryRunner.query(`DROP TABLE "AlbumToFavs"`);
    await queryRunner.query(`DROP TABLE "Album"`);
    await queryRunner.query(`DROP TABLE "Artist"`);
  }
}
