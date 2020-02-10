import {BSElement} from "./bselement"

export class BSContainer extends BSElement{
  constructor() {
    super()
    this.toolboxInfo.elementName = "Container"
    this.className = 'BSContainer'
    this.heightDropMargin = 15;
    this.acceptedChildren=['BSRow','BSContainer', 'HTMLDiv']
  }

  make(){
    return new BSContainer
  }
  
  toViewModel(){
    let model = super.toViewModel()
    model.label.text = "Container"
    model.classList.push('container')
    return model
  }
}