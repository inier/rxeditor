import { SchemaOptions, createSchema } from "@rxdrag/react-antd-materials";
import { INodeSchema } from "@rxdrag/schema";

const scehmaOptions: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Radio.Group",
      props: {
        optionType: "button",
        size: "small",
        options: [
          {
            label: "$dark",
            value: "dark"
          },
          {
            label: "$light",
            value: "light"
          },
        ],
        defaultValue: "dark",
      },

      "x-field": {
        label: "$themeMode",
        name: "themeMode",
      }
    },
    {
      componentName: "ThemeTokenSetter",
      props: {
      },
      "x-field": {
        label: "$themeColor",
        name: "token",
      }
    },
    {
      componentName: "ImageSelect",
      "x-field": {
        label: "$backgroundImage",
        name: "backgroundImage",
      }
    },
  ],
}

export const schema: INodeSchema = createSchema(scehmaOptions)