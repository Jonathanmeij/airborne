interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  dark?: boolean;
}

export default function QuantityInput({
  value,
  onChange,
  dark,
}: QuantityInputProps) {
  function decrement() {
    if (value > 1) {
      onChange(value - 1);
    }
  }

  return (
    <div className="flex items-center">
      <button
        className={`flex h-8 w-8 items-center justify-center rounded-l-md border text-center ${
          dark
            ? "border-bunker-700 bg-bunker-800 text-white"
            : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
        } `}
        onClick={() => decrement()}
      >
        -
      </button>
      <div
        className={`flex h-8 w-8 items-center justify-center border-b border-t text-center ${
          dark
            ? "border-bunker-700 bg-bunker-800 text-white"
            : "border-gray-300 bg-white  text-gray-500"
        }`}
      >
        {value}
      </div>
      <button
        className={`flex h-8 w-8 items-center justify-center rounded-r-md border text-center ${
          dark
            ? "border-bunker-700 bg-bunker-800 text-white"
            : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
        } `}
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  );
}
