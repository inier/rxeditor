import {HTMLNav} from "../../html/html-nav"

import {addonUtilPosition} from "../../schemas/utilities/position"
import {addonNavbarContextual} from "../../schemas/components/navbar/contextual"


export class BSNavbar extends HTMLNav{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsNavbar'
    this.toolboxInfo.elementName = "Navbar"
    this.className = 'BSNavbar'

    this.groups.navbarOptions = {
      label:'Navbar Options'
    }
    //this.editMarginStyle.padding = ''
    //this.editMarginStyle = {}
    this.label = 'navbar'

    this.acceptedChildren=''

    this.addClass('navbar')

    addonNavbarContextual(this)
    addonUtilPosition(this, 'navbarOptions')
  }

  make(){
    return new BSNavbar
  }

  metaToModel(model){
    //model.classList.push(this.$meta.baseClass)
    //model.attributes['aria-label'] = 'breadcrumb'
  }

  loadConfig(){
    //this.setField('badgeContextual', 'badge-primary')
    //this.setField('innerHTML', 'badge')
    return this
  }

}
