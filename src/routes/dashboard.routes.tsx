import { lazy } from "react";
import { Redirect } from "react-router-dom";
import { PATH_DASHBOARD } from "./paths";
// guards
import AuthGuard from "../guards/AuthGuard";
// layouts
import DashboardLayout from "../layouts/dashboard";

// ----------------------------------------------------------------------

const DashboardRoutes = {
  path: PATH_DASHBOARD.root,
  guard: AuthGuard,
  layout: DashboardLayout,
  routes: [
    // GENERAL
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.general.app,
      component: lazy(() => import("../views/GeneralApp")),
    },
    {
      exact: true,
      path: PATH_DASHBOARD.root,
      component: () => <Redirect to={PATH_DASHBOARD.schedule} />,
    },
    // APP : CALENDAR
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.schedule,
      component: lazy(() => import("../views/schedule/Schedule")),
    },

    // MANAGEMENT : USER
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.user.list,
      component: lazy(() => import("../views/user/UserList")),
    },
    {
      exact: true,
      path: PATH_DASHBOARD.user.account,
      component: lazy(() => import("../views/user/UserAccount")),
    },
    {
      exact: true,
      path: PATH_DASHBOARD.user.create,
      component: lazy(() => import("../views/user/UserCreate")),
    },
    {
      exact: true,
      path: PATH_DASHBOARD.user.edit,
      component: lazy(() => import("../views/user/UserEdit")),
    },

    {
      component: () => <Redirect to="/404" />,
    },
  ],
};

export default DashboardRoutes;
