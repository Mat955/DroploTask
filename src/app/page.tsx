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

  const handleAddNew = () => {
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
    const editItem = (items: NavigationItem[]): NavigationItem[] => {
      return items.map((item) => {
        if (item.id === id) {
          return {...item, ...data};
        }
        if (item.children) {
          return {
            ...item,
            children: editItem(item.children),
          };
        }
        return item;
      });
    };

    setItems(editItem(items));
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
    const deleteItem = (items: NavigationItem[]): NavigationItem[] => {
      return items.filter((item) => {
        if (item.id === id) return false;
        if (item.children) {
          item.children = deleteItem(item.children);
        }
        return true;
      });
    };

    setItems(deleteItem(items));
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

    const addChildToItem = (items: NavigationItem[]): NavigationItem[] => {
      return items.map((item) => {
        if (item.id === parentId) {
          return {
            ...item,
            children: [...(item.children || []), newChild],
          };
        }
        if (item.children) {
          return {
            ...item,
            children: addChildToItem(item.children),
          };
        }
        return item;
      });
    };

    setItems(addChildToItem(items));
    setAddingChildId(null);
  };

  const handleReorder = (newItems: NavigationItem[]) => {
    setItems(newItems);
  };

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
