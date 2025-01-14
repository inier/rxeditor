import { INodeSchema } from "@rxdrag/schema";
import { createFieldSchema } from "./createFieldSchema";
import { SchemaOptions } from "./SchemaOptions";
import { transPropSchemas } from "./transPropSchemas";
import { transSlotSchemas } from "./transSlotSchemas";

export function createSchema(options: SchemaOptions = {}): INodeSchema {
  const { propSchemas, slotSchemas, field } = options

  const propsSchemaBlock = propSchemas ? transPropSchemas(propSchemas) : []

  const slotSchemaBlock = slotSchemas ? transSlotSchemas(slotSchemas) : []

  const propsTab = propsSchemaBlock.length || slotSchemaBlock.length
    ? [{
      componentName: "TabPanel",
      props: {
        title: "$properties",
        key: "props",
      },
      children: [...propsSchemaBlock, ...slotSchemaBlock]
    }]
    : [];

  const reactionTab = [{
    componentName: "TabPanel",
    props: {
      title: "$reaction",
      key: "reaction"
    },
    children: [
      {
        componentName: "ControllerSetter",
        "x-field": {
          name: "x-controller",
        },
      }
    ]
  }];


  const fieldTab = field?.hasField ? [
    {
      componentName: "TabPanel",
      props: {
        title: "$field",
        key: "data",
        isField: true,
      },
      children: createFieldSchema(field)
    }] : []

  return {
    componentName: "Tabs",
    props: {},
    children: [
      ...propsTab,
      styleTab,
      ...fieldTab,
      ...reactionTab
    ]
  }
}
const styleTab = {
  componentName: 'TabPanel',
  props: {
    title: '$style',
    key: "style",
  },
  children: [
    {
      componentName: 'StyleSetter',
      'x-field': {
        name: 'props.style',
      }
    }
  ]
};

