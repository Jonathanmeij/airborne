import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
interface InputProps {
  className?: string;
  placeholder?: string;
  name: string;
  error?: string;
  type?: string;
  register: any;
  options?: any;
  fullWidth?: boolean;
  defaultValue?: string;
  rows?: number;
  isRequired?: boolean;
  noLabel?: boolean;
  label?: string;
}

export function Input({
  className,
  placeholder,
  error,
  type,
  register,
  name,
  options,
  fullWidth,
  defaultValue,
  isRequired,
  noLabel,
  label,
}: InputProps) {
  return (
    <div className="flex w-full flex-col ">
      {!noLabel && (
        <label htmlFor={name} className="mb-2 block text-sm font-medium  ">
          {label ? label : name}{" "}
          {isRequired && <span className="text-blue-300">*</span>}
        </label>
      )}
      <input
        id={name}
        defaultValue={defaultValue}
        type={type}
        {...register(name, {
          ...options,
        })}
        placeholder={placeholder}
        className={`text-md border-zinc f
        ocus:ring-san-marino-500 block w-full   rounded-lg border  border-zinc-700 bg-zinc-800  
                 p-2.5 placeholder-zinc-400 focus:outline-none 
                focus:ring-2 ${className} ${
          fullWidth ? "w-full" : ""
        } place-self-auto
                ${error ? "border-red-300 " : ""}
        `}
      />
      {error && <span className="w-full text-sm text-red-400">{error}</span>}
    </div>
  );
}

export function TextArea({
  className,
  placeholder,
  error,
  register,
  name,
  options,
  fullWidth,
  defaultValue,
  rows,
  isRequired,
}: InputProps) {
  return (
    <div className="flex w-full flex-col ">
      <label htmlFor={name} className="mb-2 block text-sm font-medium ">
        {name} {isRequired && <span className="text-red-700">*</span>}
      </label>
      <textarea
        id={name}
        defaultValue={defaultValue}
        rows={rows}
        {...register(name, {
          ...options,
        })}
        placeholder={placeholder}
        className={`text-md border-san-marino-200 bg-san-marino-50 focus:ring-san-marino-500 block w-full max-w-md rounded-lg  border p-2.5   placeholder-zinc-400 focus:outline-none focus:ring-2 ${className} ${
          fullWidth ? "w-full" : ""
        }
                ${error ? "border-red-400 " : ""}
                `}
      />
      {error && <span className="w-full text-sm text-red-400">{error}</span>}
    </div>
  );
}

interface ListBoxProps {
  selected: Option;
  setSelected: (selected: Option) => void;
  options: Option[];
}

export type Option = {
  value: string;
};

export function ListboxElement({
  selected,
  setSelected,
  options,
}: ListBoxProps) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative ">
        <Listbox.Button className=" border-1 relative w-max rounded   bg-zinc-900 px-4 py-2  pl-3 pr-10  text-left text-base  text-white hover:bg-zinc-800">
          <span className="block truncate">{selected.value}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <UpDownIcon />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-max overflow-auto rounded-md bg-zinc-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-zinc-800 text-white" : "text-zinc-200"
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.value}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                        <CheckMark />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

function UpDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
      />
    </svg>
  );
}

function CheckMark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}
