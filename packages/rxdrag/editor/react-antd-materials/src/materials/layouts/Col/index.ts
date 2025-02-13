
import { IMaterial } from "@rxdrag/react-core";
import { Col as AntdCol } from "antd";
import { colIcon } from "./icon";
import { colLocales, colResourceLocales } from "./locales";
import { rowSchema } from "./schema";

export const ColMaterial: IMaterial = {
  componentName: "Col",
  component: AntdCol,
  designer: AntdCol,
  designerLocales: colLocales,
  propsSchema: rowSchema,
  resource: {
    name: "Col",
    icon: colIcon,
    color: "#dfa324",
    resourceLocales: colResourceLocales,
    elements: [
      {
        componentName: "Col",
        props: {
          span: 6
        }
      }
    ]
  },

  behaviorRule: {
    droppable: true,
  }
}
