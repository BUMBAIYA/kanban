import { DropResult } from "react-beautiful-dnd";
import { KanbanBoardState, KanbanCard } from "../components/kanban/KanbanTypes";
import { CardModalProps } from "../components/modal/CardModal";
import { DeleteListModalProps } from "../components/modal/DeleteListModal";
import { RenameListModalProps } from "../components/modal/RenameListModal";

export type ModalTypes = "DELETE_LIST" | "UPDATE_CARD" | "RENAME_LIST";

export type ModalContextState = {
  type: ModalTypes | null;
  isOpen: boolean;
  modalProps:
    | DeleteListModalProps
    | CardModalProps
    | RenameListModalProps
    | null;
};

export type hanbleOpenModalProps =
  | {
      type: "DELETE_LIST";
      modalProps: DeleteListModalProps;
    }
  | { type: "UPDATE_CARD"; modalProps: CardModalProps }
  | { type: "RENAME_LIST"; modalProps: RenameListModalProps };

export type KanbanContext = {
  kanbanState: KanbanBoardState;
  modalState: ModalContextState;
  handleCreateList: (title: string) => void;
  handleDeleteList: (listIndex: number) => void;
  handleRenameList: (listIndex: number, title: string) => void;
  handleCreateCard: (listIndex: number, title: string) => void;
  handleDeleteCard: (listIndex: number, cardIndex: number) => void;
  handleUpdateCard: (
    listIndex: number,
    cardIndex: number,
    updatedCard: KanbanCard
  ) => void;
  handleDragEnd: (dropResult: DropResult) => void;
  handleOpenModal: (props: hanbleOpenModalProps) => void;
  handleCloseModal: () => void;
};
