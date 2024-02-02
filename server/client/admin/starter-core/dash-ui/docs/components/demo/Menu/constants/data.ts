import { SubMenu } from "../../../../../src/components/Menu/SubMenu/types";
import { NavMenuDataInterface } from "../../../../../src/components/Menu/NavMenu/types";

export const briefcaseIcon: string =
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon">\n' +
    '    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
    '    <rect id="bound" x="0" y="0" width="24" height="24" />\n' +
    '    <path d="M5.84026576,8 L18.1597342,8 C19.1999115,8 20.0664437,8.79732479 20.1528258,9.83390904 L20.8194924,17.833909 C20.9112219,18.9346631 20.0932459,19.901362 18.9924919,19.9930915 C18.9372479,19.9976952 18.8818364,20 18.8264009,20 L5.1735991,20 C4.0690296,20 3.1735991,19.1045695 3.1735991,18 C3.1735991,17.9445645 3.17590391,17.889153 3.18050758,17.833909 L3.84717425,9.83390904 C3.93355627,8.79732479 4.80008849,8 5.84026576,8 Z M10.5,10 C10.2238576,10 10,10.2238576 10,10.5 L10,11.5 C10,11.7761424 10.2238576,12 10.5,12 L13.5,12 C13.7761424,12 14,11.7761424 14,11.5 L14,10.5 C14,10.2238576 13.7761424,10 13.5,10 L10.5,10 Z" id="Combined-Shape" fill="#000000" />\n' +
    '    <path d="M10,8 L8,8 L8,7 C8,5.34314575 9.34314575,4 11,4 L13,4 C14.6568542,4 16,5.34314575 16,7 L16,8 L14,8 L14,7 C14,6.44771525 13.5522847,6 13,6 L11,6 C10.4477153,6 10,6.44771525 10,7 L10,8 Z" id="Path-53" fill="#000000" fill-rule="nonzero" opacity="0.3" />\n' +
    "      </g>\n" +
    "      </svg>";

const pagesItems: SubMenu = {
    listStyle: "icons",
    stickToSide: "left",
    items: [
        {
            label: "My Account",
            route: "demo1/index.html",
            icon: briefcaseIcon,
        },
        {
            label: "Task Manager",
            icon: briefcaseIcon,
            route: "#",
            badge: {
                theme: "success",
                label: "2",
            },
        },
        {
            label: "Team Manager",
            icon: briefcaseIcon,
            route: "#",
        },
        {
            label: "Projects manager",
            icon: briefcaseIcon,
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
            icon: briefcaseIcon,
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
            icon: briefcaseIcon,
        },
        {
            label: "Social Presence",
            icon: briefcaseIcon,
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
            icon: briefcaseIcon,
            route: "#",
        },
        {
            label: "Campaigns",
            icon: briefcaseIcon,
            route: "#",
            badge: {
                theme: "success",
                label: "3",
            },
        },
        {
            label: "Deployment Center",
            icon: briefcaseIcon,
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
                        icon: briefcaseIcon,
                        route: "#",
                    },
                    {
                        label: "Pending tasks",
                        icon: briefcaseIcon,
                        route: "#",
                    },
                    {
                        label: "Urgent tasks",
                        icon: briefcaseIcon,
                        route: "#",
                    },
                    {
                        label: "Failed tasks",
                        icon: briefcaseIcon,
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
        {
            label: "Mega menu",
            route: "#",
            submenu: {
                ...featuresItems,
                isMegaMenu: true
            },
        },
    ],
};
