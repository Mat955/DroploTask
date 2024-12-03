import {useState} from "react";
import {useToast} from "../contexts/ToastContext";
import {NavigationItem, NavigationFormData} from "@/types/navigation";
import {useLocalStorage} from "./useLocalStorage";

export function useNavigationOperations() {
  const [items, setItems] = useLocalStorage<NavigationItem[]>(
    "navigation-items",
    []
  );
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addingChildId, setAddingChildId] = useState<string | null>(null);
  const toast = useToast();

  const handleAddNew = () => {
    try {
      setIsAddingNew(true);
    } catch (error: unknown) {
      console.error("Error opening form:", error);
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
    } catch (error: unknown) {
      console.error("Error adding item:", error);
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
    } catch (error: unknown) {
      console.error("Error updating item:", error);
      toast.showError("Wystąpił błąd podczas aktualizacji pozycji menu");
    }
  };

  const handleEditStart = (id: string) => {
    try {
      setEditingId(id);
    } catch (error: unknown) {
      console.error("Error starting edit:", error);
      toast.showError("Wystąpił błąd podczas rozpoczynania edycji");
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
    } catch (error: unknown) {
      console.error("Error deleting item:", error);
      toast.showError("Wystąpił błąd podczas usuwania pozycji menu");
    }
  };

  const handleAddChild = (parentId: string) => {
    try {
      setAddingChildId(parentId);
    } catch (error: unknown) {
      console.error("Error setting adding child:", error);
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
    } catch (error: unknown) {
      console.error("Error adding child item:", error);
      toast.showError("Wystąpił błąd podczas dodawania pozycji podmenu");
    }
  };

  const handleReorder = (newItems: NavigationItem[]) => {
    try {
      setItems(newItems);
      toast.showSuccess("Pomyślnie zmieniono kolejność elementów");
    } catch (error: unknown) {
      console.error("Error reordering items:", error);
      toast.showError("Wystąpił błąd podczas zmiany kolejności");
      setItems(items);
    }
  };

  const handleCancel = () => {
    try {
      setIsAddingNew(false);
      setEditingId(null);
      setAddingChildId(null);
    } catch (error: unknown) {
      console.error("Error canceling operation:", error);
      toast.showError("Wystąpił błąd podczas anulowania operacji");
    }
  };

  return {
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
  };
}
