import React, {useCallback, useEffect, useState} from 'react';
import './App.css';

function App() {

    const [words, setWords] = useState<Record<string, string[]>>({});
    const [wordToSearch, setWordToSearch] = useState("");
    const [foundResult, setFoundResult] = useState<string[]>([]);

    const fetchWords = useCallback(async () => {
        const request = await fetch("data/words.json");
        const data = await request.json();
        setWords(data);
    }, [])

    useEffect(() => {
        fetchWords().catch(console.error)
    }, [fetchWords])

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWordToSearch(event.target.value)
    }

    const doSearch = (event: React.FormEvent) => {
        event.preventDefault();
        if (words[wordToSearch]) {
            setFoundResult(words[wordToSearch]);
        } else {
            setFoundResult([]);
        }
    }

    return (
        <div className="App">
            <h1>נִקּוּד</h1>
            <form className="inputs" onSubmit={doSearch}>
                <input type="search" dir="rtl" onChange={handleInput} value={wordToSearch} enterKeyHint="search" />
                <input type="submit" name="search" className="search" value="Search"  />
            </form>
            {
                <section className={`results ${foundResult.length > 0 ? "active" : ""}`}>
                    <div className="results-heading">Results</div>
                    {foundResult.map(e => <div className="result" key={e}>{e}</div>)}
                    <div className="translation"><a href={`https://translate.google.com/?sl=iw&text=${wordToSearch}&op=translate`} target="_blank" rel="noreferrer" >Translation</a></div>
                </section>
            }

        </div>
    );
}

export default App;
