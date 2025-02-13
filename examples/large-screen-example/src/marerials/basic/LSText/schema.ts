import { SchemaOptions, createSchema } from "@rxdrag/react-antd-materials";
import { INodeSchema } from "@rxdrag/schema";

const scehmaOptions: SchemaOptions = {
  propSchemas: [
    {
      componentName: "TextArea",
      "x-field": {
        name: "value",
        label: "$content",
      },
    }
  ],
}

export const schema: INodeSchema = createSchema(scehmaOptions)