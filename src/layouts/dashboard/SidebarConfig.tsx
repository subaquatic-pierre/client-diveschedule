// routes
import { PATH_DASHBOARD, PATH_AUTH } from "../../routes/paths";
// components
import SvgIconStyle from "../../components/SvgIconStyle";

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle
    src={`/static/icons/navbar/${name}.svg`}
    sx={{ width: 22, height: 22 }}
  />
);

const ICONS = {
  user: getIcon("ic_user"),
  schedule: getIcon("ic_page"),
  calendar: getIcon("ic_calendar"),
  dashboard: getIcon("ic_dashboard"),
  authenticator: getIcon("ic_authenticator"),
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "general",
    items: [
      {
        title: "home",
        href: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard,
      },
      {
        title: "schedule",
        href: PATH_DASHBOARD.schedule,
        icon: ICONS.schedule,
      },
      {
        title: "calendar",
        href: PATH_DASHBOARD.calendar,
        icon: ICONS.calendar,
      },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: "management",
    items: [
      {
        title: "user",
        icon: ICONS.user,
        href: PATH_DASHBOARD.user.root,
        items: [
          {
            title: "profile",
            href: PATH_DASHBOARD.user.profile,
          },
          {
            title: "cards",
            href: PATH_DASHBOARD.user.cards,
          },
          {
            title: "list",
            href: PATH_DASHBOARD.user.list,
          },
          {
            title: "account",
            href: PATH_DASHBOARD.user.account,
          },
        ],
      },
    ],
  },
  // PAGES
  // ----------------------------------------------------------------------
  {
    subheader: "pages",
    items: [
      {
        title: "auth",
        href: PATH_AUTH.loginUnprotected,
        icon: ICONS.authenticator,
        items: [
          {
            title: "login",
            href: PATH_AUTH.loginUnprotected,
          },
          {
            title: "register",
            href: PATH_AUTH.registerUnprotected,
          },
          {
            title: "reset password",
            href: PATH_AUTH.resetPassword,
          },
          {
            title: "verify code",
            href: PATH_AUTH.verify,
          },
        ],
      },
    ],
  },
];

export default sidebarConfig;
