import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { PATH_DASHBOARD } from './paths';
// guards
import AuthGuard from '../guards/AuthGuard';
// layouts
import DashboardLayout from '../layouts/dashboard';

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
      component: lazy(() => import('../views/GeneralApp'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.general.ecommerce,
      component: lazy(() => import('../views/GeneralEcommerce'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.general.analytics,
      component: lazy(() => import('../views/GeneralAnalytics'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.root,
      component: () => <Redirect to={PATH_DASHBOARD.general.app} />
    },

    // MANAGEMENT : E-COMMERCE
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.eCommerce.shop,
      component: lazy(() => import('../views/EcommerceShop'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.eCommerce.product,
      component: lazy(() => import('../views/EcommerceProductDetails'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.eCommerce.list,
      component: lazy(() => import('../views/EcommerceProductList'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.eCommerce.checkout,
      component: lazy(() => import('../views/EcommerceCheckout'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.eCommerce.invoice,
      component: lazy(() => import('../views/EcommerceInvoice'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.eCommerce.root,
      component: () => <Redirect to={PATH_DASHBOARD.eCommerce.shop} />
    },

    // MANAGEMENT : BLOG
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.blog.root,
      component: lazy(() => import('../views/BlogPosts'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.blog.post,
      component: lazy(() => import('../views/BlogPost'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.blog.newPost,
      component: lazy(() => import('../views/BlogNewPost'))
    },

    // MANAGEMENT : USER
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.user.profile,
      component: lazy(() => import('../views/UserProfile'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.user.cards,
      component: lazy(() => import('../views/UserCards'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.user.list,
      component: lazy(() => import('../views/UserList'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.user.account,
      component: lazy(() => import('../views/UserAccount'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.user.root,
      component: () => <Redirect to={PATH_DASHBOARD.user.profile} />
    },

    // APP : CHAT
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.chat.conversation,
      component: lazy(() => import('../views/Chat'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.chat.root,
      component: () => <Redirect to={PATH_DASHBOARD.chat.new} />
    },

    // APP : MAIL
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.mail.labels,
      component: lazy(() => import('../views/Mail'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.mail.root,
      component: () => <Redirect to={PATH_DASHBOARD.mail.all} />
    },

    // APP : CALENDAR
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.calendar,
      component: lazy(() => import('../views/Calendar'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.extraComponents,
      component: () => <Redirect to={PATH_DASHBOARD.components.chart} />
    },

    // ----------------------------------------------------------------------

    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default DashboardRoutes;
