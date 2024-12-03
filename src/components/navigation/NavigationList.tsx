import {NavigationItem} from "./NavigationItem";
import type {NavigationItem as NavItem} from "@/types/navigation";

interface NavigationListProps {
  items: NavItem[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAddChild: (parentId: string) => void;
}

export function NavigationList({
  items,
  onEdit,
  onDelete,
  onAddChild,
}: NavigationListProps) {
  return (
    <div className='space-y-5'>
      {items.map((item) => (
        <NavigationItem
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddChild={onAddChild}
        />
      ))}
    </div>
  );
}
