/**
 * Created by clude on 3/16/17.
 */
const test = resolve => require(['../page/test.vue'], resolve);

let routes = [
  {
    path: '/test',
    component: test,
    name: '',
    hidden: true
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   name: '',
  //   children: [
  //     {path: '/home', component: Dashboard, name: '首页', hidden: true}
  //   ]
  // },
  // {
  //   path: '/404',
  //   component: NotFound,
  //   name: '',
  //   hidden: true
  // }
];

export default routes;
