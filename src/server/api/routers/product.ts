import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  getAllProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        offset: z.number().optional(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.product.findMany({
        take: input.limit,
        skip: input.offset,
      });
    }),

  getProductByTitle: publicProcedure
    .input(
      z.object({
        title_id: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.product.findUnique({
        where: {
          title_id: input.title_id,
        },
      });
    }),
});
