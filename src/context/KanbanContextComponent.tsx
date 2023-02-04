import { PropsWithChildren, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { KanbanBoardState, KanbanCard } from "../components/kanban/KanbanTypes";
import { CardModal, CardModalProps } from "../components/modal/CardModal";
import {
  DeleteListModal,
  DeleteListModalProps,
} from "../components/modal/DeleteListModal";
import RenameListModal, {
  RenameListModalProps,
} from "../components/modal/RenameListModal";
import useLocalStorage from "../hooks/useLocalStorage";
import { s4 } from "../utility/uuidGenerator";
import {
  defaultKanbanBoardState,
  defaultModalContextState,
  KanbanContextProvider,
} from "./kanbanContext";
import { hanbleOpenModalProps, ModalContextState } from "./KanbanContextTypes";

export interface IAppProps extends PropsWithChildren {}

export function KanbanContextComponent(props: IAppProps) {
  const { children } = props;
  const [kanbanState, setKanbanState] = useLocalStorage<KanbanBoardState>(
    "kanban-state",
    defaultKanbanBoardState
  );

  const [modalState, setModalState] = useState<ModalContextState>(
    defaultModalContextState
  );

  const handleCreateList = (title: string) => {
    const tempList = [...kanbanState];
    tempList.push({ id: s4(), title, cards: [] });
    setKanbanState(tempList);
  };

  const handleDeleteList = (listIndex: number) => {
    const tempList = [...kanbanState];
    tempList.splice(listIndex, 1);
    setKanbanState(tempList);
  };

  const handleRenameList = (listIndex: number, title: string) => {
    const tempList = [...kanbanState];
    tempList[listIndex].title = title;
    setKanbanState(tempList);
  };

  const handleCreateCard = (listIndex: number, title: string) => {
    const tempList = [...kanbanState];
    tempList[listIndex].cards.push({
      id: s4(),
      title,
      completed: false,
      tasks: [],
      tags: [],
      date: null,
    });
    setKanbanState(tempList);
  };

  const handleDeleteCard = (listIndex: number, cardIndex: number) => {
    const tempList = [...kanbanState];
    tempList[listIndex].cards.splice(cardIndex, 1);
    setKanbanState(tempList);
  };

  const handleUpdateCard = (
    listIndex: number,
    cardIndex: number,
    updatedCard: KanbanCard
  ) => {
    const tempList = [...kanbanState];
    tempList[listIndex].cards[cardIndex] = updatedCard;
    setKanbanState(tempList);
  };

  const handleDragEnd = (dropResult: DropResult) => {
    const { source, destination, type } = dropResult;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === "all-lists") {
      const tempBoard = [...kanbanState];
      const draggedBoard = tempBoard[source.index];
      tempBoard.splice(source.index, 1);
      tempBoard.splice(destination.index, 0, draggedBoard);
      setKanbanState(tempBoard);
    }

    const s_b_index = kanbanState.findIndex(
      (_board) => _board.id === source.droppableId
    );
    if (s_b_index < 0) return;

    const t_b_index = kanbanState.findIndex(
      (_board) => _board.id === destination.droppableId
    );
    if (t_b_index < 0) return;

    const tempBoards = [...kanbanState];
    const draggedCard = tempBoards[s_b_index].cards[source.index];
    tempBoards[s_b_index].cards.splice(source.index, 1);
    tempBoards[t_b_index].cards.splice(destination.index, 0, draggedCard);
    setKanbanState(tempBoards);
  };

  const handleCloseModal = () => {
    setModalState({ type: null, isOpen: false, modalProps: null });
  };

  const handleOpenModal = (props: hanbleOpenModalProps) => {
    switch (props.type) {
      case "DELETE_LIST": {
        setModalState({
          type: "DELETE_LIST",
          isOpen: true,
          modalProps: props.modalProps,
        });
        break;
      }
      case "UPDATE_CARD": {
        setModalState({
          type: "UPDATE_CARD",
          isOpen: true,
          modalProps: props.modalProps,
        });
        break;
      }
      case "RENAME_LIST": {
        setModalState({
          type: "RENAME_LIST",
          isOpen: true,
          modalProps: props.modalProps,
        });
        break;
      }
      default: {
        return;
      }
    }
  };

  const renderModal = (state: ModalContextState) => {
    if (state.modalProps !== null) {
      switch (state.type) {
        case "DELETE_LIST": {
          return (
            <DeleteListModal {...(state.modalProps as DeleteListModalProps)} />
          );
        }
        case "UPDATE_CARD": {
          return <CardModal {...(state.modalProps as CardModalProps)} />;
        }
        case "RENAME_LIST": {
          return (
            <RenameListModal {...(state.modalProps as RenameListModalProps)} />
          );
        }
        default: {
          return null;
        }
      }
    }
  };

  return (
    <KanbanContextProvider
      value={{
        kanbanState,
        modalState,
        handleCreateList,
        handleCreateCard,
        handleRenameList,
        handleDeleteList,
        handleDeleteCard,
        handleUpdateCard,
        handleDragEnd,
        handleOpenModal,
        handleCloseModal,
      }}
    >
      {renderModal(modalState)}
      {children}
    </KanbanContextProvider>
  );
}
