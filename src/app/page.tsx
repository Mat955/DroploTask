"use client";

import {useState} from "react";
import {EmptyState} from "../components/navigation/EmptyState";

export default function Home() {
  const [items, setItems] = useState<NavigationItem[]>([]);

  const handleAddItem = () => {
    console.log("Adding new item");
  };

  return (
    <main className='min-h-screen p-8'>
      <div className='max-w-[856px] mx-auto'>
        {items.length === 0 ? <EmptyState onAddClick={handleAddItem} /> : null}
      </div>
    </main>
  );
}
