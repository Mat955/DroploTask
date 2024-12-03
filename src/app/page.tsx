"use client";

import {EmptyState} from "@/components/navigation/EmptyState";
import {NavigationForm} from "@/components/navigation/NavigationForm";
import {NavigationList} from "@/components/navigation/NavigationList";
import {useNavigationOperations} from "@/hooks/useNavigationOperations";

export default function Home() {
  const {
    items,
    isAddingNew,
    editingId,
    addingChildId,
    handleAddNew,
    handleSubmit,
    handleEdit,
    handleEditStart,
    handleDelete,
    handleAddChild,
    handleAddChildSubmit,
    handleReorder,
    handleCancel,
  } = useNavigationOperations();

  return (
    <main className='min-h-screen p-8'>
      <div className='max-w-[856px] mx-auto'>
        {items.length === 0 && !isAddingNew ? (
          <EmptyState onAddClick={handleAddNew} />
        ) : (
          <>
            <NavigationList
              items={items}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAddChild={handleAddChild}
              editingId={editingId}
              onEditStart={handleEditStart}
              onEditCancel={handleCancel}
              addingChildId={addingChildId}
              onAddChildSubmit={handleAddChildSubmit}
              onReorder={handleReorder}
              onAddNew={handleAddNew}
              isAddingNew={isAddingNew}
            />
            {isAddingNew && (
              <NavigationForm onSubmit={handleSubmit} onCancel={handleCancel} />
            )}
          </>
        )}
      </div>
    </main>
  );
}
