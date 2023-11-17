import Vue from 'vue'
import {
  FormModel,
  Input,
  Button,
  message,
  Modal,
  notification,
  Layout
} from 'ant-design-vue'

Vue.use(FormModel)
Vue.use(Input)
Vue.use(Button)
Vue.use(Modal)
Vue.use(Layout)

Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning