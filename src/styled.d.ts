import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    btnColor: string;
    btnHoverColor: string;
    accentColor: string;
    boxColor: string;
    boxTextColor: string;
  }
}
