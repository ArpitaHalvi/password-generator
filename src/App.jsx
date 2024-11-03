import React, { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllow) str += "0123456789";
    if (charAllow) str += "!@#$%^&*+=-_[]{}~`";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllow, charAllow, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(
    () => passwordGenerator(),
    [length, numAllow, charAllow, setPassword]
  );

  return (
    <div className="flex bg-black h-screen w-full justify-center items-center flex-col gap-10 select-none">
      <h1 className="text-3xl text-white">PASSWORD GENERATOR</h1>
      <div className=" bg-gray-400 p-2 rounded">
        <div className="flex justify-between  p-2">
          <input
            type="text"
            className="w-full rounded-tl rounded-bl px-2 border select-none outline-none"
            value={password}
            ref={passwordRef}
            readOnly
          />
          <button
            className="bg-cyan-200 rounded-tr rounded-br px-4 py-2 font-bold hover:bg-cyan-400"
            onClick={copyPassword}
          >
            COPY
          </button>
        </div>
        <div className="flex justify-center gap-3">
          <input
            type="range"
            id="pass-range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="pass-range">Length({length})</label>
          <input
            type="checkbox"
            id="numbers"
            defaultChecked={numAllow}
            onChange={() => {
              setNumAllow((prev) => !prev);
            }}
            color="blue"
          />
          <label htmlFor="numbers">Numbers</label>
          <input
            type="checkbox"
            defaultChecked={charAllow}
            id="characters"
            onChange={() => {
              setCharAllow((prev) => !prev);
            }}
          />
          <label htmlFor="characters">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
