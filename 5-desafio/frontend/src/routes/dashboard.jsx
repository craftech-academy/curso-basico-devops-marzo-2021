import DashboardPage from "../views/Dashboard/DashboardPage";
import TablePage from "../views/RequestsLoan/TablePage";

const dashboardRoutes = [

    {
        path: "/solicitudes",
        sidebarName: "Solicitudes",
        navbarName: "Material Dashboard",
        icon: 'table',
        component: TablePage
    },
    {
        path: "/",
        sidebarName: "Dashboard",
        navbarName: "Material Dashboard",
        icon: 'dashboard',
        component: DashboardPage
    },
    { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
