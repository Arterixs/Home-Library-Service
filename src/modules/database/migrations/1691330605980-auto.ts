import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1691330605980 implements MigrationInterface {
    name = 'Auto1691330605980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "year" integer NOT NULL, "artistId" text, CONSTRAINT "PK_715d259ae16fb1e669fb69ef155" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_7c07e38dd0d817a103966c5876e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "artistId" text, "albumId" text, "duration" integer NOT NULL, CONSTRAINT "PK_51ee6369b97c61b87ff510bcd33" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Track"`);
        await queryRunner.query(`DROP TABLE "Artist"`);
        await queryRunner.query(`DROP TABLE "Album"`);
    }

}
