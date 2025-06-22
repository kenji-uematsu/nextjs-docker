"use client";

import { createContext, useState } from "react";
import UseContextCounter from "./UseContextCounter";

// contextの型定義
interface CounterContextProps {
  count: number;
  increment: () => void;
  decrement: () => void;
}

// contextの作成
export const CounterContext = createContext<CounterContextProps | undefined>(
  undefined
);

const App = () => {
  // stateの定義
  const [count, setCount] = useState<number>(0);

  // ＋ボタンを押した時の処理
  const increment = () => setCount((prevCount) => prevCount + 1);

  // −ボタンを押した時の処理
  const decrement = () => {
    if (count === 0) return;
    setCount((prevCount) => prevCount - 1);
  };

  return (
    // contextの提供
    <CounterContext.Provider value={{ count, increment, decrement }}>
      <UseContextCounter />
    </CounterContext.Provider>
  );
};

export default App;
