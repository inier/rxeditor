import { IRxDragLocalesManager } from "@rxdrag/locales"
import { IDocumentSchema } from "@rxdrag/schema"
import { IDocument } from "./document"
import { IDesignerShell } from "./shell"
import { IMonitor } from "./monitor"
import { IResourceManager } from "./resource"
import { ID } from "./types"
import { IAction, IActions } from "./action"
import { IComponentConfig, IComponentManager } from "./material"
import { IPlugin, IPluginFactory } from "./plugin"
import { IDecoratorManager } from "./decorator"
import { ISetterManager } from "./setter"
import { IBehaviorManager, INodeBehavior } from "./behavior"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IDesignerEngine<ComponentType = any, IconType = any> {
	getLanguage(): string
	setLanguage(lang: string): void
	setSelectionMode(mode: SelectionMode): void
	createDocument(schema: IDocumentSchema): IDocument,
	getDocument(id: ID): IDocument | null,
	getNodeDocument(nodeId: ID): IDocument | null,
	getAllDocuments(): IDocument[] | null
	clearDocuments(): void
	removeDocument(id: ID): void

	getMonitor(): IMonitor
	getShell(): IDesignerShell
	getComponentManager(): IComponentManager<ComponentType>
	getBehaviorManager(): IBehaviorManager
	getResourceManager(): IResourceManager<IconType>
	getSetterManager(): ISetterManager<ComponentType>
	getLocalesManager(): IRxDragLocalesManager
	getDecoratorManager(): IDecoratorManager
	getActions(): IActions

	registerPlugin(pluginFactory: IPluginFactory): void
	getPlugin(name: string): IPlugin | null

	dispatch(action: IAction<unknown>): void
	destroy(): void

	registerMaterials(materials: IComponentConfig<ComponentType, IconType>[]): void,
}
