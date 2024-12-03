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
  onAddNew: () => void;
  isAddingNew: boolean;
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
  onAddNew,
  isAddingNew,
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

  if (items.length === 0 && isAddingNew) {
    return null;
  }

  return (
    <div className='rounded-lg border border-[#EAECF0] bg-white'>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className='divide-y divide-[#EAECF0]'>
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
      {!isAddingNew && (
        <div className='border-t border-[#EAECF0] p-6'>
          <button
            onClick={onAddNew}
            className='px-4 py-2.5 text-sm font-semibold text-[#344054] hover:bg-gray-50 rounded-lg border border-[#D0D5DD] bg-white'
          >
            Dodaj pozycję menu
          </button>
        </div>
      )}
    </div>
  );
}
