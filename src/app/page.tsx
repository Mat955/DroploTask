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

  const handleAddItem = () => {
    setIsAddingNew(true);
  };

  const handleSubmit = (data: NavigationFormData) => {
    const newItem: NavigationItem = {
      id: crypto.randomUUID(),
      label: data.label,
      url: data.url,
    };
    setItems([...items, newItem]);
    setIsAddingNew(false);
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingId(null);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleAddChild = (parentId: string) => {
    // Implementacja dodawania dzieci zostanie dodana w następnym kroku
    console.log("Adding child to:", parentId);
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
