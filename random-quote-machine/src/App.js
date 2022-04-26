import React, {useEffect, useState}  from 'react';
import { IconContext } from 'react-icons';
import { FaTwitter } from "react-icons/fa";
import './App.scss'
import colorsArr from './colorsArray'



let quoteData = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

const bare = () => {
  return (
    <IconContext.Provider>
    <div>
      <FaTwitter />
    </div>
    </IconContext.Provider>
  )
}

function App(){  
  const [quote, setQuote] = useState("Whatever the mind of man can conceive and believe, it can achieve.")
  const [author, setAuthor] = useState("- Napoleon Hill")
  const [randomNum, setRandomNum] = useState(0)
  const [quotesArr, setQuotesArr] = useState(null)
  const [changeColor, setChangeColor] = useState('#E6B3B3')

  const fetchQuotes = async (url) => {
    const response =  await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArr(parsedJSON.quotes)
    
   }

  useEffect(() => {
    fetchQuotes(quoteData)
  }, [quoteData])


  
  const getQuotes = () => {
    let random = Math.floor(quotesArr.length * Math.random())
    setRandomNum(random)
    setChangeColor(colorsArr[random] )
    setQuote(quotesArr[random].quote)
    setAuthor(quotesArr[random].author)
  }

   return (
      <div className='App' style={
        {backgroundColor:changeColor,
      color:changeColor}}>
        <div id='quote-box' >
        <p id='text' style={{
          color:changeColor}}>
          "{quote}"
          </p>
        <p id='author'>-{author}</p>
        <a style={
        {
      color:changeColor}} id='tweet-quote' href=
        {encodeURI("https://twitter.com/intent/tweet?text=${quote} -${author}")} 
        target=
        {"_blank"}><FaTwitter /></a>     
        <button style={{
          backgroundColor:changeColor}} id='new-quote' onClick={() => getQuotes()}>New quote</button>
      
        </div>
      
      </div>
    )
  }


export default App;

