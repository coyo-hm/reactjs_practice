import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark", //유일해야 한다.
  default: false, //기본값
});
