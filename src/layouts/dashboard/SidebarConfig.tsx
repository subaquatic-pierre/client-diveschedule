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
      // {
      //   title: "home",
      //   href: PATH_DASHBOARD.general.app,
      //   icon: ICONS.dashboard,
      // },
      {
        title: "schedule",
        href: PATH_DASHBOARD.schedule,
        icon: ICONS.schedule,
      },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: "management",
    items: [
      {
        title: "users",
        icon: ICONS.user,
        href: PATH_DASHBOARD.user.root,
        items: [
          {
            title: "all users",
            href: PATH_DASHBOARD.user.list,
          },
          {
            title: "create user",
            href: PATH_DASHBOARD.user.create,
          },
        ],
      },
    ],
  },
];

export default sidebarConfig;
