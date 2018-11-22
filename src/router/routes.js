/**
 * Created by clude on 3/16/17.
 */
const Home = resolve => require(["../page/home.vue"], resolve);
const Layout = resolve => require(["../layout/container.vue"], resolve);
const Shop = resolve => require(["../page/shop.vue"], resolve);
const Taobao = resolve => require(["../page/taobao.vue"], resolve);

let routes = [

    {
        path: "/",
        component: Layout,
        name: "",
        children: [
            {path: "/home", component: Home, name: "首页", hidden: true},
            {path: "/shop", component: Shop, name: "商品", hidden: true},
            {path: "/taobao", component: Taobao, name: "淘宝", hidden: true}
        ]
    },
    // {
    //   path: '/404',
    //   component: NotFound,
    //   name: '',
    //   hidden: true
    // }
];

export default routes;
