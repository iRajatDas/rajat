CREATE TABLE IF NOT EXISTS "account" (
	"userId" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"refresh_token" varchar(255),
	"access_token" varchar(255),
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" varchar(255),
	"session_state" varchar(255),
	CONSTRAINT account_provider_providerAccountId PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "newsletterSubscriber" (
	"email" varchar(255) PRIMARY KEY NOT NULL,
	"createdAt" timestamp (3) DEFAULT now(),
	CONSTRAINT "newsletterSubscriber_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"emailVerificationToken" varchar(255),
	"emailVerified" timestamp (3),
	"passwordHash" text,
	"resetPasswordToken" varchar(255),
	"resetPasswordTokenExpires" timestamp (3),
	"image" varchar(255),
	"createdAt" timestamp (3) DEFAULT now(),
	CONSTRAINT "user_emailVerificationToken_unique" UNIQUE("emailVerificationToken"),
	CONSTRAINT "user_resetPasswordToken_unique" UNIQUE("resetPasswordToken")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT verificationToken_identifier_token PRIMARY KEY("identifier","token")
);
