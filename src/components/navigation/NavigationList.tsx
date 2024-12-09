"use client";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
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
  isFormActive: boolean;
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
  isFormActive,
}: NavigationListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;

    if (!over || active.id === over.id) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeIndex = items.findIndex((item) => item.id === activeId);
    const overIndex = items.findIndex((item) => item.id === overId);

    if (activeIndex === -1 || overIndex === -1) return;

    const newItems = [...items];
    const [movedItem] = newItems.splice(activeIndex, 1);
    newItems.splice(overIndex, 0, movedItem);

    onReorder(newItems);
  };

  if (items.length === 0 && isAddingNew) {
    return null;
  }

  return (
    <div className='rounded-lg border border-[#EAECF0] bg-[#F9FAFB] overflow-hidden'>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div>
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`border-b border-[#EAECF0] ${
                  index === items.length - 1 ? "border-b-0" : ""
                }`}
              >
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
                  isFormActive={isFormActive}
                />
              </div>
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
