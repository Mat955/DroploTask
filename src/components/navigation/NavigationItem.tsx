import type {
  NavigationItem as NavItem,
  NavigationFormData,
} from "@/types/navigation";
import {NavigationForm} from "./NavigationForm";

interface NavigationItemProps {
  item: NavItem;
  onEdit: (id: string, data: NavigationFormData) => void;
  onDelete: (id: string) => void;
  onAddChild: (parentId: string) => void;
  isEditing: boolean;
  onEditStart: (id: string) => void;
  onEditCancel: () => void;
  isAddingChild: boolean;
  onAddChildSubmit: (parentId: string, data: NavigationFormData) => void;
  editingId: string | null;
  addingChildId: string | null;
}

export function NavigationItem({
  item,
  onEdit,
  onDelete,
  onAddChild,
  isEditing,
  onEditStart,
  onEditCancel,
  isAddingChild,
  onAddChildSubmit,
  editingId,
  addingChildId,
}: NavigationItemProps) {
  return (
    <div className='space-y-5'>
      <div className='bg-white rounded-lg border border-[#EAECF0] p-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-[#101828] font-medium'>{item.label}</h3>
            {item.url && (
              <p className='text-[#475467] text-sm mt-1'>{item.url}</p>
            )}
          </div>
          <div className='flex items-center'>
            <div className='flex border border-[#D0D5DD] rounded-lg overflow-hidden'>
              <button
                onClick={() => onDelete(item.id)}
                className='px-3.5 py-2 text-sm font-semibold text-[#344054] hover:bg-gray-50 border-r border-[#D0D5DD]'
              >
                Usuń
              </button>
              <button
                onClick={() => onEditStart(item.id)}
                className='px-3.5 py-2 text-sm font-semibold text-[#344054] hover:bg-gray-50'
              >
                Edytuj
              </button>
              <button
                onClick={() => onAddChild(item.id)}
                className='px-3.5 py-2 text-sm font-semibold text-[#344054] border-l border-[#D0D5DD] hover:bg-gray-50'
              >
                Dodaj pozycję menu
              </button>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className='pl-16'>
          <NavigationForm
            onSubmit={(data) => onEdit(item.id, data)}
            onCancel={onEditCancel}
            isEditing
          />
        </div>
      )}

      {isAddingChild && (
        <div className='pl-16'>
          <NavigationForm
            onSubmit={(data) => onAddChildSubmit(item.id, data)}
            onCancel={onEditCancel}
          />
        </div>
      )}

      {item.children && item.children.length > 0 && (
        <div className='pl-16'>
          {item.children.map((child) => (
            <NavigationItem
              key={child.id}
              item={child}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddChild={onAddChild}
              isEditing={editingId === child.id}
              onEditStart={onEditStart}
              onEditCancel={onEditCancel}
              isAddingChild={addingChildId === child.id}
              onAddChildSubmit={onAddChildSubmit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
