import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../../baseSchema";

export const splitArraySchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
    {
      componentName: "FormItem",
      props: {
        label: "$outputPorts",
      },
      children: [
        {
          componentName: "PortsInput",
          "x-field": {
            name: "outPorts"
          },
          props: {
            title: "$configPorts",
            popoverTitle: "$outputPortsConfig",
            type: "output",
          }
        }
      ]
    },
  ],
}