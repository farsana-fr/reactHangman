import { useState } from "react";
const generateNum = function (word) {
  //length applies to array and string, so no worries
  const randNum = Math.floor(Math.random() * word.length);

  return randNum;
};
let data = [
  {
    0: {
      arr: [
        "apple",
        "orange",
        "grapes",
        "pomegranate",
        "pineapple",
        "mango",
        "cherry",
        "papaya",
        "watermelon",
        "blueberry",
        "strawberry",
      ],
      hint: "A Fruit",
    },
    1: {
      // eslint-disable-next-line
      arr: [
        "Afghanistan",
        "Argentina",
        "Australia",
        "Azerbaijan",
        "Bahrain",
        "Bangladesh",
        "Belgium",
        "Bhutan",
        "Chile",
        "China",
        "Colombia",
        "Czech Republic",
        "Denmark",
        "Egypt",
        "Ethiopia",
        "Finland",
        "France",
        "Georgia",
        "Germany",
        "Hong Kong",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Italy",
        "Japan",
        "Jordan",
        "Kenya",
        "Kuwait",
        "Libya",
        "Madagascar",
        "Malaysia",
        "Maldives",
        "Mexico",
        "Nepal",
        "Netherlands",
        "New Zealand",
        "Palestine",
        "Poland",
        "Portugal",
        "Qatar",
        "Russia",
        "Saudi Arabia",
        "Singapore",
        "Spain",
        "Sri Lanka",
        "Taiwan",
        "Turkey",
        "Ukraine",
        "Uzbekistan",
        "Vietnam",
        "Yemen",
        "Zimbabwe",
      ],
      hint: "A country",
    },
    2: {
      arr: [
        "umbrella",
        "phone",
        "laptop",
        "computer",
        "paper",
        "mixi",
        "pen",
        "scissors",
        "fan",
        "towel",
        "comb",
        "wipes",
        "bangle",
        "earrings",
        "necklace",
        "hair",
        "bed",
        "table",
        "chair",
      ],
      hint: "You can find me when you just look around your house",
    },
  },
];
export default function App() {
  const [gameStart, setGameStart] = useState(false);
  const [word, setWord] = useState("");
  const [hint, setHint] = useState("");
  const [gameWord, setGameWord] = useState("");
  const [result,setResult]=useState(null);
  function handleGameStart(e) {
    e.preventDefault();

    setGameStart((gameStart) => true);
    let selectedCat = data[0][generateNum(Object.keys(data[0]))];
    let wordList = selectedCat.arr;
    setHint(selectedCat.hint);
    let wordT = wordList[generateNum(wordList)]
      .toLowerCase()
      .replaceAll(" ", "");
    console.log("wordT", wordT);
    setWord(wordT);
    let tWord = wordT;

    let temp;
    for (let i = 0; i < tWord.length / 2 + 1; i++) {
      temp = wordT.replace(wordT[generateNum(wordT)], "_");
      wordT = temp;
    }
    console.log("temp", temp);
    console.log("wordT", wordT);
    setGameWord(wordT);
    console.log("Game Started");
  }
  // function handleResult(value){
  //   if(value>0)
  //     setResult(1);
  //   else
  //     setResult(0);
  // }
  return (
    <div className="app">
      <Header />
      {!gameStart && <Welcome onStart={handleGameStart} />}
      {gameStart && (
        <GameArea
          setGameStart={setGameStart}
          hint={hint}
          word={word}
          gameWord={gameWord}
          setGameWord={setGameWord}  setResult={setResult}
        />
      )}
       {result!==null &&<Result result={result} setResult={setResult} setGameStart={setGameStart}/>}
    </div>
   
  );
}
function Result({result,setGameStart,setResult}) {
  return (
    <>
     <div class="overlay"></div>
    <div className={`msg text-center ${result>0?"win":"fail"}`}>
      <h2>{result>0?"YOU WON":"GAME OVER"}</h2>
      <button className="btn  " onClick={()=>{setResult(null);
        setGameStart(false)
      }}>Restart</button>
    </div>
    </>
  );
}
function GameArea({ setGameStart, hint, word, gameWord, setGameWord,setResult }) {
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [imgCount, setImgCount] = useState(0);
  function handleAttempt(e) {
    console.log("game word", gameWord);
    console.log(" word", word);
    setAttempt((attempt) => attempt + 1);

    //     setAttempt(prev => {
    //     const next = prev + 1;

    //     if(next >= 6){
    //         alert("You Failed");
    //         setGameStart(false);
    //     }

    //     return next;
    // });
    e.target.disabled = true;
    let letter = e.target.textContent.toLowerCase();
    console.log(e.target);
    console.log(letter);
    let ind = word.indexOf(letter);

    console.log(ind + "- ind of word");
    let indices = [];

    console.log("INDICES" + indices);
    if (ind < 0) {
      setScore((score) => score - 5);
      setImgCount((count) => count + 1);
      //alert(letter+" letter is not in word");
    } else
      for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
          indices.push(i);
        }
      }
    if (indices.length > 0) {
      console.log("IF", indices);

      // $(e.target).removeClass("btn-custom");
      // $(e.target).addClass("btn-success");
      // $(e.target).prop("disabled", true);

      // console.log(e.target);
      // console.log(indices);
      let temp = gameWord;
      let arr = temp.split("");
      console.log("TEMP" + temp);
      console.log("arr" + arr);
      for (let j = 0; j < indices.length; j++) arr[indices[j]] = letter;
      var result = arr.join("");
      console.log("Result", result);
      console.log("TEMP" + temp);
      if (result !== temp) {
        setScore((score) => score + 10);
        setGameWord(result);
      }
      if (result && !result.includes("_")) {
        console.log("Stop", result);
        setTimeout(() => {
         // alert("You WON");
         setResult(1)
        //  setGameStart(false);
        }, 1000);
      }
    }
    console.log(attempt);
    if (attempt >= 5) {
      setTimeout(() => {
        // alert("GAME OVER");
      setResult(0)
       // setGameStart(false);
      }, 1000);
    }
  }
  console.log("hint", hint);
  console.log("word", word);
  console.log("gameWord", gameWord);
  function handleHint() {
    setShowHint((showHint) => !showHint);
  }
  return (
    <div className="game-area container">
      <Score score={score} />
      <GuessWord word={gameWord} />
      <Image imgCount={imgCount} />
      <Hint showHint={showHint} openHint={handleHint} hint={hint} />
      <KeyBoard
        onHit={handleAttempt}
        attempt={attempt}
        setGameStart={setGameStart}
      />
    </div>
  );
}
function Score({ score }) {
  return (
    <div className="score">
      <h4>{score}</h4>
    </div>
  );
}
function GuessWord({ word }) {
  return <h3 className="word">{word}</h3>;
}
function Image({ imgCount }) {
  return (
    <div className="image">
      <img src={`./images/${imgCount}.jpg`} alt="Hangman" />
    </div>
  );
}
function Hint({ showHint, hint, openHint }) {
  return (
    <div className="hint" onClick={openHint}>
      Hint
      {showHint && <span>{hint}</span>}
    </div>
  );
}
function KeyBoard({ onHit }) {
  function ButtonComp({ onHit, children }) {
    return (
      <button className="btn btn-outline btn-custom keys" onClick={onHit}>
        {children}
      </button>
    );
  }
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const characters = [...alphabets];
  console.log(characters);
  return (
    <>
      <div className="keyboard">
        <div className="text-center">
          {characters.map((char) => (
            <ButtonComp onHit={onHit}>{char}</ButtonComp>
          ))}
        </div>
      </div>
    </>
  );
}

function Header() {
  return <h1 className="container text-center">Hangman</h1>;
}
function Welcome({ onStart }) {
  return (
    <>
      <div className="welcome text-center container ">
        <h3>Welcome to the Game</h3>
        <button className="btn start btn-custom" onClick={onStart}>
          Start Game
        </button>
      </div>
    </>
  );
}
