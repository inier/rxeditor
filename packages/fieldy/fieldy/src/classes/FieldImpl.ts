import { ErrorListener, FieldState, IField, IFieldSchema, IFieldyEngine, IForm, Listener, SuccessListener, Unsubscribe, ValueChangeListener } from "../interfaces/fieldy";
import { PropExpression } from "./PropExpression";
import { ValidationSubscriber } from "./ValidationSubscriber";
import { IValidateSchema, IValidationError } from "../interfaces";
import { IFieldFeedback } from "../actions";
import { getChildFields } from "../funcs/path";

export function transformErrorsToFeedbacks(errors: IValidationError[], schemas: IFieldSchema[]): IFieldFeedback[] {
  const feedbacks: IFieldFeedback[] = []
  for (const schema of schemas) {
    const error = errors.find(err => err.path === schema.path)
    if (error) {
      feedbacks.push({ path: schema.path, type: "error", messages: [error.message || "no error message"] })
    } else {
      feedbacks.push({ path: schema.path, type: "success" })
    }
  }
  return feedbacks
}

export class FieldImpl implements IField {
  refCount = 1;
  expressions: PropExpression[] = []
  //发起变化标号，防止无限递归
  initiateExpressionChange = false;
  validationSubscriber: ValidationSubscriber = new ValidationSubscriber()

  constructor(public fieldy: IFieldyEngine, public form: IForm, private fieldPath: string) { }

  getSiblings(): IField<IValidateSchema>[] {
    const fields: IField<IValidateSchema>[] = []
    const fieldStates = getChildFields(this.fieldy.getFormState(this.form.name)?.fields || {}, this.basePath)
    for (const fieldState of fieldStates) {
      const field = this.form.getField(fieldState.basePath + "." + fieldState.name)
      if (field) {
        fields.push(field)
      }
    }
    return fields
  }

  getParent(): IField<IValidateSchema> | undefined {
    if (this.basePath) {
      return this.form.getField(this.basePath)
    }
  }

  getSubFieldSchemas(): IFieldSchema[] | undefined {
    if (this.meta?.type === "object" || this.meta?.type === "array") {
      return this.form.fieldy.getFormState(this.form.name)?.fieldSchemas?.filter(schema => {
        return schema.path !== this.path && schema.path.startsWith(this.path)
      })
    }

    return undefined
  }

  getSubFields(): IField<IValidateSchema>[] | undefined {
    const fields: IField<IValidateSchema>[] = []
    for (const schema of this.getSubFieldSchemas() || []) {
      const field = this.form.getField(schema.path)
      if (field) {
        fields.push(field)
      }
    }

    return fields
  }


  getFieldSchema(): IFieldSchema {
    return this.fieldy.getFormState(this.form.name)?.fieldSchemas.find(schema => schema.path === this.path) || { path: this.path, ...this.meta }
  }

  getModified(): boolean {
    throw this.fieldy.getFieldState(this.form.name, this.fieldPath)?.modified;
  }

  getDefaultValue(): unknown {
    return this.fieldy.getFieldDefaultValue(this.form.name, this.fieldPath)
  }

  getInitialValue(): unknown {
    return this.fieldy.getFieldInitialValue(this.form.name, this.fieldPath)
  }

  getState(): FieldState | undefined {
    return this.fieldy.getFieldState(this.form.name, this.fieldPath)
  }
  getValue() {
    return this.fieldy.getFieldValue(this.form.name, this.fieldPath)
  }

  get meta() {
    return this.fieldy.getFieldState(this.form.name, this.fieldPath)?.meta
  }

  get path() {
    return this.fieldPath
  }

  get basePath() {
    return this.fieldy.getFieldState(this.form.name, this.fieldPath)?.basePath
  }

  destroy(): void {
    // this.unsubValueChange?.()
    // this.unsubValueChange?.()
  }

  setValue(value: unknown): void {
    this.fieldy.setFieldValue(this.form.name, this.path, value)
  }

  setInitialValue(value: unknown): void {
    this.fieldy.setFieldInitialValue(this.form.name, this.path, value)
  }

  setDefaultValue(value: unknown): void {
    this.fieldy.setFieldDefaultValue(this.form.name, this.path, value)
  }

  inputValue(value: unknown): void {
    this.fieldy.inputFieldValue(this.form.name, this.path, value)
  }

  validate(): void {
    if (this.fieldy.validator) {
      this.validationSubscriber.emitStart()
      this.fieldy.validator.validateField(this).then((value: unknown) => {
        this.validationSubscriber.emitSuccess(value)
      }).catch((errors: IValidationError[]) => {
        const fieldSchema = this.getFieldSchema()
        const subFields = this.getSubFieldSchemas()
        this.fieldy.setValidationFeedbacks(this.form.name, transformErrorsToFeedbacks(errors, [fieldSchema, ...subFields || []]))
        this.validationSubscriber.emitFailed(errors)
      }).finally(() => {
        this.validationSubscriber.emitEnd()
      })
    } else {
      console.error("Not set validator")
    }
  }

  reset(): void {
    throw new Error("Method not implemented.");
  }


  onInit(_listener: Listener): Unsubscribe {
    throw new Error("Method not implemented.");
  }

  onMount(_listener: Listener): Unsubscribe {
    throw new Error("Method not implemented.");
  }

  onUnmount(_listener: Listener): Unsubscribe {
    throw new Error("Method not implemented.");
  }

  onValueChange(listener: ValueChangeListener): Unsubscribe {
    return this.fieldy.subscribeToFieldValueChange(this.form.name, this.path || "", listener)
  }
  onInitialValueChange(): Unsubscribe {
    throw new Error("Method not implemented.");
  }

  onValidateStart(listener: Listener): Unsubscribe {
    return this.validationSubscriber.onValidateStart(listener)
  }
  onValidateEnd(listener: Listener): Unsubscribe {
    return this.validationSubscriber.onValidateEnd(listener)
  }
  onValidateFailed(listener: ErrorListener): Unsubscribe {
    return this.validationSubscriber.onValidateFailed(listener)
  }
  onValidateSuccess(listener: SuccessListener): Unsubscribe {
    return this.validationSubscriber.onValidateSuccess(listener)
  }
}