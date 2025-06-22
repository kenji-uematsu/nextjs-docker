"use client";

import { createContext, useContext, useState } from "react";

// contextの型定義
interface CounterContextProps {
  count: number;
  increment: () => void;
  decrement: () => void;
}

// contextの作成
const CounterContext = createContext<CounterContextProps | undefined>(
  undefined
);

// カスタムフック
const useCounter = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return context;
};

// カウンター表示コンポーネント
const CounterDisplay = () => {
  const { count, increment, decrement } = useCounter();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="text-center mb-4">
        <div className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
          {count}
        </div>
      </div>
      <div className="flex gap-3 justify-center">
        <button
          onClick={increment}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          +1
        </button>
        <button
          onClick={decrement}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          disabled={count === 0}
        >
          -1
        </button>
      </div>
    </div>
  );
};

// メインコンポーネント（Provider + Display）
const Counter = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () => {
    if (count === 0) return;
    setCount((prevCount) => prevCount - 1);
  };

  return (
    <CounterContext.Provider value={{ count, increment, decrement }}>
      <CounterDisplay />
    </CounterContext.Provider>
  );
};

export default Counter;
