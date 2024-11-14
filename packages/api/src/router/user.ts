import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { eq } from "@dreamlyfe/db";
import {
  CreateProfileSchema,
  CreateUserSchema,
  Profile,
  User,
} from "@dreamlyfe/db/schema";

import { publicProcedure } from "../trpc";

export const userRouter = {
  create: publicProcedure
    .input(CreateUserSchema)
    .mutation(async ({ ctx, input }) => {
      const [user] = await ctx.db
        .insert(User)
        .values(input)
        .returning({ id: User.id });
      return {
        id: user?.id,
      };
    }),
  profile: {
    get: publicProcedure
      .input(z.object({ userId: z.string().nullable() }))
      .query(async ({ ctx, input }) => {
        if (!input.userId) {
          return null;
        }
        const profile = await ctx.db.query.Profile.findFirst({
          where: eq(Profile.userId, input.userId),
        });

        return profile ?? null;
      }),
    upsert: publicProcedure
      .input(CreateProfileSchema)
      .mutation(({ ctx, input }) => {
        return ctx.db
          .insert(Profile)
          .values(input)
          .onConflictDoUpdate({ target: Profile.userId, set: input });
      }),
  },
} satisfies TRPCRouterRecord;
