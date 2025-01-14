import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../../baseSchema";

export const loopSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
    {
      componentName: "FormItem",
      props: {
        label: "$fromInput",
      },
      children: [
        {
          componentName: "Switch",
          "x-field": {
            name: "config.fromInput"
          },
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$times",
      },
      children: [
        {
          componentName: "InputNumber",
          "x-field": {
            name: "config.times"
          },
        }
      ]
    },
  ],
}