import { atom, selector } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

export const categoryState = atom<IToDo["category"]>({
  key: "category",
  default: "TO_DO",
});

export const toDoListState = atom<IToDo[]>({
  key: "toDoList",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDoList = get(toDoListState);
    const category = get(categoryState);

    return toDoList.filter((toDo) => toDo.category === category);
  },
});
