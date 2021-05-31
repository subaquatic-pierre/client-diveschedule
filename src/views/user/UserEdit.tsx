import { Icon } from "@iconify/react";
import { useParams } from "react-router-dom";
import { capitalCase } from "change-case";
import { useState } from "react";
import plusFill from "@iconify/icons-eva/plus-fill";
import divingScubaFlag from "@iconify-icons/mdi/diving-scuba-flag";
import roundVpnKey from "@iconify/icons-ic/round-vpn-key";
import roundAccountBox from "@iconify/icons-ic/round-account-box";
import rawaccesslogsIcon from "@iconify-icons/whh/rawaccesslogs";
import divingScubaTankMultiple from "@iconify-icons/mdi/diving-scuba-tank-multiple";
import accountBoxMultiple from "@iconify-icons/mdi/account-box-multiple";
// material
import { Container, Tab, Box, Tabs, Button } from "@material-ui/core";

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
  const { id } = useParams() as { id: string };

  const ACCOUNT_TABS = [
    {
      value: "general",
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <AccountGeneral mode="edit" userIdProp={id} />,
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
    <Page title="User: Edit | DiveSchedule">
      <Container>
        <HeaderDashboard
          heading="Edit User"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Users", href: PATH_DASHBOARD.user.list },
            { name: "Edit" },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Icon icon={plusFill} width={20} height={20} />}
              href={PATH_DASHBOARD.user.create}
            >
              New User
            </Button>
          }
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
