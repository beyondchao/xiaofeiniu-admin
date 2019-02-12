import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Main from '@/components/Main'
import NotFound from '@/components/NotFound'
import Setting from '@/components/Setting'
import Table from '@/components/table/Table'
import TableAdd from '@/components/table/Add'
import TableDelete from '@/components/table/Delete'
import Dish from '@/components/dish/Dish'
import AddDish from '@/components/dish/AddDish'
import DeleteDish from '@/components/dish/DeleteDish'
import UpdateDish from '@/components/dish/UpdateDish'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/login'},
    { path: '/login', component: Login},
    { path: '/main', component: Main, children: [
      {path: '/setting', component: Setting},
      {path: '/table/list', component: Table},
      {path: '/table/add', component: TableAdd},
      {path: '/table/delete', component: TableDelete},
      {path: '/dish/dish', component: Dish},
      {path: '/dish/addDish', component: AddDish},
      {path: '/dish/deleteDish', component: DeleteDish},
      {path: '/dish/updateDish', component: UpdateDish}
    ]},
    { path: '*', component: NotFound}
  ]
})
