import { NewItem } from "./new-item";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen bg-sky-950">
      <div className="bg-white w-max rounded shadow-lg">
        <NewItem />
      </div>
    </div>
  );
}
