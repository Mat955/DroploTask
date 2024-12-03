"use client";

import {EmptyState} from "@/components/navigation/EmptyState";
import {NavigationForm} from "@/components/navigation/NavigationForm";
import {NavigationList} from "@/components/navigation/NavigationList";
import {useState} from "react";
import type {NavigationItem, NavigationFormData} from "@/types/navigation";
import {useToast} from "../contexts/ToastContext";

export default function Home() {
  const [items, setItems] = useState<NavigationItem[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addingChildId, setAddingChildId] = useState<string | null>(null);
  const toast = useToast();

  const handleAddNew = () => {
    try {
      setIsAddingNew(true);
    } catch (error) {
      console.error(error);
      toast.showError("Wystąpił błąd podczas otwierania formularza");
    }
  };

  const handleSubmit = (data: NavigationFormData) => {
    try {
      const newItem: NavigationItem = {
        id: crypto.randomUUID(),
        label: data.label,
        url: data.url,
        children: [],
      };
      setItems([...items, newItem]);
      setIsAddingNew(false);
      toast.showSuccess("Pomyślnie dodano nową pozycję menu");
    } catch (error) {
      console.error(error);
      toast.showError("Wystąpił błąd podczas dodawania pozycji menu");
    }
  };

  const handleEdit = (id: string, data: NavigationFormData) => {
    try {
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
      toast.showSuccess("Pomyślnie zaktualizowano pozycję menu");
    } catch (error) {
      console.error(error);
      toast.showError("Wystąpił błąd podczas aktualizacji pozycji menu");
    }
  };

  const handleEditStart = (id: string) => {
    try {
      setEditingId(id);
    } catch (error) {
      console.error(error);
      toast.showError("Wystąpił błąd podczas rozpoczynania edycji");
    }
  };

  const handleCancel = () => {
    try {
      setIsAddingNew(false);
      setEditingId(null);
      setAddingChildId(null);
    } catch (error) {
      console.error(error);
      toast.showError("Wystąpił błąd podczas anulowania operacji");
    }
  };

  const handleDelete = (id: string) => {
    try {
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
      toast.showSuccess("Pomyślnie usunięto pozycję menu");
    } catch (error) {
      console.error(error);
      toast.showError("Wystąpił błąd podczas usuwania pozycji menu");
    }
  };

  const handleAddChild = (parentId: string) => {
    try {
      setAddingChildId(parentId);
    } catch (error) {
      console.error(error);
      toast.showError("Wystąpił błąd podczas dodawania podmenu");
    }
  };

  const handleAddChildSubmit = (parentId: string, data: NavigationFormData) => {
    try {
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
      toast.showSuccess("Pomyślnie dodano nową pozycję podmenu");
    } catch (error) {
      console.error(error);
      toast.showError("Wystąpił błąd podczas dodawania pozycji podmenu");
    }
  };

  const handleReorder = (newItems: NavigationItem[]) => {
    try {
      setItems(newItems);
      toast.showSuccess("Pomyślnie zmieniono kolejność elementów");
    } catch (error) {
      console.error(error);
      toast.showError("Wystąpił błąd podczas zmiany kolejności");
      // Przywróć poprzednią kolejność w przypadku błędu
      setItems(items);
    }
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
