import Dashboard from "views/Dashboard";
import Notifications from "views/Notifications";
// import UserProfile from "views/UserProfile.jsx";

var routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/"
  },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "tim-icons icon-single-02",
  //   component: UserProfile,
  //   layout: "/admin"
  // }
];
export default routes;
