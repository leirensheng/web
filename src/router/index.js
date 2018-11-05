import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";



Vue.use(VueRouter);


var router = new VueRouter({
    mode: "hash",
    routes: routes
});


router.beforeEach((to, from, next) => {
    if(to.path==="/"){
        next({path:"/home"});
    }else{
        next();
    }
});

export default router;
