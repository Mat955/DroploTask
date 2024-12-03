"use client";

import {useEffect, useState} from "react";
import {EmptyState} from "@/components/navigation/EmptyState";
import {NavigationForm} from "@/components/navigation/NavigationForm";
import {NavigationList} from "@/components/navigation/NavigationList";
import {useNavigationOperations} from "@/hooks/useNavigationOperations";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const navigationOps = useNavigationOperations();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <main className='min-h-screen p-8'>
      <div className='max-w-[856px] mx-auto'>
        {navigationOps.items.length === 0 && !navigationOps.isAddingNew ? (
          <EmptyState onAddClick={navigationOps.handleAddNew} />
        ) : (
          <>
            <NavigationList
              items={navigationOps.items}
              onEdit={navigationOps.handleEdit}
              onDelete={navigationOps.handleDelete}
              onAddChild={navigationOps.handleAddChild}
              editingId={navigationOps.editingId}
              onEditStart={navigationOps.handleEditStart}
              onEditCancel={navigationOps.handleCancel}
              addingChildId={navigationOps.addingChildId}
              onAddChildSubmit={navigationOps.handleAddChildSubmit}
              onReorder={navigationOps.handleReorder}
              onAddNew={navigationOps.handleAddNew}
              isAddingNew={navigationOps.isAddingNew}
              isFormActive={navigationOps.isFormActive}
            />
            {navigationOps.isAddingNew && (
              <NavigationForm
                onSubmit={navigationOps.handleSubmit}
                onCancel={navigationOps.handleCancel}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
}
