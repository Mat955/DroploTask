"use client";

import {EmptyState} from "@/components/navigation/EmptyState";
import {NavigationForm} from "@/components/navigation/NavigationForm";
import {NavigationList} from "@/components/navigation/NavigationList";
import {useState} from "react";
import type {NavigationItem, NavigationFormData} from "@/types/navigation";

export default function Home() {
  const [items, setItems] = useState<NavigationItem[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addingChildId, setAddingChildId] = useState<string | null>(null);

  const handleAddItem = () => {
    setIsAddingNew(true);
  };

  const handleSubmit = (data: NavigationFormData) => {
    const newItem: NavigationItem = {
      id: crypto.randomUUID(),
      label: data.label,
      url: data.url,
      children: [],
    };
    setItems([...items, newItem]);
    setIsAddingNew(false);
  };

  const handleEdit = (id: string, data: NavigationFormData) => {
    setItems(items.map((item) => (item.id === id ? {...item, ...data} : item)));
    setEditingId(null);
  };

  const handleEditStart = (id: string) => {
    setEditingId(id);
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleAddChild = (parentId: string) => {
    setAddingChildId(parentId);
  };

  const handleAddChildSubmit = (parentId: string, data: NavigationFormData) => {
    const newChild: NavigationItem = {
      id: crypto.randomUUID(),
      label: data.label,
      url: data.url,
      children: [],
    };

    setItems(
      items.map((item) => {
        if (item.id === parentId) {
          return {
            ...item,
            children: [...(item.children || []), newChild],
          };
        }
        return item;
      })
    );
    setAddingChildId(null);
  };

  const handleReorder = (newItems: NavigationItem[]) => {
    setItems(newItems);
  };

  return (
    <main className='min-h-screen p-8'>
      <div className='max-w-[856px] mx-auto'>
        {items.length === 0 && !isAddingNew ? (
          <EmptyState onAddClick={handleAddItem} />
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
