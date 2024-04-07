import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import Die from './components/Die'

function App() {
  const [rolls, setRolls] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [mess, setMess] = useState("Roll until all dice are the same. Click each die to freeze it at its current value between rolls.");
  const { width, height } = useWindowSize();
  const [bestTime, setBestTime] = useState(() => {
    const storedBestTime = localStorage.getItem("bestTime");
    return storedBestTime !== null ? JSON.parse(storedBestTime) : { minute: 59, second: 59, miniSec: 999 };
  });

  // Timer state variables
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [miniSec, setMiniSec] = useState(0);

  // check game result
  useEffect(() => {
    const check = rolls.every(dice => dice.isHeld && dice.value === rolls[0].value)
    if (check) {
      setTenzies(check);
      setMess("You won!");
    }
  }, [rolls])

  // get best time
  useEffect(() => {
    if (tenzies) {
      // Check if the current time is shorter than the best time
      if (minute < bestTime.minute || 
          (minute === bestTime.minute && second < bestTime.second) || 
          (minute === bestTime.minute && second === bestTime.second && miniSec < bestTime.miniSec)) {
        setBestTime({ minute, second, miniSec });
        localStorage.setItem("bestTime", JSON.stringify({ minute, second, miniSec }));
      }
    }
  }, [tenzies]);

  // Timer logic
  useEffect(() => {
    let interval;

    if (!tenzies) {
      interval = setInterval(() => {
        setMiniSec(prevMiniSec => {
          let newMiniSec = prevMiniSec + 5;
          if (newMiniSec >= 1000) {
            newMiniSec = 0;
            setSecond(prevSecond => {
              let newSecond = prevSecond + 1;
              if (newSecond >= 60) {
                newSecond = 0;
                setMinute(prevMinute => prevMinute + 1);
              }
              return newSecond;
            });
          }
          return newMiniSec;
        });
      }, 5);
    }

    return () => clearInterval(interval);
  }, [tenzies]);

  // initial roll
  function allNewDice() {
    const roll = [];
    let ranNum = 0;
    for (let i = 0; i < 10; i++) {
      ranNum = Math.ceil(Math.random() * 6);
      roll.push({
        id: nanoid(),
        value: ranNum,
        isHeld: false
      });
    }
    return roll;
  }

  function rollDices() {

    // const check = rolls.every(dice => dice.isHeld && dice.value === rolls[0].value)

    if (!tenzies) {
      setRolls(prev => {
        return prev.map(dice => {
          return dice.isHeld ? dice : { ...dice, value: Math.ceil(Math.random() * 6) }
        })
      })
    }
    // else {
    //   setTenzies(check);
    //   setMess("You won!");
    // }

  }

  function holdDice(id) {
    setRolls(prev => {
      return prev.map(dice => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
      })
    })
  }

  function resetGame() {
    setRolls(allNewDice());
    setTenzies(false);
    setMess("Roll until all dice are the same. Click each die to freeze it at its current value between rolls.");
    setMinute(0);
    setSecond(0);
    setMiniSec(0);
  }

  function showTime(time) {
    if (time < 10) {
      return `0${time}`
    } else {
      return time
    }
  }

  return (
    <>
      <main>
        <div className='content'>
          <div className="title">
            <h1>Tenzies</h1>
            <p className="instructions">{mess}</p>
            <div className='timer'>
              <p>Time: {showTime(minute)}:{showTime(second)}:{showTime(miniSec)}</p>
              <p>Best time: {showTime(bestTime.minute)}:{showTime(bestTime.second)}:{showTime(bestTime.miniSec)}</p>
            </div>
          </div>
          <div className='dices'>
            {rolls.map((dice) => (
              <Die
                isHeld={dice.isHeld}
                value={dice.value}
                key={dice.id}
                hold={() => holdDice(dice.id)}
              />
            ))}
          </div>
          {tenzies
            ?
            <>
              <Confetti width={width} height={height} />
              <button id="roll-btn" onClick={resetGame}>New Game</button>
            </>
            :
            <button id="roll-btn" onClick={rollDices}>Roll</button>
          }
        </div>
      </main>
    </>
  )
}

export default App
