interface SidebarStates {
  minimized: boolean;
  minimizeHover: boolean;
  minimizing: boolean;
}

export interface BodyClasses {
    modalOpen: boolean;
    navMenuOpen: boolean;
    navSearchActive: boolean;
    isBodyOverflowing: boolean;
    scrollBarWidth: number;
}

export interface RootState {
    appName: string;
    backUrl: string;
    csrfToken: string;
    mainMenu: Array<any>;
    menu: Array<any>;
    activeClasses: any;
    homePath: string;
    frontActiveClass: any;
    bodyClasses: BodyClasses;
    sidebarState: SidebarStates;
}

export interface SetActiveClassesPayload {
    main: string;
    sub: string;
    title: string;
    hasFilters?: string;
}
