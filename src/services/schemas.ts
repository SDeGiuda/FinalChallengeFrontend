import { z } from "zod";

const paginatedResponseSchema = z.object({
  meta: z.object({
    lastPage: z.number(),
    perPage: z.number(),
    total: z.number(),
  }),
});

export const parsePaginatedResponse = <T>(schema: z.ZodType<T>, response: unknown) =>
  paginatedResponseSchema.extend({ data: schema }).parse(response);
