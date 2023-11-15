
import React, { useEffect, useState } from 'react'
import './lan.css'
import axios from 'axios';
import { useSpeechSynthesis } from 'react-speech-kit';


function Language() {
  // speaks functionality added 
  const{speak}=useSpeechSynthesis();

    const[option,setOption]=useState([])
    const[to,setTo]=useState('en')
    const[from,setFrom]=useState('en')
    const[input,setInput]=useState()
    const[output,setOuput]=useState()
// ------------------------------------------------------------------------
    useEffect(()=>{
        // this is a language api
        axios
      .get('https://libretranslate.de/languages', {
        headers: { accept: 'application/json' },
      }).then((res) => {
        console.log(res.data);
        setOption(res.data)
        
      });

    },[])
    // --------------------------------------------------------------------

    //api for language translation
     // curl -X POST "https://libretranslate.de/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=hello&source=en&target=es&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
// ------------------------------------------------------------------------------
    //  Translation api
    // -------------------------------------------------------------------
     
    function translater(){
       // curl -X POST "https://libretranslate.de/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=hello&source=en&target=es&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
       
       const params = new URLSearchParams();
       params.append('q', input);
       params.append('source', from);
       params.append('target', to);
       params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

       

       axios.post('https://libretranslate.de/translate',params, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((res)=>{
      console.log(res.data)
      // let obj=res.data.translatedText;
      // const myJSON = JSON.stringify(obj); 
      // setOuput(myJSON)
      // console.log(myJSON)
      setOuput(res.data.translatedText)
      
    })
         
     
    }

    function ListeningEvn(){
      let utruce;
       speak({text:output});
      
     
    }
  return (
    <>
    <div>
      <h1>Langwisting Translation</h1>
       <span className='from'>From:({from})</span> 
       <select className='mySelect' onChange={(e)=>{setFrom(e.target.value)}}>
          {
            option.map((opt)=>{
                return(
                    <option key={opt.code} value={opt.code}>{opt.name}</option>
                )
            })
          }
       </select>
        <span className='to'>To:({to})</span>
       <select className='mySelect' onChange={(e)=>{setTo(e.target.value)}}>
          
       {
            option.map((opt)=>{
                return(
                    <option key={opt.code} value={opt.code}>{opt.name}</option>
                )
            })
          }

       </select> <br /> 
       <div><br />
        <textarea name="" id="" cols="70" rows="10" className='texarea1' onInput={(e)=>{
          setInput(e.target.value)
        }}></textarea>
       </div><br />
       <div>
        <textarea name="" id="" cols="70" rows="10" className='texarea1' value={output}
        ></textarea>
       </div><br />
       <button className='mySelect' onClick={translater}>Translate</button>
       <button onClick={ListeningEvn}>Listern</button>
    </div>
    </>
  )
}

export default Language;
