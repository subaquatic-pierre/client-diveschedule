import { Icon } from "@iconify/react";
import { capitalCase } from "change-case";
import { useState } from "react";
import divingScubaFlag from "@iconify-icons/mdi/diving-scuba-flag";
import divingScubaTankMultiple from "@iconify-icons/mdi/diving-scuba-tank-multiple";
import roundVpnKey from "@iconify/icons-ic/round-vpn-key";
import roundAccountBox from "@iconify/icons-ic/round-account-box";
import rawaccesslogsIcon from "@iconify-icons/whh/rawaccesslogs";
import accountBoxMultiple from "@iconify-icons/mdi/account-box-multiple";
// material
import { Container, Tab, Box, Tabs } from "@material-ui/core";
import useAuth from "../../hooks/useAuth";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// components
import Page from "../../components/Page";
import HeaderDashboard from "../../components/HeaderDashboard";
import {
  AccountGeneral,
  AccountDiveLog,
  AccountChangePassword,
  AccountBuddies,
  AccountCertification,
  AccountEquipment,
} from "../../components/user/account";

// ----------------------------------------------------------------------

export default function UserAccount() {
  const [currentTab, setCurrentTab] = useState("general");
  const {
    user: { profile },
  } = useAuth();

  if (!profile) {
    return null;
  }

  const ACCOUNT_TABS = [
    {
      value: "general",
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <AccountGeneral />,
    },
    {
      value: "certifications",
      icon: <Icon icon={divingScubaFlag} width={20} height={20} />,
      component: <AccountCertification />,
    },
    {
      value: "equipment",
      icon: <Icon icon={divingScubaTankMultiple} width={20} height={20} />,
      component: <AccountEquipment />,
    },
    {
      value: "dive_buddies",
      icon: <Icon icon={accountBoxMultiple} width={20} height={20} />,
      component: <AccountBuddies />,
    },
    {
      value: "dive_log",
      icon: <Icon icon={rawaccesslogsIcon} width={20} height={20} />,
      component: <AccountDiveLog />,
    },
    {
      value: "change_password",
      icon: <Icon icon={roundVpnKey} width={20} height={20} />,
      component: <AccountChangePassword />,
    },
  ];

  return (
    <Page title="User: Account Settings | DiveSchedule">
      <Container>
        <HeaderDashboard
          heading="Account"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Users", href: PATH_DASHBOARD.user.list },
            { name: "Account Settings" },
          ]}
        />

        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => setCurrentTab(value)}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={capitalCase(tab.value)}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
