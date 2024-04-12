import type { SubMenu } from "@starter-core/dash-ui/dist/components/Menu/SubMenu/types";
import type { NavMenuDataInterface } from "@starter-core/dash-ui/dist/components/Menu/NavMenu/types";
import { IconArchive, IconATM, IconBatteryhalf } from "@starter-core/icons";

const pagesItems: SubMenu = {
  listStyle: "icons",
  stickToSide: "left",
  items: [
    {
      label: "My Account",
      route: "demo1/index.html",
      icon: IconArchive,
    },
    {
      label: "Task Manager",
      icon: IconArchive,
      route: "#",
      badge: {
        theme: "success",
        label: "2",
      },
    },
    {
      label: "Team Manager",
      icon: IconArchive,
      route: "#",
    },
    {
      label: "Projects manager",
      icon: IconArchive,
      route: "#",
      submenu: {
        listStyle: "dot",
        stickToSide: "right",
        items: [
          {
            label: "Add Team Member",
            route: "#",
          },
          {
            label: "Edit Team Member",
            route: "#",
          },
          {
            label: "Delete Team Member",
            route: "#",
          },
          {
            label: "Team Member Reports",
            route: "#",
          },
          {
            label: "Assign Tasks",
            route: "#",
          },
        ],
      },
    },
    {
      label: "Create New Project",
      icon: IconArchive,
      route: "demo2/index.html",
    },
  ],
};

const appsItems: SubMenu = {
  listStyle: "icons",
  stickToSide: "left",
  items: [
    {
      label: "Reporting",
      route: "demo2/index.html",
      icon: IconArchive,
    },
    {
      label: "Social Presence",
      icon: IconArchive,
      route: "#",
      submenu: {
        listStyle: "dot",
        stickToSide: "right",
        items: [
          {
            label: "Reached Users",
            route: "#",
          },
          {
            label: "SEO Ranking",
            route: "#",
          },
          {
            label: "User Dropout Points",
            route: "#",
          },
          {
            label: "Market Segments",
            route: "#",
          },
          {
            label: "Opportunity Growth",
            route: "#",
          },
        ],
      },
    },
    {
      label: "Sales & Marketing",
      icon: IconArchive,
      route: "#",
    },
    {
      label: "Campaigns",
      icon: IconArchive,
      route: "#",
      badge: {
        theme: "success",
        label: "3",
      },
    },
    {
      label: "Deployment Center",
      icon: IconArchive,
      route: "demo2/index.html",
      submenu: {
        listStyle: "line",
        stickToSide: "right",
        items: [
          {
            label: "Merge Branch",
            route: "#",
          },
          {
            label: "Version Controls",
            route: "#",
          },
          {
            label: "Database Manager",
            route: "#",
          },
          {
            label: "System Settings",
            route: "#",
          },
        ],
      },
    },
  ],
};

const featuresItems: SubMenu = {
  listStyle: "dot",
  stickToSide: "left",
  isExpanded: true,
  items: [
    {
      label: "Task reports",
      route: "#",
      submenu: {
        listStyle: "icons",
        stickToSide: "right",
        items: [
          {
            label: "Latest task",
            icon: IconArchive,
            route: "#",
          },
          {
            label: "Pending tasks",
            icon: IconATM,
            route: "#",
          },
          {
            label: "Urgent tasks",
            icon: IconBatteryhalf,
            route: "#",
          },
          {
            label: "Failed tasks",
            icon: IconATM,
            route: "#",
          },
        ],
      },
    },
    {
      label: "Profit margins",
      route: "#",
      submenu: {
        listStyle: "line",
        stickToSide: "right",
        items: [
          {
            label: "Overall Profits",
            route: "#",
          },
          {
            label: "Gross Profits",
            route: "#",
          },
          {
            label: "Nett Profits",
            route: "#",
          },
          {
            label: "Year to Date Reports",
            route: "#",
          },
          {
            label: "Quarterly Profits",
            route: "#",
          },
          {
            label: "Monthly Profits",
            route: "#",
          },
        ],
      },
    },
    {
      label: "Staff management",
      route: "#",
      submenu: {
        listStyle: "dot",
        stickToSide: "right",
        items: [
          {
            label: "Top Management",
            route: "#",
          },
          {
            label: "Project Managers",
            route: "#",
          },
          {
            label: "Development Staff",
            route: "#",
          },
          {
            label: "Customer Service",
            route: "#",
          },
          {
            label: "Sales and Marketing",
            route: "#",
          },
          {
            label: "Executives",
            route: "#",
          },
        ],
      },
    },
    {
      label: "Tools",
      route: "#",
      submenu: {
        stickToSide: "right",
        items: [
          {
            label: "Analytical Reports",
            route: "#",
          },
          {
            label: "Customer CRM",
            route: "#",
          },
          {
            label: "Operational Growth",
            route: "#",
          },
          {
            label: "Social Media Presence",
            route: "#",
          },
          {
            label: "Files and Directories",
            route: "#",
          },
          {
            label: "Audit & Logs",
            route: "#",
          },
        ],
      },
    },
  ],
};

export const navMenu: NavMenuDataInterface = {
  theme: "classic",
  listStyle: "dot",
  items: [
    {
      label: "Pages",
      route: "#",
      submenu: pagesItems,
    },
    {
      label: "Apps",
      route: "#",
      submenu: appsItems,
    },
    {
      label: "Features",
      route: "#",
      submenu: featuresItems,
    },
  ],
};
