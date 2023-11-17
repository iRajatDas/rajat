import { newsletterSubscribers, users } from "@/lib/db/queryBuilder";
import { eq, sql } from "drizzle-orm";
import { queryBuilder } from "../queryBuilder";

export const psGetUserByEmail = queryBuilder
  .select()
  .from(users)
  .where(eq(users.email, sql.placeholder("email")))
  .prepare("psGetUserByEmail");

export const psGetUserByEmailVerificationToken = queryBuilder
  .select()
  .from(users)
  .where(
    eq(users.emailVerificationToken, sql.placeholder("emailVerificationToken"))
  )
  .prepare("psGetUserByEmailVerificationToken");

export const psGetUserByResetPasswordToken = queryBuilder
  .select()
  .from(users)
  .where(eq(users.resetPasswordToken, sql.placeholder("resetPasswordToken")))
  .prepare("psGetUserByResetPasswordToken");

export const psGetNewsletterSubscriberByEmail = queryBuilder
  .select()
  .from(newsletterSubscribers)
  .where(eq(newsletterSubscribers.email, sql.placeholder("email")))
  .prepare("psGetNewsletterSubscriberByEmail");
