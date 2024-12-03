import {useEffect, useState} from "react";
import {useToast} from "../contexts/ToastContext";
import {NavigationItem, NavigationFormData} from "@/types/navigation";

export function useNavigationOperations() {
  const [items, setItems] = useState<NavigationItem[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addingChildId, setAddingChildId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const toast = useToast();

  const isFormActive =
    isAddingNew || editingId !== null || addingChildId !== null;

  useEffect(() => {
    setIsClient(true);
    const storedItems = localStorage.getItem("navigation-items");
    if (storedItems) {
      try {
        setItems(JSON.parse(storedItems));
      } catch (error) {
        console.error("Error parsing stored items:", error);
      }
    }
  }, []);

  // Zapisujemy zmiany do localStorage
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("navigation-items", JSON.stringify(items));
    }
  }, [items, isClient]);

  const handleAddNew = () => {
    if (isFormActive) {
      toast.showError("Zakończ obecną operację przed dodaniem nowej pozycji");
      return;
    }
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
    if (isFormActive) {
      toast.showError("Zakończ obecną operację przed rozpoczęciem edycji");
      return;
    }
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
    if (isFormActive) {
      toast.showError("Zakończ obecną operację przed dodaniem podmenu");
      return;
    }
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
    items: isClient ? items : [],
    isAddingNew,
    isFormActive,
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
