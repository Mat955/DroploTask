"use client";
import {memo} from "react";
import {ArrowsPointingOutIcon} from "@heroicons/react/24/outline";
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
  dragHandleProps?:
    | {
        [key: string]: unknown;
      }
    | undefined;
  isFormActive: boolean;
}

export const NavigationItem = memo(function NavigationItem({
  item,
  onEdit,
  onDelete,
  onAddChild,
  isEditing,
  isFormActive,
  onEditStart,
  onEditCancel,
  isAddingChild,
  onAddChildSubmit,
  editingId,
  addingChildId,
  dragHandleProps,
}: NavigationItemProps) {
  return (
    <div>
      <div className='bg-white py-6 px-6 group'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <ArrowsPointingOutIcon
              className='w-5 h-5 text-[#475467] cursor-move select-none focus:outline-none'
              {...dragHandleProps}
            />
            <div>
              <h3 className='text-[#101828] font-semibold'>{item.label}</h3>
              {item.url && <p className='text-[#475467] text-sm'>{item.url}</p>}
            </div>
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
                disabled={isFormActive}
                className='px-3.5 py-2 text-sm font-semibold text-[#344054] hover:bg-gray-50'
              >
                Edytuj
              </button>
              <button
                onClick={() => onAddChild(item.id)}
                disabled={isFormActive}
                className='px-3.5 py-2 text-sm font-semibold text-[#344054] hover:bg-gray-50 border-l border-[#D0D5DD]'
              >
                Dodaj pozycję menu
              </button>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className='pl-16 pr-6'>
          <NavigationForm
            onSubmit={(data) => onEdit(item.id, data)}
            onCancel={onEditCancel}
            isEditing
          />
        </div>
      )}

      {isAddingChild && (
        <div className='pl-16 pr-6'>
          <NavigationForm
            onSubmit={(data) => onAddChildSubmit(item.id, data)}
            onCancel={onEditCancel}
          />
        </div>
      )}

      {item.children && item.children.length > 0 && (
        <div className='pl-16 border-t border-[#EAECF0]'>
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
              editingId={editingId}
              addingChildId={addingChildId}
              dragHandleProps={dragHandleProps}
              isFormActive={isFormActive}
            />
          ))}
        </div>
      )}
    </div>
  );
});
