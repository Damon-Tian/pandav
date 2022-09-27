import Vue from "vue"
import dataV from "@jiaminghi/data-view"
import {
  Menu,
  MenuItem,
  Scrollbar,
  DatePicker,
  Image,
  Table,
  TableColumn,
  Icon
} from "element-ui"
import InfoBlock from "@/components/pageInfo/infoBlock.vue"
Vue.component("InfoBlock", InfoBlock)

Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Image)
Vue.use(DatePicker)
Vue.use(Scrollbar)
Vue.use(dataV)
Vue.use(Icon)
