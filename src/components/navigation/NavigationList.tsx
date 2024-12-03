import {DndContext, closestCenter, DragEndEvent} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {SortableNavigationItem} from "./SortableNavigationItem";
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
  onReorder: (items: NavItem[]) => void;
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
  onReorder,
}: NavigationListProps) {
  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newItems = [...items];
      const [removed] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, removed);
      onReorder(newItems);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className='space-y-5'>
          {items.map((item) => (
            <SortableNavigationItem
              key={item.id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddChild={onAddChild}
              editingId={editingId}
              onEditStart={onEditStart}
              onEditCancel={onEditCancel}
              addingChildId={addingChildId}
              onAddChildSubmit={onAddChildSubmit}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
