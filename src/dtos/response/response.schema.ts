import { count } from 'console';
import { z, ZodObject, ZodRawShape } from 'zod';

export const ResponseSchema = <DataType extends ZodRawShape>(Schema: ZodObject<DataType>) =>
  z.object({
    data: z.array(Schema),
    meta: z.object({
      page: z.number(),
      count: z.number(),
      perPage: z.number(),
      hasMore: z.boolean(),
      lastPage: z.number(),
      from: z.number(),
      to: z.number(),
    })
  })