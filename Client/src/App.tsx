import { useEffect, useState } from "react";
import Data from "./components/Data";

function App() {
  const [word, setWord] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setWord(e.target[0].value);
    e.target[0].value = "";
  };

  useEffect(() => {
    console.log("render");
  }, [word]);

  return (
    <div className="grid justify-center mx-3">
      <h1 className="text-3xl font-black mb-2">Synonym Site</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-4">
          <input
            className="bg-slate-500 px-2 border-2 border-slate-800 rounded text-2xl font-black mr-2 col-span-3"
            type="text"
          />
          <input
            type="submit"
            className="bg-green-400 text-2xl border-2 border-slate-800 rounded px-1 font-black w-auto"
            value={"Submit"}
          />
        </div>
      </form>
      {word ? <Data word={word} /> : <></>}
    </div>
  );
}

export default App;
