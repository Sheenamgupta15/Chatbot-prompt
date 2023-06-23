
import React, { useState } from 'react'
import symptoms from './keywords.jsx';
import { Configuration } from 'openai'
import Model from './Model';
const { OpenAIApi } = require("openai");


const key_rbt = "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"

const configuration = new Configuration({
  apiKey: key_rbt
})
// delete configuration.baseOptions.headers['User-Agent'];
const openai = new OpenAIApi(configuration);
function containsKeyword(rbt) {
  for (let i = 0; i < symptoms.length; i++) {
    if (rbt.toLowerCase().includes(symptoms[i])) {
      return true;
    }
  }
  return false;
}
const Chat = () => {
  const [prompt, setPrompt] = useState("general")
  const [response, setresponse] = useState("")
  const [input, setinput] = useState("")
  const handleSubmit = async () => {
    let rbt = prompt
    rbt = rbt + " also write precautions for the same"

    setPrompt(rbt)
    console.log("final Prompt -> " + prompt)
    if (true) {
      const response = await openai.createChatCompletion({
        model: Model,
        messages: [{ role: "system", content: "You are a DoctorAI and your task is to consult people on Healthcare and personal care. If anything other than health care or personal care is asked then you reply with ```Can't help you in this```" }, { role: "user", content: prompt }],
        max_tokens: 350
      });
      console.log(response.data.choices[0].message);
      setresponse(response.data.choices[0].message.content)
    }
    else {
      const ans = 'sorry cannot help!';
      console.log(ans);
      setresponse(ans);
    }

  }
  const backgroundImage = {
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://thumbs.dreamstime.com/b/doctor-holding-chatbot-binary-code-d-rendering-view-151915065.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  return (
    <div style={backgroundImage} className='grid place-items-center bg-slate-400 h-screen '>
      <h1 className='text-5xl font-bold tracking-wider relative top:0 text-white'>Welcome to the Healthcare chatbot</h1>
      <div className='flex '>
        <input className=' text-2xl bg-slate-100 border-2 w-[900px]' placeholder='Enter the Question' onChange={(e) => {
          setPrompt(e.target.value)
          console.log(e.target.value)
        }}></input>
        <button className="bg-slate-300 p-5 text-xl" onClick={handleSubmit}>Submit</button>
      </div>
      <div className='flex mr-[200px] ml-[200px] border-2'>

        <h1 className='text-left font-bold text-white text-xl p-5'>{response}</h1>
      </div>

    </div>
  )

}

export default Chat