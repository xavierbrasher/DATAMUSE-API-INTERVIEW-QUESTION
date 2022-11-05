import axios from "axios";
import { useEffect, useState } from "react";

interface DataProps {
  word: string;
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

type responce = Array<Object>;

const APISITE = "https://api.datamuse.com";

const fetchData = async (word: string) => {
  return axios
    .get(APISITE + "/words?", {
      params: new URLSearchParams({ ml: word }),
    })
    .then((res) => {
      return (res.data as Array<object>).slice(0, 10);
    })
    .catch((err) => {
      return err;
    });
};

type ShowWordProps = {
  synonym: any;
  index: number;
};

const ShowWord = ({ synonym }: ShowWordProps) => {
  return (
    <div className="w-auto my-2 h-auto border-2 font-black border-slate-800 px-3">
      <h3 className="text-3xl font-black">{synonym.word}</h3>
      <p className="font-black">Score: {synonym.score}</p>
    </div>
  );
};

const Data = ({ word }: DataProps) => {
  const [synonyms, setSynonyms] = useState<responce>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    fetchData(word)
      .then((res) => {
        setSynonyms(res);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [word]);

  return (
    <>
      {synonyms && loaded ? (
        <>
          <h2 className="text-2xl font-black">
            Top 10 <br />
            Synonyms for: {capitalizeFirstLetter(word)}
          </h2>
          {synonyms.map((val, idx) => {
            return <ShowWord index={idx} synonym={val} />;
          })}
        </>
      ) : (
        <h2 className="font-black text-3xl">Loading...</h2>
      )}
    </>
  );
};

export default Data;
