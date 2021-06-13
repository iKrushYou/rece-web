import useLocalStorage from './useLocalStorage';
import ReceiptItem from '../types/ReceiptItem';
import Person from '../types/Person';
import { indexArray, setify } from '../functions/utils';
import { useMemo } from 'react';
import currency from 'currency.js';
import { v4 as uuidv4 } from 'uuid';

export interface AppDataEntity {
  items: ReceiptItem[];
  people: Person[];
  personToItemsMap: Record<string, string[]>;
  itemToPeopleMap: Record<string, string[]>;
  tip: number;
  tax: number;
}

export default function useAppData() {
  const [appData, setAppData] = useLocalStorage<AppDataEntity>('appData', {
    items: [],
    people: [],
    personToItemsMap: {},
    itemToPeopleMap: {},
    tip: 0,
    tax: 0,
  });

  const addItem = (newItem: ReceiptItem) => {
    setAppData((prev) => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const removeItem = (itemId: string) => {
    setAppData((prev) => ({ ...prev, items: prev.items.filter((item) => item.id !== itemId) }));
  };

  const splitItem = (itemId: string) => {
    const item = appData.items.find((item) => item.id === itemId);
    if (!item) return;
    const splitCount = parseInt(
      prompt(`How many items should (${item.name} - ${currency(item.cost).format()}) be split into?`) || '',
    );
    if (!splitCount || isNaN(splitCount)) return;
    const newItems: ReceiptItem[] = indexArray(splitCount).map(() => ({
      id: uuidv4(),
      name: item.name,
      cost: item.cost / splitCount,
    }));
    setAppData((prev) => ({ ...prev, items: [...prev.items.filter((item) => item.id !== itemId), ...newItems] }));
  };

  const updateItem = (newItem: ReceiptItem) => {
    setAppData((prev) => ({ ...prev, items: prev.items.map((item) => (item.id === newItem.id ? newItem : item)) }));
  };

  const addPerson = (newPerson: Person) => {
    setAppData((prev) => ({ ...prev, people: [...prev.people, newPerson] }));
  };

  const removePerson = (personId: string) => {
    setAppData((prev) => ({ ...prev, people: prev.people.filter((person) => person.id !== personId) }));
  };

  const handleSetItemPerson = (itemId: string, personId: string, selected: boolean) => {
    setAppData((prev) => {
      const { personToItemsMap, itemToPeopleMap } = prev;
      if (!personToItemsMap[personId]) personToItemsMap[personId] = [];
      if (selected) {
        personToItemsMap[personId] = setify([...personToItemsMap[personId], itemId]);
      } else {
        personToItemsMap[personId] = personToItemsMap[personId].filter((_itemId) => _itemId !== itemId);
      }
      if (!itemToPeopleMap[itemId]) itemToPeopleMap[itemId] = [];
      if (selected) {
        itemToPeopleMap[itemId] = setify([...itemToPeopleMap[itemId], personId]);
      } else {
        itemToPeopleMap[itemId] = itemToPeopleMap[itemId].filter((_personId) => _personId !== personId);
      }
      return { ...prev, personToItemsMap, itemToPeopleMap };
    });
  };

  const itemCostMap = useMemo<Record<string, number>>(() => {
    return appData.items.reduce((map, curr) => ({ ...map, [curr.id]: curr.cost }), {});
  }, [appData.items]);

  const subTotal = useMemo(
    () =>
      appData.items.reduce(
        (previousValue, currentValue) => currency(previousValue).add(currentValue.cost).dollars(),
        0,
      ),
    [appData.items],
  );

  const total = currency(subTotal).add(appData.tax).add(appData.tip).dollars();

  const subTotalForPerson = (personId: string) =>
    appData.personToItemsMap[personId]?.reduce(
      (sum, itemId) =>
        currency(sum).add(currency(itemCostMap[itemId]).divide(appData.itemToPeopleMap[itemId].length)).dollars(),
      0,
    ) || 0;

  const percentForPerson = (personId: string) => subTotalForPerson(personId) / subTotal;

  const taxForPerson = (personId: string) => currency(appData.tax).multiply(percentForPerson(personId)).dollars();
  const tipForPerson = (personId: string) => currency(appData.tip).multiply(percentForPerson(personId)).dollars();

  const totalForPerson = (personId: string) =>
    currency(subTotalForPerson(personId)).add(taxForPerson(personId)).add(tipForPerson(personId)).dollars();

  return {
    ...appData,
    setAppData,
    addItem,
    removeItem,
    splitItem,
    updateItem,
    addPerson,
    removePerson,
    handleSetItemPerson,
    itemCostMap,
    subTotal,
    total,
    subTotalForPerson,
    taxForPerson,
    tipForPerson,
    totalForPerson,
  };
}
