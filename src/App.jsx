import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import AmountDisplay from "./components/AmountDisplay";
import Button from "./components/Button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-gradient-to-br from-[#221A4D] via-[#080A16] to-[#0E1F4A] w-screen h-screen flex justify-center items-center">
      <div className="w-[40%] h-[80%] bg-white/10 backdrop-blur-md shadow-4xl rounded-3xl p-5">
        <AmountDisplay />

        <div class="grid grid-cols-4 gap-4 py-4 mx-auto">
          <Button variant="number" value="7" />
          <Button variant="number" value="8" />
          <Button variant="number" value="9" />
          <Button variant="operator" value="+" />

          <Button variant="number" value="4" />
          <Button variant="number" value="5" />
          <Button variant="number" value="6" />
          <Button variant="operator" value="-" />

          <Button variant="number" value="1" />
          <Button variant="number" value="2" />
          <Button variant="number" value="3" />
          <Button variant="operator" value="x" />

          <Button variant="number" value="0" />
          <Button variant="number" value="00" />
          <Button variant="number" value="." />
          <Button variant="operator" value="/" />

          <Button variant="ac" value="AC" />
          <Button variant="submit" value="=" />
        </div>
      </div>
    </div>
  );
}

export default App;
