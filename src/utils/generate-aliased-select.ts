import { camelToSnake } from "./camel-to-snake";

export function generateAliasedSelect(
  fields: string[],
  tableAlias: string,
  nestedAlias: string,
  prefixCol?: string
): string {
  return fields
    .map(field => {
      const column = camelToSnake(field);
      return `${tableAlias}.${(prefixCol ? prefixCol : '') + column} AS "${nestedAlias}.${field}"`;
    })
    .join(", ");
}