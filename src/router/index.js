import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
// import RenderRouterView from "../components/RenderRouterView.vue";
import NotFound from "../404.vue"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },

  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
    {
        path: "/user",
        // component: RenderRouterView,
        // component: {render
        //
        // h => h('router-view')},
        component: () =>
            import(/* webpackChunkName: "layout" */ "../layouts/UserLayout.vue"),
        children: [
            {
              path: "/",
              redirect: "/user/login"
            },
            {
                path: "user/login",
                name: "login",
                component:  () =>
                    import(/* webpackChunkName: "login" */ "../views/user/Login.vue"),
            },
            {
                path: "user/register",
                name: "register",
                component: () =>
                    import(/* webpackChunkName: "about" */ "../views/user/Register.vue"),
            }
        ]
    },
    {
        path: "/",
        component: () =>
            import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout.vue"),
        children: [
            //dashboard
            {
                path: "/",
                redirect: "/dashboard/analysis"
            },
            {
                path: "/dashboard",
                name: "dashboard",
                component: {render : h => h("router-view")},
                children:[
                    {
                        path: "/dashboard/analysis",
                        name: "analysis",
                        component: () =>
                            import(/* webpackChunkName: "dashboard" */ "../views/dashboard/Analysis.vue"),
                    }
                ]
            },
            //form
            {
                path: "/form",
                name: "form",
                component: {render: h => h("router-view")},
                children: [
                    {
                        path: "/form/basic-form",
                        name: "basicform",
                        component: () =>
                            import(/* webpackChunkName: "form" */ "../views/forms/BasicForm.vue"),
                    },
                    {
                        path: "/form/step-form",
                        name: "stepform",
                        component: () =>
                            import(/* webpackChunkName: "form" */ "../views/forms/stepForm"),
                    },
                    {
                        path: "/form/step-form",
                        redirect: "/form/step-form/info"
                    },
                    {
                        path: "/form/step-form/info",
                        name: "info",
                        component: () =>
                            import(/* webpackChunkName: "form" */ "../views/forms/stepForm/Step1"),
                    },
                    {
                        path: "/form/step-form/confirm",
                        name: "confirm",
                        component:() =>
                            import(/* webpackChunkName: "form" */ "../views/forms/stepForm/Step2"),
                    },
                    {
                        path: "/form/step-form/result",
                        name: "result",
                        component:() =>
                            import(/* webpackChunkName: "form" */ "../views/forms/stepForm/Step3"),

                    }
                ]

            }
        ]
    },
    {
      path: "/about",
      component:() =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
        path: "*",
        name: "404",
        component: NotFound
    }
];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next)=> {
    NProgress.start();
    next();
});
router.afterEach(()=>{
    NProgress.done()
})
export default router;
