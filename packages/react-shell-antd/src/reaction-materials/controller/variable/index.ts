import { setVariableIcon, listenVariableIcon, variableIcon } from "@rxdrag/react-shared"
import { IReactionMaterial, ReactionType } from "@rxdrag/schema"
import { createUuid } from "@rxdrag/shared"
import { ListenVariable } from "./ListenVariableReaction"
import { ReadVariable } from "./ReadVariableReaction"
import { variableSchema } from "./schema"
import { IVariableConfig, SetVariable } from "./SetVariableReaction"

export const setVariableMaterial: IReactionMaterial = {
  name: "setVariable",
  icon: setVariableIcon,
  label: "$setVariable",
  reactionType: ReactionType.ControllerDefaultReaction,
  meta: {
    inPorts: [
      {
        id: createUuid(),
        name: "input",
        label: "",//"$startUp",
      },
    ],
  },
  schema: variableSchema,
  subTitle: (config?: IVariableConfig) => {
    return config?.variable
  },
  reaction: SetVariable,
}

export const listenVariableMaterial: IReactionMaterial = {
  name: "listenVariable",
  icon: listenVariableIcon,
  label: "$listenVariable",
  reactionType: ReactionType.ControllerDefaultReaction,
  meta: {
    outPorts: [
      {
        id: createUuid(),
        name: "output",
        label: "",//"$startUp",
      },
    ],
  },
  schema: variableSchema,
  subTitle: (config?: IVariableConfig) => {
    return config?.variable
  },
  reaction: ListenVariable,
}


export const readVariableMaterial: IReactionMaterial = {
  name: "readVariable",
  icon: variableIcon,
  label: "$readVariable",
  reactionType: ReactionType.ControllerDefaultReaction,
  meta: {
    inPorts: [
      {
        id: createUuid(),
        name: "input",
        label: "",
      },
    ],
    outPorts: [
      {
        id: createUuid(),
        name: "output",
        label: "",
      },
    ],
  },
  schema: variableSchema,
  subTitle: (config?: IVariableConfig) => {
    return config?.variable
  },
  reaction: ReadVariable,
}
