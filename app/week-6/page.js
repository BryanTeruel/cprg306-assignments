import ItemList from "./item-list";

export default function Page() {
  return (
    <div className="p-8 bg-sky-950">
      <h1 className="text-5xl font-bold mb-6">Shopping List</h1>
      <ItemList />
    </div>
  );
}
