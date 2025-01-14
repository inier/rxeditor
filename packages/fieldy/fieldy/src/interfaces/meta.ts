export type FieldType = 'object' | 'array' | 'normal';

export interface IValidateSchema {
  //boolean，为了简化其它地方解析，required目前不携带message
  required?: boolean
}

//字段元数据
export interface IFieldMeta<ValidateRules extends IValidateSchema = IValidateSchema> {
  //类型：对象、数组、常规
  type?: FieldType;
  //数组行数据是数字
  name?: string | number;
  label?: string;
  defaultValue?: unknown;
  //校验规则
  validateRules?: ValidateRules;
}
