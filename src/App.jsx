import { useState, useEffect, useCallback } from "react";
import AmountDisplay from "./components/AmountDisplay";
import Button from "./components/Button";
import { safeEvaluate, canAddDecimal } from "./utils/calculator";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [previousExpression, setPreviousExpression] = useState("");
  const [isResultCalculated, setIsResultCalculated] = useState(false);

  const clearValue = useCallback(() => {
    setText("");
    setPreviousExpression("");
    setIsResultCalculated(false);
  }, []);

  const deleteLastChar = useCallback(() => {
    if (isResultCalculated) {
      clearValue();
      return;
    }
    setText((prev) => (prev.length > 0 ? prev.slice(0, -1) : ""));
  }, [isResultCalculated, clearValue]);

  const calcResult = useCallback(() => {
    if (!text.trim()) return;

    // Remove any trailing operators before evaluating
    const sanitized = text.trim().replace(/[+\-*/×÷−]+$/, "");
    if (!sanitized) return;

    const result = safeEvaluate(sanitized);
    setPreviousExpression(`${sanitized} =`);
    setText(result);
    setIsResultCalculated(true);
  }, [text]);

  const onPressButton = useCallback(
    (value, variant) => {
      // 1. Number input
      if (variant === "number") {
        if (isResultCalculated) {
          setIsResultCalculated(false);
          if (value === ".") {
            setText("0.");
            return;
          }
          setText(value === "00" ? "0" : value);
          return;
        }

        // Handle decimal point logic
        if (value === ".") {
          if (!canAddDecimal(text)) return;
          if (!text || /[+\-*/×÷−]$/.test(text.trim())) {
            setText((prev) => prev + "0.");
            return;
          }
          setText((prev) => prev + ".");
          return;
        }

        // Handle double zero
        if (value === "00") {
          if (!text || text === "0" || /[+\-*/×÷−]$/.test(text.trim())) {
            setText((prev) => (prev === "0" ? "0" : prev + "0"));
            return;
          }
        }

        // Prevent multiple leading zeros (e.g., '05' -> '5')
        if (text === "0" && value !== ".") {
          setText(value);
          return;
        }

        setText((prev) => prev + value);
        return;
      }

      // 2. Operator input (+, -, *, /)
      if (variant === "operator") {
        if (isResultCalculated) {
          setIsResultCalculated(false);
        }

        const trimmed = text.trim();

        // If text is empty and user clicked '-', allow negative sign
        if (!trimmed) {
          if (value === "-") setText("-");
          return;
        }

        // If ends with an operator, replace it instead of ignoring it
        if (/[+\-*/×÷−]$/.test(trimmed)) {
          setText(trimmed.slice(0, -1) + value);
          return;
        }

        setText(trimmed + value);
        return;
      }

      // 3. Percent (%)
      if (variant === "percent") {
        if (!text || /[+\-*/×÷−]$/.test(text.trim())) return;
        const currentResult = safeEvaluate(text);
        if (currentResult !== "Error") {
          const percentValue = parseFloat(
            (parseFloat(currentResult) / 100).toFixed(10)
          );
          setText(String(percentValue));
          setIsResultCalculated(true);
          setPreviousExpression(`${currentResult} % =`);
        }
      }
    },
    [text, isResultCalculated]
  );

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if modifier keys like Ctrl/Meta are held (e.g. Ctrl+R)
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const key = e.key;

      if (key >= "0" && key <= "9") {
        onPressButton(key, "number");
      } else if (key === ".") {
        onPressButton(".", "number");
      } else if (key === "+") {
        onPressButton("+", "operator");
      } else if (key === "-") {
        onPressButton("-", "operator");
      } else if (key === "*") {
        onPressButton("*", "operator");
      } else if (key === "/") {
        e.preventDefault(); // Prevent browser quick search
        onPressButton("/", "operator");
      } else if (key === "%") {
        onPressButton("%", "percent");
      } else if (key === "Enter" || key === "=") {
        e.preventDefault();
        calcResult();
      } else if (key === "Backspace") {
        deleteLastChar();
      } else if (key === "Escape") {
        clearValue();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onPressButton, calcResult, deleteLastChar, clearValue]);

  return (
    <div className="bg-gradient-to-br from-[#120F2D] via-[#080A16] to-[#0B1536] min-h-screen w-full flex flex-col justify-center items-center p-4 sm:p-6 text-white font-sans selection:bg-purple-500 selection:text-white">
      {/* Calculator Window Frame */}
      <div className="w-full max-w-[380px] sm:max-w-[420px] bg-white/[0.06] backdrop-blur-2xl border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] rounded-3xl p-5 sm:p-6 flex flex-col gap-4">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-1 px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block shadow-sm"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shadow-sm"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-sm"></span>
          </div>
          <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Modern Calculator
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono border border-purple-500/30">
            PRO
          </span>
        </div>

        {/* Display Screen */}
        <AmountDisplay value={text} previousExpression={previousExpression} />

        {/* 5 x 4 Keypad Grid */}
        <div className="grid grid-cols-4 gap-3 sm:gap-3.5 pt-2">
          {/* Row 1 */}
          <Button
            variant="special"
            value="AC"
            onPress={clearValue}
            ariaLabel="All Clear"
          />
          <Button
            variant="special"
            value="DEL"
            displayValue="⌫"
            onPress={deleteLastChar}
            ariaLabel="Backspace"
          />
          <Button
            variant="operator"
            value="%"
            onPress={(val) => onPressButton(val, "percent")}
            ariaLabel="Percentage"
          />
          <Button
            variant="operator"
            value="/"
            displayValue="÷"
            onPress={(val) => onPressButton(val, "operator")}
            ariaLabel="Divide"
          />

          {/* Row 2 */}
          <Button variant="number" value="7" onPress={onPressButton} />
          <Button variant="number" value="8" onPress={onPressButton} />
          <Button variant="number" value="9" onPress={onPressButton} />
          <Button
            variant="operator"
            value="*"
            displayValue="×"
            onPress={(val) => onPressButton(val, "operator")}
            ariaLabel="Multiply"
          />

          {/* Row 3 */}
          <Button variant="number" value="4" onPress={onPressButton} />
          <Button variant="number" value="5" onPress={onPressButton} />
          <Button variant="number" value="6" onPress={onPressButton} />
          <Button
            variant="operator"
            value="-"
            displayValue="−"
            onPress={(val) => onPressButton(val, "operator")}
            ariaLabel="Subtract"
          />

          {/* Row 4 */}
          <Button variant="number" value="1" onPress={onPressButton} />
          <Button variant="number" value="2" onPress={onPressButton} />
          <Button variant="number" value="3" onPress={onPressButton} />
          <Button
            variant="operator"
            value="+"
            displayValue="+"
            onPress={(val) => onPressButton(val, "operator")}
            ariaLabel="Add"
          />

          {/* Row 5 */}
          <Button variant="number" value="0" onPress={onPressButton} />
          <Button variant="number" value="00" onPress={onPressButton} />
          <Button variant="number" value="." onPress={onPressButton} />
          <Button
            variant="submit"
            value="="
            onPress={calcResult}
            ariaLabel="Equals"
          />
        </div>

        {/* Keyboard Helper Footer */}
        <div className="pt-2 text-center text-[11px] text-slate-400/80 flex items-center justify-center gap-2">
          <span>⌨️ Keyboard Supported</span>
          <span>•</span>
          <span>Esc = AC</span>
          <span>•</span>
          <span>Enter = =</span>
        </div>
      </div>
    </div>
  );
}

export default App;
