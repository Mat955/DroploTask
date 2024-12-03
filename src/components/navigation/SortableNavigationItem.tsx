import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {NavigationItem} from "./NavigationItem";
import type {
  NavigationItem as NavItem,
  NavigationFormData,
} from "@/types/navigation";

interface SortableNavigationItemProps {
  item: NavItem;
  onEdit: (id: string, data: NavigationFormData) => void;
  onDelete: (id: string) => void;
  onAddChild: (parentId: string) => void;
  editingId: string | null;
  onEditStart: (id: string) => void;
  onEditCancel: () => void;
  addingChildId: string | null;
  onAddChildSubmit: (parentId: string, data: NavigationFormData) => void;
}

export function SortableNavigationItem(props: SortableNavigationItemProps) {
  const {attributes, listeners, setNodeRef, transform, transition} =
    useSortable({
      id: props.item.id,
      handle: true,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <NavigationItem
        {...props}
        isEditing={props.editingId === props.item.id}
        isAddingChild={props.addingChildId === props.item.id}
        dragHandleProps={{...attributes, ...listeners}}
      />
    </div>
  );
}
