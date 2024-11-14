import { relations, sql } from "drizzle-orm";
import { pgEnum, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const Post = pgTable("post", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  title: t.varchar({ length: 256 }).notNull(),
  content: t.text().notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}));

export const CreatePostSchema = createInsertSchema(Post, {
  title: z.string().max(256),
  content: z.string().max(256),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const User = pgTable("user", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}));

export const UserRelations = relations(User, ({ one }) => ({
  profile: one(Profile),
}));

export const CreateUserSchema = createInsertSchema(User, {}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const gendersEnum = pgEnum("genders", ["FEMALE", "MALE", "OTHER"]);

export const relationshipStatus = pgEnum("relationship_status", [
  "DATING",
  "RELATIONSHIP",
  "MARRIED",
]);

export const relationshipDuration = pgEnum("relationship_duration", [
  "LESS_THAN_1_WEEK",
  "LESS_THAN_1_MONTH",
  "LESS_THAN_6_MONTHS",
  "LESS_THAN_1_YEAR",
  "1_TO_2_YEARS",
  "3_TO_5_YEARS",
  "MORE_THAN_5_YEARS",
]);

export const Profile = pgTable("profile", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  gender: gendersEnum(),
  genderPreference: gendersEnum(),
  relationshipStatus: relationshipStatus(),
  relationshipDuration: relationshipDuration(),
  userId: t
    .uuid()
    .notNull()
    .unique()
    .references(() => User.id, { onDelete: "cascade" }),
}));

export const ProfileRelations = relations(Profile, ({ one }) => ({
  user: one(User, { fields: [Profile.userId], references: [User.id] }),
}));

export const CreateProfileSchema = createInsertSchema(Profile, {
  gender: z.enum(gendersEnum.enumValues),
  genderPreference: z.enum(gendersEnum.enumValues),
  relationshipStatus: z.enum(relationshipStatus.enumValues),
  relationshipDuration: z.enum(relationshipDuration.enumValues),
  userId: z.string(),
}).omit({
  id: true,
});
