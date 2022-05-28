import * as React from "react";

import { useAppSelector } from "../src/hooks";
import { selectDays } from "../features/journal";

import { Day } from "../src/components/Day";

export default function App() {
  const days = useAppSelector(selectDays);

  return (
    <div>
      <h1>Todos</h1>
      {days.map((entryId, id) => (
        <Day dayId={entryId.date} key={`day_${entryId.date}`} />
      ))}
    </div>
  );
}
