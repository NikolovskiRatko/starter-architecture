import { SkButtonProps } from "@/components/base/SkButton/types";

interface SkButtonDemo extends SkButtonProps {
  label: string;
}

interface ButtonsSection {
  title: string;
  buttons: Array<SkButtonDemo>;
}
interface ButtonsGroup {
  title: string;
  sections: Array<ButtonsSection>;
}
type ButtonsColumn = Array<ButtonsGroup>;
type Buttons = ButtonsColumn[];

// Basic buttons
const bootstrapButtons: ButtonsSection = {
  title: "Bootstrap buttons",
  buttons: [
    {
      theme: "primary",
      label: "Primary",
    },
    {
      theme: "secondary",
      label: "Secondary",
    },
    {
      theme: "success",
      label: "Success",
    },
    {
      theme: "info",
      label: "Info",
    },
    {
      theme: "warning",
      label: "Warning",
    },
    {
      theme: "danger",
      label: "Danger",
    },
    {
      theme: "link",
      label: "Link",
    },
  ],
};
const supportedHtmlElements: ButtonsSection = {
  title:
    "The <code>.btn</code> classes are designed to be used with <code>&lt;button&gt;</code>, <code>&lt;a&gt;</code> and <code>&lt;input&gt;</code> elements.",
  buttons: [
    {
      theme: "primary",
      type: "link",
      label: "External link",
      linkProps: { to: "http://www.google.com/" },
    },
    {
      theme: "success",
      type: "submit",
      label: "Submit",
    },
    {
      theme: "dark",
      type: "link",
      label: "Dark link",
      linkProps: { to: "http://www.google.com/" },
    },
    {
      theme: "brand",
      type: "link",
      label: "Router link",
      linkProps: { to: { name: "dashboard" } },
    },
  ],
};
const buttonsStates: ButtonsSection = {
  title: "Buttons states",
  buttons: [
    {
      theme: "brand",
      label: "Active",
      state: "active",
    },
    {
      theme: "dark",
      label: "Active",
      state: "active",
    },
    {
      theme: "primary",
      label: "Disabled",
      state: "disabled",
    },
    {
      theme: "success",
      label: "Disabled",
      state: "disabled",
    },
  ],
};
const customButtons: ButtonsSection = {
  title: "Custom buttons",
  buttons: [
    {
      theme: "brand",
      label: "Brand",
    },
    {
      theme: "dark",
      label: "Dark",
    },
    {
      theme: "light",
      label: "Light",
    },
  ],
};
const baseButtons: ButtonsSection = {
  title: "Base buttons",
  buttons: [
    {
      theme: "brand",
      label: "Brand",
    },
    {
      theme: "default",
      label: "Button",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    {
      theme: "clean",
      label: "Button",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    {
      label: "Button",
      theme: "default",
      fontWeight: "bold",
      textTransform: "uppercase",
      size: "sm",
    },
    {
      label: "Button",
      theme: "clean",
      fontWeight: "bold",
      textTransform: "uppercase",
      size: "sm",
    },
  ],
};

// Outlined buttons
const defaultOutline: ButtonsSection = {
  title: "Default outline buttons",
  buttons: [
    {
      theme: "primary",
      label: "Primary",
      themeMod: "outline",
    },
    {
      theme: "secondary",
      label: "Secondary",
      themeMod: "outline",
    },
    {
      theme: "success",
      label: "Success",
      themeMod: "outline",
    },
    {
      theme: "info",
      label: "Info",
      themeMod: "outline",
    },
    {
      theme: "warning",
      label: "Warning",
      themeMod: "outline",
    },
    {
      theme: "danger",
      label: "Danger",
      themeMod: "outline",
    },
    {
      theme: "brand",
      label: "Brand",
      themeMod: "outline",
    },
  ],
};
const hoverOutline: ButtonsSection = {
  title: "Hover outline buttons",
  buttons: [
    {
      theme: "primary",
      label: "Primary",
      themeMod: "outline-hover",
    },
    {
      theme: "secondary",
      label: "Secondary",
      themeMod: "outline-hover",
    },
    {
      theme: "success",
      label: "Success",
      themeMod: "outline-hover",
    },
    {
      theme: "info",
      label: "Info",
      themeMod: "outline-hover",
    },
    {
      theme: "warning",
      label: "Warning",
      themeMod: "outline-hover",
    },
    {
      theme: "danger",
      label: "Danger",
      themeMod: "outline-hover",
    },
    {
      theme: "brand",
      label: "Brand",
      themeMod: "outline-hover",
    },
    {
      theme: "dark",
      label: "Dark",
      themeMod: "outline-hover",
    },
  ],
};

// Button customization
const largeButtons: ButtonsSection = {
  title: "Large buttons",
  buttons: [
    {
      label: "Primary",
      theme: "primary",
      size: "lg",
    },
    {
      label: "Secondary",
      theme: "secondary",
      size: "lg",
    },
    {
      label: "Success",
      theme: "success",
      size: "lg",
    },
  ],
};
const smallButtons: ButtonsSection = {
  title: "Small buttons",
  buttons: [
    {
      label: "Primary",
      theme: "primary",
      size: "sm",
    },
    {
      label: "Secondary",
      theme: "secondary",
      size: "sm",
    },
    {
      label: "Success",
      theme: "success",
      size: "sm",
    },
    {
      label: "Info",
      theme: "info",
      size: "sm",
    },
    {
      label: "Warning",
      theme: "warning",
      size: "sm",
    },
    {
      label: "Danger",
      theme: "danger",
      size: "sm",
    },
  ],
};
const fontSettings: ButtonsSection = {
  title: "Font settings",
  buttons: [
    {
      label: "Large font",
      theme: "info",
      fontSize: "lg",
    },
    {
      label: "Small font",
      theme: "success",
      fontSize: "sm",
    },
    {
      label: "Uppercase",
      theme: "primary",
      textTransform: "uppercase",
    },
    {
      label: "Lowercase",
      theme: "secondary",
      textTransform: "lowercase",
    },
  ],
};
const wideButtons: ButtonsSection = {
  title: "Wide buttons",
  buttons: [
    {
      label: "Wide button",
      theme: "primary",
      isWide: true,
    },
    {
      label: "Wider button",
      theme: "secondary",
      isWide: true,
    },
    {
      label: "Widest button",
      theme: "success",
      isWide: true,
    },
  ],
};
const tallButtons: ButtonsSection = {
  title: "Tall buttons",
  buttons: [
    {
      label: "Tall button",
      theme: "primary",
      height: "tall",
    },
    {
      label: "Taller button",
      theme: "secondary",
      height: "taller",
    },
    {
      label: "Tallest button",
      theme: "success",
      height: "tallest",
    },
  ],
};

// Elevated buttons
const defaultElevated: ButtonsSection = {
  title: "Default elevated",
  buttons: [
    {
      label: "Light",
      theme: "light",
      elevate: "elevate",
    },
    {
      label: "Brand",
      theme: "brand",
      elevate: "elevate",
    },
    {
      label: "Success",
      theme: "success",
      elevate: "elevate",
    },
    {
      label: "Info",
      theme: "info",
      elevate: "elevate",
    },
    {
      label: "Danger",
      theme: "danger",
      elevate: "elevate",
    },
    {
      label: "Dark",
      theme: "dark",
      elevate: "elevate",
    },
  ],
};
const pillElevated: ButtonsSection = {
  title: "Default elevated",
  buttons: defaultElevated.buttons.map((button) => ({
    ...button,
    isPill: true,
  })),
};
const smallPillElevated: ButtonsSection = {
  title: "Default elevated",
  buttons: pillElevated.buttons.map((button) => ({
    ...button,
    size: "sm",
  })),
};
const hoverElevated: ButtonsSection = {
  title: "Hover elevated",
  buttons: defaultElevated.buttons.map((button) => ({
    ...button,
    elevate: "elevate-air",
  })),
};
const pillHoverElevated: ButtonsSection = {
  title: "Pill hover elevated",
  buttons: hoverElevated.buttons.map((button) => ({
    ...button,
    isPill: true,
  })),
};
const smallPillHoverElevated: ButtonsSection = {
  title: "Small hover elevated",
  buttons: pillHoverElevated.buttons.map((button) => ({
    ...button,
    isPill: true,
  })),
};

// Pill buttons
const defaultSquareButtons: ButtonsSection = {
  title: "Default options",
  buttons: [
    {
      theme: "primary",
      label: "Primary",
    },
    {
      theme: "brand",
      label: "Solid",
    },
    {
      theme: "secondary",
      label: "Secondary",
    },
    {
      theme: "brand",
      label: "Outline",
      themeMod: "outline",
    },
    {
      theme: "danger",
      label: "Hover outline",
      themeMod: "outline-hover",
    },
    {
      theme: "light",
      label: "Hover solid",
      themeMod: "hover",
    },
  ],
};
const elevationOptionsSquareButtons: ButtonsSection = {
  title: "Elevation options",
  buttons: [
    {
      theme: "light",
      label: "Solid",
      elevate: "elevate",
    },
    {
      theme: "secondary",
      label: "Secondary",
      elevate: "elevate",
    },
    {
      theme: "brand",
      themeMod: "outline",
      label: "Outline",
      elevate: "elevate",
    },
    {
      theme: "info",
      themeMod: "outline-hover",
      label: "Outline",
      elevate: "elevate",
    },
    {
      theme: "light",
      label: "Rise elevation",
      elevate: "elevate",
    },
  ],
};

// Pill buttons
const defaultPillButtons: ButtonsSection = {
  title: "Default options",
  buttons: defaultSquareButtons.buttons.map((button) => ({
    ...button,
    isPill: true,
  })),
};
const elevationOptionsPillButtons: ButtonsSection = {
  title: "Elevation options",
  buttons: elevationOptionsSquareButtons.buttons.map((button) => ({
    ...button,
    isPill: true,
  })),
};

// Icon buttons
const defaultWithIcons: ButtonsSection = {
  title: "Default options with SVG icons",
  buttons: [
    {
      label: "Primary",
      icon: "briefcase",
    },
  ],
};

const buttons: Buttons = [
  [
    {
      title: "Basic Buttons",
      sections: [
        bootstrapButtons,
        supportedHtmlElements,
        buttonsStates,
        customButtons,
        baseButtons,
      ],
    },
    {
      title: "Outlined buttons",
      sections: [defaultOutline, hoverOutline],
    },
    {
      title: "Square buttons",
      sections: [defaultSquareButtons, elevationOptionsSquareButtons],
    },
    {
      title: "Pill buttons",
      sections: [defaultPillButtons, elevationOptionsPillButtons],
    },
  ],
  [
    {
      title: "Button Customization",
      sections: [
        largeButtons,
        smallButtons,
        fontSettings,
        wideButtons,
        tallButtons,
      ],
    },
    {
      title: "Elevated buttons",
      sections: [
        defaultElevated,
        pillElevated,
        smallPillElevated,
        hoverElevated,
        pillHoverElevated,
        smallPillHoverElevated,
      ],
    },
    {
      title: "With icons",
      sections: [defaultWithIcons],
    },
  ],
];

export default buttons;
