function AmountDisplay({ value, previousExpression }) {
  // Dynamically shrink font size if numbers get long
  const getTextSizeClass = (str) => {
    const len = str?.length || 0;
    if (len > 14) return "text-2xl sm:text-3xl";
    if (len > 9) return "text-3xl sm:text-4xl";
    return "text-4xl sm:text-5xl";
  };

  return (
    <div className="bg-[#0B0F1B]/90 border border-white/10 rounded-2xl w-full p-4 sm:p-5 flex flex-col justify-end items-end shadow-inner min-h-[110px] sm:min-h-[120px] transition-all">
      {/* Secondary / History Display */}
      <div className="text-slate-400 font-mono text-sm sm:text-base h-6 overflow-hidden text-ellipsis whitespace-nowrap tracking-wide">
        {previousExpression || ""}
      </div>

      {/* Primary Display */}
      <div
        className={`w-full font-bold text-right text-white tracking-tight overflow-x-auto whitespace-nowrap no-scrollbar transition-all ${getTextSizeClass(
          value
        )}`}
        role="region"
        aria-live="polite"
      >
        {value || "0"}
      </div>
    </div>
  );
}

export default AmountDisplay;
