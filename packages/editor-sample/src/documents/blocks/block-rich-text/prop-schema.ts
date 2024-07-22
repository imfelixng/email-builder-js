import { z } from "zod";

export const FONT_FAMILY_SCHEMA = z
  .enum([
    "MODERN_SANS",
    "BOOK_SANS",
    "ORGANIC_SANS",
    "GEOMETRIC_SANS",
    "HEAVY_SANS",
    "ROUNDED_SANS",
    "MODERN_SERIF",
    "BOOK_SERIF",
    "MONOSPACE",
  ])
  .nullable()
  .optional();

export const COLOR_SCHEMA = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/)
  .nullable()
  .optional();

export const PADDING_SCHEMA = z
  .object({
    top: z.number(),
    bottom: z.number(),
    right: z.number(),
    left: z.number(),
  })
  .optional()
  .nullable();

export const RichTextPropsSchema = z.object({
  style: z
    .object({
      color: COLOR_SCHEMA,
      backgroundColor: COLOR_SCHEMA,
      fontSize: z.number().gte(0).optional().nullable(),
      fontFamily: FONT_FAMILY_SCHEMA,
      fontWeight: z.enum<string, any>(["bold", "normal"]).optional().nullable(),
      textAlign: z
        .enum<string, any>(["left", "center", "right"])
        .optional()
        .nullable(),
      padding: PADDING_SCHEMA,
    })
    .optional()
    .nullable(),
  props: z
    .object({
      text: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
});
