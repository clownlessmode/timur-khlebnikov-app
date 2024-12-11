"use client";

import React, { useState, ReactNode, useEffect } from "react";

interface Item {
  id: string;
  [key: string]: any;
}

// src/shared/ui/Multiselector.tsx
interface GroupSelectorProps<T extends Item> {
  initialItems?: T[];
  selectedItems?: T[]; // Добавляем selectedItems
  renderItem: (item: T, isSelected: boolean, onSelect: () => void) => ReactNode;
  direction?: "row" | "column";
  selectedLabel?: string;
  availableLabel?: string;
  emptySelectedMessage?: string;
  onItemSelect?: (item: T) => void; // Обработчик для выбора
  onItemRemove?: (item: T) => void; // Обработчик для удаления
}

export default function Multiselector<T extends Item>({
  initialItems = [],
  selectedItems = [],
  renderItem,
  direction = "column",
  selectedLabel = "Выбранные элементы",
  availableLabel = "Доступные элементы",
  emptySelectedMessage = "Элементы не выбраны",
  onItemSelect,
  onItemRemove,
}: GroupSelectorProps<T>) {
  const [availableItems, setAvailableItems] = useState<T[]>(initialItems);
  const [selectedItemsState, setSelectedItemsState] =
    useState<T[]>(selectedItems);

  useEffect(() => {
    // Полностью фильтруем начальные элементы, исключая выбранные
    const filteredAvailable = initialItems.filter(
      (item) =>
        !selectedItemsState.some((selectedItem) => selectedItem.id === item.id)
    );
    setAvailableItems(filteredAvailable);
  }, [initialItems, selectedItemsState]);

  const selectItem = (item: T) => {
    // Добавляем в выбранные
    setSelectedItemsState((prevItems) => {
      const newSelected = [...prevItems, item];
      onItemSelect?.(item);
      return newSelected.sort((a, b) => a.id.localeCompare(b.id));
    });

    // Полностью удаляем из доступных
    setAvailableItems((prevItems) =>
      prevItems.filter((availableItem) => availableItem.id !== item.id)
    );
  };

  const removeItem = (item: T) => {
    // Убираем из выбранных
    setSelectedItemsState((prevItems) =>
      prevItems.filter((i) => i.id !== item.id)
    );
    onItemRemove?.(item);

    // Добавляем обратно в доступные
    setAvailableItems((prevItems) =>
      [...prevItems, item].sort((a, b) => a.id.localeCompare(b.id))
    );
  };

  const containerDirection =
    direction === "row" ? "flex-row space-x-4" : "flex-col space-y-4";

  return (
    <div className={`w-full max-w-2xl flex ${containerDirection}`}>
      {/* Список выбранных */}
      <div className="flex-1 rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="mb-3 text-sm font-medium text-gray-600">
          {selectedLabel}
        </h3>
        <div className="min-h-[40px] flex items-start">
          {selectedItemsState.length === 0 ? (
            <p className="text-sm text-gray-500">{emptySelectedMessage}</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selectedItemsState.map((item) => (
                <div
                  key={item.id}
                  className="cursor-pointer"
                  onClick={() => removeItem(item)} // Клик для удаления
                >
                  {renderItem(item, true, () => removeItem(item))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Список доступных */}
      <div className="flex-1 rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="mb-3 text-sm font-medium text-gray-600">
          {availableLabel}
        </h3>
        <div className="flex flex-wrap gap-2 items-start">
          {availableItems.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer"
              onClick={() => selectItem(item)} // Клик для добавления
            >
              {renderItem(item, false, () => selectItem(item))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
