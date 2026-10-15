import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import AmountDisplay from "./components/AmountDisplay";
import Button from "./components/Button";

function App() {
  const [text, setText] = useState("");

  const onPressButton = (value, variant) => {
    if(variant == "operator" && !String(text).trim()) return;
    if (variant == "operator" && /[+\-*/]$/.test(text)) return;

    setText(text + value)
  }

  const calcResult = () => {
    if(/[+\-*/]$/.test(text)) {
      String(text).replace(/[+\-*/]$/, '')
    }

    const result = eval(text)
    if(result == "Infinity") return setText("Nan")
    setText(String(result))
  }

  const clearValue = () => {
    setText("")
  }

  return (
    <div className="bg-gradient-to-br from-[#221A4D] via-[#080A16] to-[#0E1F4A] w-screen h-screen flex justify-center items-center">
      <div className="w-[40%] h-[80%] bg-white/10 backdrop-blur-md shadow-4xl rounded-3xl p-5">
        <AmountDisplay value={text} setValue={setText} />

        <div class="grid grid-cols-4 gap-4 py-4 mx-auto">
          <Button variant="number" value="7" onPress={onPressButton} />
          <Button variant="number" value="8" onPress={onPressButton} />
          <Button variant="number" value="9" onPress={onPressButton} />
          <Button variant="operator" value="+" onPress={onPressButton} />

          <Button variant="number" value="4" onPress={onPressButton} />
          <Button variant="number" value="5" onPress={onPressButton} />
          <Button variant="number" value="6" onPress={onPressButton} />
          <Button variant="operator" value="-" onPress={onPressButton} />

          <Button variant="number" value="1" onPress={onPressButton} />
          <Button variant="number" value="2" onPress={onPressButton} />
          <Button variant="number" value="3" onPress={onPressButton} />
          <Button variant="operator" value="*" onPress={onPressButton} />

          <Button variant="number" value="0" onPress={onPressButton} />
          <Button variant="number" value="00" onPress={onPressButton} />
          <Button variant="number" value="." onPress={onPressButton} />
          <Button variant="operator" value="/" onPress={onPressButton} />

          <Button variant="ac" value="AC" onPress={clearValue} />
          <Button variant="submit" value="=" onPress={calcResult} />
        </div>
      </div>
    </div>
  );
}

export default App;
