import { StyleSheet } from "react-native";

import {
  getThemeProperty,
  createSpacingStyles,
  createBorderWidthStyles,
  createBorderColorStyles,
  createBorderRadiusStyles,
  createPositionStyle
} from "../../theme/theme.service";

/**
 * computed style
 *
 * @param theme
 * @param props
 */
export const getStyle = (theme: any, props: any) => {
  const computedStyle: any = {};

  computedStyle.container = {
    minHeight: typeof props.count === "undefined" ? 10 : 30,
    minWidth: typeof props.count === "undefined" ? 10 : 30
  };

  computedStyle.div = {
    alignItems: "center",
    justifyContent: "center",
    ...createBorderWidthStyles(props),
    ...createSpacingStyles(props, theme.spacing),
    ...createBorderColorStyles(props, theme.colors),
    ...createBorderRadiusStyles(props, theme.borderRadius),
    backgroundColor: getThemeProperty(theme.colors, props.bg, "transparent"),
    ...createPositionStyle(props),
    minHeight: typeof props.children === "string" ? 30 : 10,
    minWidth: typeof props.children === "string" ? 30 : 10,
    zIndex: 9999
  };

  if (typeof props.children !== "string") {
    computedStyle.div = {
      ...computedStyle.div,
      position: "absolute"
    };
  }

  if (props.h) {
    computedStyle.div = {
      ...computedStyle.div,
      height: props.h
    };
  }

  if (props.w) {
    computedStyle.div = {
      ...computedStyle.div,
      width: props.w
    };
  }

  computedStyle.text = {
    color: props.color,
    fontSize: getThemeProperty(theme.fontSize, props.fontSize, 16),
    paddingHorizontal: 10
  };

  if (props.shadow) {
    computedStyle.div = {
      ...computedStyle.div,
      ...theme.shadow[props.shadow],
      shadowColor: getThemeProperty(theme.colors, props.shadowColor, "white")
    };
  }

  // merging style props to computed style
  if (props.style) {
    computedStyle.div = {
      ...computedStyle.div,
      ...props.style
    };
  }

  return StyleSheet.create(computedStyle);
};
