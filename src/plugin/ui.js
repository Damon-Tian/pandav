import Vue from "vue"
import dataV from "@jiaminghi/data-view"
import countTo from 'vue-count-to';
import {
  Menu,
  MenuItem,
  Scrollbar,
  DatePicker,
  Image,
  Table,
  TableColumn,
  Icon,
  Slider,
  Form,
  FormItem,
  Input,
  Checkbox,
  CheckboxGroup,
  Button,
  Link,
  Popover,
  Tree
} from "element-ui"
import InfoBlock from "@/components/pageInfo/infoBlock.vue"
Vue.component("InfoBlock", InfoBlock)
Vue.component("countTo", countTo)

Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Image)
Vue.use(DatePicker)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Input)
Vue.use(Button)
Vue.use(Link)
Vue.use(Slider)
Vue.use(Popover)
Vue.use(Scrollbar)
Vue.use(dataV)
Vue.use(Icon)
Vue.use(Tree)
