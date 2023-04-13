import './App.css';
import { useEffect, useState } from 'react';


const QuoteBox = (props) => {
  return (
    <div id="text-author" className="p-3">
      <h4 className="p-3 mt-2 text-center" id="text" style={{color: `#${props.textColor}`}}>{`"${props.quote_var}"`}</h4>
      <h5 className="pe-5 text-end" id="author" style={{color: "black"}}>{props.author_var}</h5>
    </div>
  )
}

const BottomPanel = (props) => {
  return (
    <div className='d-flex justify-content-between p-2'>
      <div className="ps-4 mb-3">
        <a className="twitter-share-button btn btn-primary"
  href={`https://twitter.com/intent/tweet?text=${props.quote}`} id="tweet-quote" target="_blank"><i className="bi bi-twitter"></i> Tweet</a>
      </div>
      <div className='pe-4 mb-3'>
        <button type="button" className="btn btn-dark" id="new-quote" onClick={props.callGenerateNewQuote}>New quote</button>
      </div>
    </div>
  )
}

const App = () => {
  const [quotePhrase, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [bgcolor, setBGColor] = useState("");

  
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f2f69ae8d5mshfdd830ab97f9bafp1fe8e5jsn86e642c32065',
      'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com'
    }
  };

  const setQuoteAndAuthor = (result) => {
    setQuote(result[0].text);
    setAuthor(result[0].author);
  }

  const changeBGColor = () => {
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    setBGColor(randomColor);
  }

  const generateNewQuote = () => {
    fetch('https://famous-quotes4.p.rapidapi.com/random?category=all&count=1', options)
      .then(response => response.json())
      .then(response => setQuoteAndAuthor(response))
      .catch(err => console.error(err));
    changeBGColor();
  }

  useEffect(() => {
    generateNewQuote();
  }, []);
 
  return (
    <div className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh", backgroundColor: `#${bgcolor}`}}>
       <div id="quote-box" className="box rounded border" style={{width: 600, maxHeight: 550, backgroundColor: "white"}}>
          <QuoteBox quote_var={quotePhrase} author_var={author} textColor={bgcolor}/>
          <BottomPanel quote={quotePhrase} callGenerateNewQuote={generateNewQuote} />
       </div>
    </div>
  )
}

export default App;
