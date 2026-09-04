export function getFileType(fileExt: string) {
  if (fileExt === ".png") return "PNG";
  if (fileExt === ".jpg") return "JPG";
  if (fileExt === ".svg") return "SVG";

  return "WEBP";
}
