// type ColorCodeType = 31|32|33|34|35|36|37|90|91|92|93|94|95|96|97;

type ColorToCodeType = {
  error: number,
  success: number,
  warning: number,
  info: number,
}

const colorToCode: ColorToCodeType = {
  error: 31,
  success: 32,
  warning: 33,
  info: 34,
}

type ColorType = keyof ColorToCodeType;

/**
 *  Returns colored string for console.
 *  For more info go to https://en.m.wikipedia.org/wiki/ANSI_escape_code#Colors
 *  @param {string} value string to be colorized.
 *  @param {ColorCodeType} colorType string to be colorized.
 *  @returns {string} Colored string.
 */
export const cc = (
  value: string,
  colorType: ColorType
): string => `\x1b[${colorToCode[colorType]}m${value}\x1b[0m`;
