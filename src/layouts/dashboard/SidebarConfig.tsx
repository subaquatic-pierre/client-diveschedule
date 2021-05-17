// routes
import { PATH_DASHBOARD, PATH_PAGE, PATH_AUTH } from "../../routes/paths";
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
  map: getIcon("ic_map"),
  blog: getIcon("ic_blog"),
  cart: getIcon("ic_cart"),
  chat: getIcon("ic_chat"),
  mail: getIcon("ic_mail"),
  page: getIcon("ic_page"),
  user: getIcon("ic_user"),
  copy: getIcon("ic_copy"),
  error: getIcon("ic_error"),
  charts: getIcon("ic_charts"),
  editor: getIcon("ic_editor"),
  upload: getIcon("ic_upload"),
  animate: getIcon("ic_animate"),
  calendar: getIcon("ic_calendar"),
  elements: getIcon("ic_elements"),
  carousel: getIcon("ic_carousel"),
  language: getIcon("ic_language"),
  ecommerce: getIcon("ic_ecommerce"),
  analytics: getIcon("ic_analytics"),
  dashboard: getIcon("ic_dashboard"),
  components: getIcon("ic_components"),
  authenticator: getIcon("ic_authenticator"),
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "general",
    items: [
      {
        title: "schedule",
        href: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard,
      },
      {
        title: "calendar",
        href: PATH_DASHBOARD.general.calendar,
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
];

export default sidebarConfig;
