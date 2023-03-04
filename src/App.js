import {useState} from "react";

const operandVariants = ['+', '-', '*']
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const getRandomOperand = () => operandVariants[getRandomInt(0, 2)]
const getRandomNumber = () => getRandomInt(0, 10)
const calculate = (n1, n2, operand) => {
  if (operand === '+') return n1 + n2
  if (operand === '-') return n1 - n2
  if (operand === '*') return n1 * n2
}
const initialCounters = [
  {
    id: "pass",
    value: 0
  },
  {
    id: "fail",
    value: 0
  }
]
function App() {
  const n1Initial = getRandomNumber()
  const n2Initial = getRandomNumber()
  const operandInitial = getRandomOperand()

  const [n1, setN1] = useState(n1Initial)
  const [n2, setN2] = useState(n2Initial)
  const [operand, setOperand] = useState(operandInitial)
  const [answer, setAnswer] = useState()
  const [resolution, setResolution] = useState()
  const [result, setResult] = useState(calculate(n1Initial, n2Initial, operandInitial))
  const [counts, setCounts] = useState(initialCounters)
   const shake = () => {
    const n1 = getRandomNumber(), n2 = getRandomNumber(), operand = getRandomOperand()
    setN1(n1)
    setN2(n2)
    setOperand(operand)
    setResult(calculate(n1, n2, operand))
  }
  const check = () => {
    if (answer === result) {
      setResolution('Correct')
        countCorrect('pass')
    } else {
      setResolution( 'Incorrect')
        countIncorrect('fail')
    }
    shake()
    setAnswer('')
  }
    const countCorrect = (id) => {
    const countNew = counts.map(el => el.id === id ? {...el, value: el.value + 1}: el)
    setCounts(countNew)
  }
  const countIncorrect = (id) => {
    const countNew = counts.map(el => el.id === id ? {...el, value: el.value + 1}: el)
    setCounts(countNew)
  }
  return (
    <div className="App">

      {n1} {operand} {n2} = <input type = 'number'
                                   value={answer} onChange={e => setAnswer(+e.target.value)}/>
      <button onClick={check}>Check</button>
      <hr/>
      {resolution}
      <hr/>
      <button onClick={shake}>Shake</button>
      <hr/>
      {result}
      <hr/>
      <table border={5}>
        <tr>
            <td bgcolor={'#00ff2a'}>CORRECT</td>
            <td bgcolor={'#ff1e00'}>INCORRECT</td>
        </tr>
        <tr>
          <td bgcolor={'#00ff2a'} key={countCorrect.id} ></td>
          <td bgcolor={'#ff1e00'} key={countIncorrect.id} ></td>
        </tr>
        </table>
      </div>
  )
}

export default App;
