import { createContext } from "react";
import { KanbanBoardState } from "../components/kanban/KanbanTypes";
import { tagColors } from "../components/modal/CreateTagModal";
import { GetBaseURL } from "../utility/baseUrl";
import { s4 } from "../utility/uuidGenerator";
import {
  hanbleOpenModalProps,
  KanbanContext,
  ModalContextState,
} from "./KanbanContextTypes";

export const defaultKanbanBoardState: KanbanBoardState = [
  {
    id: s4(),
    title: "Todo",
    cards: [
      {
        id: s4(),
        title: "Demo Task",
        desc: "This the the Demo task",
        imageUrl: `${GetBaseURL()}/static/kanbanDemoImage.jpg`,
        completed: false,
        tags: [
          { title: "Demo", color: tagColors[0] },
          { title: "Demo", color: tagColors[1] },
          { title: "Demo", color: tagColors[2] },
        ],
        tasks: [
          { title: "Demo task 1", completed: false },
          { title: "Demo task 2", completed: true },
        ],
        date: null,
      },
    ],
  },
  {
    id: s4(),
    title: "Progress",
    cards: [
      {
        id: s4(),
        title: "Demo card completed",
        desc: "",
        imageUrl: "/static/kanbanDemoImage.jpg",
        completed: true,
        tags: [],
        tasks: [],
        date: null,
      },
    ],
  },
  { id: s4(), title: "Done", cards: [] },
];

export const defaultModalContextState: ModalContextState = {
  type: null,
  isOpen: false,
  modalProps: null,
};

const initialContextState: KanbanContext = {
  kanbanState: defaultKanbanBoardState,
  modalState: defaultModalContextState,
  handleCreateList: () => {},
  handleDeleteList: () => {},
  handleCreateCard: () => {},
  handleDeleteCard: () => {},
  handleUpdateCard: () => {},
  handleDragEnd: () => {},
  handleOpenModal: (props: hanbleOpenModalProps) => {},
  handleCloseModal: () => {},
};

const KanbanContext = createContext<KanbanContext>(initialContextState);

export const KanbanContextConsumer = KanbanContext.Consumer;
export const KanbanContextProvider = KanbanContext.Provider;

export default KanbanContext;
