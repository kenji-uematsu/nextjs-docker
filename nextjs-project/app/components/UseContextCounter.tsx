import { useContext } from "react";
import { CounterContext } from "./UseContextCounterContext";

const UseContextCounter = () => {
  // contextの値を取得
  const { count, increment, decrement } = useContext(CounterContext) ?? {};

  return (
    <div>
      <p>{count}</p>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  );
};

export default UseContextCounter;
