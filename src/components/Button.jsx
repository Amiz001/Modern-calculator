const VARIANT_STYLES = {
  number:
    "bg-[#0F1427]/80 hover:bg-[#151C36] text-white border-white/10 shadow-lg hover:border-white/20",
  operator:
    "bg-[#162137]/90 hover:bg-[#1E2C48] text-purple-300 hover:text-purple-200 border-white/10 shadow-xl hover:border-purple-500/30",
  special:
    "bg-gradient-to-b from-[#2B2A38] to-[#1B1D29] text-rose-300 hover:text-rose-200 border-white/10 shadow-xl hover:border-rose-500/30",
  submit:
    "bg-gradient-to-br from-[#763EED] to-[#2661EB] text-white shadow-xl shadow-purple-900/40 border-purple-400/30 hover:brightness-110 hover:shadow-purple-700/50",
};

function Button({
  variant = "number",
  value,
  displayValue,
  onPress,
  className = "",
  ariaLabel,
}) {
  const baseStyles =
    "w-full h-16 sm:h-[72px] rounded-2xl flex justify-center items-center font-semibold text-2xl sm:text-3xl border transition-all duration-150 cursor-pointer select-none active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400";
  const variantClass = VARIANT_STYLES[variant] || VARIANT_STYLES.number;

  return (
    <button
      type="button"
      className={`${baseStyles} ${variantClass} ${className}`}
      onClick={() => onPress(value, variant)}
      aria-label={ariaLabel || String(value)}
    >
      <span>{displayValue || value}</span>
    </button>
  );
}

export default Button;
