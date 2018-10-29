/**
 * Created by clude on 3/16/17.
 */
const Home = resolve => require(["../page/home.vue"], resolve);
const Layout = resolve => require(["../layout/container.vue"], resolve);

let routes = [

    {
        path: "/",
        component: Layout,
        name: "",
        children: [
            {path: "/home", component: Home, name: "首页", hidden: true}
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
