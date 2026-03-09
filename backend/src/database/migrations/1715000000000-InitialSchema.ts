import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1715000000000 implements MigrationInterface {
    name = 'InitialSchema1715000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create Enums
        await queryRunner.query(`CREATE TYPE "users_role_enum" AS ENUM('admin', 'barber', 'client')`);
        await queryRunner.query(`CREATE TYPE "bookings_status_enum" AS ENUM('pending', 'confirmed', 'completed', 'cancelled', 'no_show')`);
        await queryRunner.query(`CREATE TYPE "queue_entries_status_enum" AS ENUM('waiting', 'in_progress', 'completed', 'cancelled')`);
        await queryRunner.query(`CREATE TYPE "notifications_status_enum" AS ENUM('scheduled', 'sent', 'failed')`);
        await queryRunner.query(`CREATE TYPE "payments_status_enum" AS ENUM('pending', 'succeeded', 'failed', 'refunded')`);

        // Create Tables
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "full_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "users_role_enum" NOT NULL DEFAULT 'client', CONSTRAINT "UQ_97672df88af87152a3f12b964e2" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "locations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "address" character varying NOT NULL, "phone_number" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_7cc1c4bc8d4bc9f1f0a3070f3f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "barbers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, "location_id" uuid NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "working_hours" jsonb, CONSTRAINT "REL_user_id" UNIQUE ("user_id"), CONSTRAINT "PK_barbers" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "services" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "duration" integer NOT NULL, "price" numeric(10,2) NOT NULL, "category" character varying NOT NULL, "location_id" uuid NOT NULL, CONSTRAINT "PK_services" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, "phone" character varying NOT NULL, "visit_count" integer NOT NULL DEFAULT 0, "notes" text, CONSTRAINT "REL_client_user" UNIQUE ("user_id"), CONSTRAINT "UQ_client_phone" UNIQUE ("phone"), CONSTRAINT "PK_clients" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bookings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "barber_id" uuid NOT NULL, "client_id" uuid NOT NULL, "service_id" uuid NOT NULL, "location_id" uuid NOT NULL, "start_time" TIMESTAMP WITH TIME ZONE NOT NULL, "end_time" TIMESTAMP WITH TIME ZONE NOT NULL, "status" "bookings_status_enum" NOT NULL DEFAULT 'pending', CONSTRAINT "PK_bookings" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "queue_entries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "client_id" uuid NOT NULL, "barber_id" uuid, "location_id" uuid NOT NULL, "position" integer NOT NULL, "status" "queue_entries_status_enum" NOT NULL DEFAULT 'waiting', "estimated_wait_minutes" integer NOT NULL, CONSTRAINT "PK_queue_entries" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "loyalty_cards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "client_id" uuid NOT NULL, "points" integer NOT NULL DEFAULT 0, "tier" character varying NOT NULL DEFAULT 'Bronze', "rewards" jsonb, CONSTRAINT "REL_loyalty_client" UNIQUE ("client_id"), CONSTRAINT "PK_loyalty_cards" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "client_id" uuid NOT NULL, "type" character varying NOT NULL, "scheduled_at" TIMESTAMP WITH TIME ZONE NOT NULL, "sent_at" TIMESTAMP WITH TIME ZONE, "status" "notifications_status_enum" NOT NULL DEFAULT 'scheduled', CONSTRAINT "PK_notifications" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "commissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "barber_id" uuid NOT NULL, "booking_id" uuid NOT NULL, "amount" numeric(10,2) NOT NULL, "rate" numeric(5,2) NOT NULL, "paid_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "REL_commission_booking" UNIQUE ("booking_id"), CONSTRAINT "PK_commissions" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "booking_id" uuid NOT NULL, "amount" numeric(10,2) NOT NULL, "stripe_id" character varying, "status" "payments_status_enum" NOT NULL DEFAULT 'pending', CONSTRAINT "REL_payment_booking" UNIQUE ("booking_id"), CONSTRAINT "PK_payments" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "barber_specialties" ("barber_id" uuid NOT NULL, "service_id" uuid NOT NULL, CONSTRAINT "PK_barber_specialties" PRIMARY KEY ("barber_id", "service_id"))`);

        // Create Indexes
        await queryRunner.query(`CREATE INDEX "IDX_user_email" ON "users" ("email")`);
        await queryRunner.query(`CREATE INDEX "IDX_barber_user" ON "barbers" ("user_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_barber_location" ON "barbers" ("location_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_service_location" ON "services" ("location_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_client_user" ON "clients" ("user_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_client_phone" ON "clients" ("phone")`);
        await queryRunner.query(`CREATE INDEX "IDX_booking_barber" ON "bookings" ("barber_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_booking_client" ON "bookings" ("client_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_booking_time" ON "bookings" ("start_time")`);
        await queryRunner.query(`CREATE INDEX "IDX_queue_location" ON "queue_entries" ("location_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_notification_client" ON "notifications" ("client_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_payment_stripe" ON "payments" ("stripe_id")`);

        // Foreign Keys
        await queryRunner.query(`ALTER TABLE "barbers" ADD CONSTRAINT "FK_barber_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "barbers" ADD CONSTRAINT "FK_barber_location" FOREIGN KEY ("location_id") REFERENCES "locations"("id")`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_service_location" FOREIGN KEY ("location_id") REFERENCES "locations"("id")`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_client_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_booking_barber" FOREIGN KEY ("barber_id") REFERENCES "barbers"("id")`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_booking_client" FOREIGN KEY ("client_id") REFERENCES "clients"("id")`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_booking_service" FOREIGN KEY ("service_id") REFERENCES "services"("id")`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_booking_location" FOREIGN KEY ("location_id") REFERENCES "locations"("id")`);
        await queryRunner.query(`ALTER TABLE "queue_entries" ADD CONSTRAINT "FK_queue_client" FOREIGN KEY ("client_id") REFERENCES "clients"("id")`);
        await queryRunner.query(`ALTER TABLE "queue_entries" ADD CONSTRAINT "FK_queue_barber" FOREIGN KEY ("barber_id") REFERENCES "barbers"("id")`);
        await queryRunner.query(`ALTER TABLE "queue_entries" ADD CONSTRAINT "FK_queue_location" FOREIGN KEY ("location_id") REFERENCES "locations"("id")`);
        await queryRunner.query(`ALTER TABLE "loyalty_cards" ADD CONSTRAINT "FK_loyalty_client" FOREIGN KEY ("client_id") REFERENCES "clients"("id")`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_notification_client" FOREIGN KEY ("client_id") REFERENCES "clients"("id")`);
        await queryRunner.query(`ALTER TABLE "commissions" ADD CONSTRAINT "FK_commission_barber" FOREIGN KEY ("barber_id") REFERENCES "barbers"("id")`);
        await queryRunner.query(`ALTER TABLE "commissions" ADD CONSTRAINT "FK_commission_booking" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id")`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_payment_booking" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "barber_specialties"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TABLE "commissions"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "loyalty_cards"`);
        await queryRunner.query(`DROP TABLE "queue_entries"`);
        await queryRunner.query(`DROP TABLE "bookings"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TABLE "barbers"`);
        await queryRunner.query(`DROP TABLE "locations"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "payments_status_enum"`);
        await queryRunner.query(`DROP TYPE "notifications_status_enum"`);
        await queryRunner.query(`DROP TYPE "queue_entries_status_enum"`);
        await queryRunner.query(`DROP TYPE "bookings_status_enum"`);
        await queryRunner.query(`DROP TYPE "users_role_enum"`);
    }
}