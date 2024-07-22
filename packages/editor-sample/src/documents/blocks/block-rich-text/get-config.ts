import { z } from "zod";
import { FONT_FAMILY_SCHEMA, PADDING_SCHEMA } from "./prop-schema";

export const getFontFamily = (
  fontFamily: z.infer<typeof FONT_FAMILY_SCHEMA>
) => {
  switch (fontFamily) {
    case "MODERN_SANS":
      return '"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif';
    case "BOOK_SANS":
      return 'Optima, Candara, "Noto Sans", source-sans-pro, sans-serif';
    case "ORGANIC_SANS":
      return 'Seravek, "Gill Sans Nova", Ubuntu, Calibri, "DejaVu Sans", source-sans-pro, sans-serif';
    case "GEOMETRIC_SANS":
      return 'Avenir, "Avenir Next LT Pro", Montserrat, Corbel, "URW Gothic", source-sans-pro, sans-serif';
    case "HEAVY_SANS":
      return 'Bahnschrift, "DIN Alternate", "Franklin Gothic Medium", "Nimbus Sans Narrow", sans-serif-condensed, sans-serif';
    case "ROUNDED_SANS":
      return 'ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa, Manjari, "Arial Rounded MT Bold", Calibri, source-sans-pro, sans-serif';
    case "MODERN_SERIF":
      return 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif';
    case "BOOK_SERIF":
      return '"Iowan Old Style", "Palatino Linotype", "URW Palladio L", P052, serif';
    case "MONOSPACE":
      return '"Nimbus Mono PS", "Courier New", "Cutive Mono", monospace';
  }
  return undefined;
};

export const getPadding = (padding: z.infer<typeof PADDING_SCHEMA>) =>
  padding
    ? `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`
    : undefined;
