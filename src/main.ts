import { createApp } from 'vue'
import qdTodo from './qdTodo.vue'
import router from './router/index'
import store from './store/index'

const app = createApp(qdTodo);

app.use(router);
app.use(store);
app.mount('#qd-todo');
