import Login from "../views/Login";
import Wait from "../views/Wait";
import Enter from "../views/Enter";
import Test from "../views/Test";
import Submit from "../views/Submit";

const routes = [
    {
        path: "/",
        redirect: "/enter"
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/wait",
        component: Wait,
    },
    {
        path: "/wait/:id",
        component: Wait,
    },
    {
        path: "/enter",
        component: Enter,
    },
    {
        path: "/test",
        component: Test,
    },
    {
        path: "/submit",
        component: Submit,
    },
];

export default routes;