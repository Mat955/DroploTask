import {NavigationItem} from "./NavigationItem";
import type {
  NavigationItem as NavItem,
  NavigationFormData,
} from "@/types/navigation";

interface NavigationListProps {
  items: NavItem[];
  onEdit: (id: string, data: NavigationFormData) => void;
  onDelete: (id: string) => void;
  onAddChild: (parentId: string) => void;
  editingId: string | null;
  onEditStart: (id: string) => void;
  onEditCancel: () => void;
  addingChildId: string | null;
  onAddChildSubmit: (parentId: string, data: NavigationFormData) => void;
}

export function NavigationList({
  items,
  onEdit,
  onDelete,
  onAddChild,
  editingId,
  onEditStart,
  onEditCancel,
  addingChildId,
  onAddChildSubmit,
}: NavigationListProps) {
  return (
    <div className='space-y-5'>
      {items.map((item) => (
        <NavigationItem
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddChild={onAddChild}
          isEditing={editingId === item.id}
          onEditStart={onEditStart}
          onEditCancel={onEditCancel}
          isAddingChild={addingChildId === item.id}
          onAddChildSubmit={onAddChildSubmit}
        />
      ))}
    </div>
  );
}
