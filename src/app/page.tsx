"use client";

import {EmptyState} from "@/components/navigation/EmptyState";
import {NavigationForm} from "@/components/navigation/NavigationForm";
import {useState} from "react";
import type {NavigationItem, NavigationFormData} from "@/types/navigation";

export default function Home() {
  const [items, setItems] = useState<NavigationItem[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);

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
  };

  return (
    <main className='min-h-screen p-8'>
      <div className='max-w-[856px] mx-auto'>
        {items.length === 0 && !isAddingNew ? (
          <EmptyState onAddClick={handleAddItem} />
        ) : null}
        {isAddingNew && (
          <NavigationForm onSubmit={handleSubmit} onCancel={handleCancel} />
        )}
      </div>
    </main>
  );
}
