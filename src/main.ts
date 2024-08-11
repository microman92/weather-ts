import '@/assets/styles/style.scss';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Inplace from 'primevue/inplace';
import Badge from 'primevue/badge';
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Drawer from 'primevue/drawer';


import App from './App.vue'

const app = createApp(App)

app.component('app-Badge', Badge)
app.component('app-Inplace', Inplace)
app.component('app-Menubar', Menubar)
app.component('app-InputText', InputText)
app.component('app-Button', Button)
app.component('app-Card', Card)
app.component('app-Toast', Toast)
app.component('app-Drawer', Drawer)



app.use(createPinia())
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.use(ToastService);
app.mount('#app')
