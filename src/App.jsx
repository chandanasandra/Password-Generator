import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react'
import { useCallback } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  // Useref hook
  const passwordRef = useRef(null);

  // Password generator - useCallback hook
  const passwordGenerator = useCallback(()=>{
    let pass = '';
    let string = 'ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let numberString = '0123456789';
    let specialCharString = '!@#$%&()+=}}[]';
    if(numberAllowed) string += numberString;
    if(charAllowed) string += specialCharString;

    for(var i=0;i<length-2;i++) {
      var index = Math.floor(Math.random() * string.length + 1);
      var char = string.charAt(index);
      pass +=char;
    }

    // Add numbers to the pool if allowed
    if (numberAllowed) {
      let num = numberString.charAt(
        Math.floor(Math.random() * numberString.length)
      );
      const randomIndex = Math.floor(Math.random() * (numberString.length + 1));
      pass =  pass.slice(0, randomIndex) + num + pass.slice(randomIndex);
    }

    // Add special characters to the pool if allowed
    if (charAllowed) {
      let char = specialCharString.charAt(
        Math.floor(Math.random() * specialCharString.length)
      );
      const randomIndex = Math.floor(Math.random() * (specialCharString.length + 1));
      pass = pass.slice(0, randomIndex) + char + pass.slice(randomIndex);
    }

    setPassword(pass);
  },[length, numberAllowed, charAllowed, setPassword]);

  // Copy password
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // UseEffect hook
  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <>
    <div className='w-full max-w-md bg-gray-800 rounded-lg mx-auto shadow-md px-4 py-3 my-8 text-orange-400'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow-md mb-4 rounded-lg overflow-hidden'>
        <input type='text' value={password} className='outline-none w-full py-1 px-3' placeholder='password' ref={passwordRef} readOnly/>
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipboard}>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type='range' value={length} min='8' max='50' className='cursor-pointer' onChange={(e)=> setLength(e.target.value)}/>
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox' defaultChecked={numberAllowed} className='cursor-pointer' onChange={()=> setNumberAllowed((prev)=>!prev)}/>
          <label>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox' defaultChecked={charAllowed} className='cursor-pointer' onChange={()=> setCharAllowed((prev)=>!prev)}/>
          <label>Special Charactors</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
