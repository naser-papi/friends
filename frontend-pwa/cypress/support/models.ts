export type DataFieldType =
  | "text"
  | "multiLine"
  | "password"
  | "email"
  | "image"
  | "number"
  | "select"
  | "boolean";

export interface IDataField {
  name: string;
  type: DataFieldType;
  required: boolean;
  min?: number;
  max?: number;
}
