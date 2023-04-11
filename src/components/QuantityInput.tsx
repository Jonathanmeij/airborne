interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
}

export default function QuantityInput({ value, onChange }: QuantityInputProps) {
  function decrement() {
    if (value > 1) {
      onChange(value - 1);
    }
  }

  return (
    <div className="flex items-center">
      <button
        className="flex h-8 w-8 items-center justify-center rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
        onClick={() => decrement()}
      >
        -
      </button>
      <div className="flex h-8 w-8 items-center justify-center border-b border-t border-gray-300 bg-white text-center text-gray-500">
        {value}
      </div>
      <button
        className="flex h-8 w-8 items-center justify-center rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  );
}
