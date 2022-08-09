import { atom, selector } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

export const toDoListState = atom<IToDo[]>({
  key: "toDoList",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDoList = get(toDoListState);
    return [
      toDoList.filter((toDo) => toDo.category === "TO_DO"),
      toDoList.filter((toDo) => toDo.category === "DOING"),
      toDoList.filter((toDo) => toDo.category === "DONE"),
    ];
  },
});
