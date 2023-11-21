import { useState } from "react";
import "./App.css";
import FinanceControl from "./components/FinanceControl/FinanceControl";
import Header from './components/Header/Header';
import { Movement } from "./models/interfaces/Movement/Movement";

function App() {
  const [currentBalance, setCurrentBalance] = useState([0]); // Current balance status
  const [currentExpenses, setCurrentExpenses] = useState([0]); // Current expense status
  const [movementsItens, setMovementsItens] = useState<Array<Movement>>([]); // State of movements

  const setNewMovement = (movement: Movement) => {
    if (movement) {
      setMovementsItens((prevMovements) => {
        const movements = [...prevMovements];
        movements.unshift({
          name: movement.name,
          value: movement.value,
          type: movement.type,
          id: Math.random().toString(),
        });
        return movements;
      });

      movement.type === 'Input' &&
        setCurrentBalance(
          (prevBalance) => prevBalance + Number(movement.value)
        );

      if (movement.type === 'Output') {
        setCurrentExpenses(
          (prevExpenses) => prevExpenses + Number(movement.value)
        );

        currentBalance > 0 &&
          setCurrentBalance(
            (prevBalance) => prevBalance - Number(movement.value)
          );
      }
    }
  };

  return (
    <div>
      <Header />
      <FinanceControl />
    </div>
  );
}

export default App;
