export function serializeJsonLd(value: Readonly<Record<string, unknown>>) {
  const json = JSON.stringify(value);

  if (json === undefined) {
    throw new TypeError("JSON-LD data must be serializable.");
  }

  return json
    .replaceAll("&", "\\u0026")
    .replaceAll("<", "\\u003c")
    .replaceAll(">", "\\u003e");
}
