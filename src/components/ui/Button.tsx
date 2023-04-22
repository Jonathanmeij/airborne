/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { cva, type VariantProps } from "class-variance-authority";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export const buttonStyles = cva("  border-1", {
  variants: {
    color: {
      primary: " bg-sky-500 text-white hover:bg-sky-600  ",
      secondary:
        " bg-white text-black  text-san-marino-900 hover:bg-zinc-200 shadow-md",
      secondaryDark: " bg-zinc-800 text-white hover:bg-zinc-700 ",
      secondaryDarker: " bg-zinc-900 text-white hover:bg-zinc-800 ",
      black: " bg-zinc-950 text-white hover:bg-zinc-900 ",
      none: "bg-transparent hover:bg-san-marino-50 border-0",
      noneLight: "bg-transparent text-zinc-200  border-0",
      danger: " bg-red-100 text-red-800 hover:bg-red-200 border-red-500",
    },
    padding: {
      none: "p-0",
      normal: "py-2 px-4",
      small: "p-1",
      wide: "py-2 px-8",
    },
    fullWidth: {
      true: "w-full",
      false: "w-auto",
    },
    textSize: {
      normal: "text-base",
      small: "text-sm",
      large: "text-lg",
      medium: "text-md",
    },
    rounded: {
      rounded: "rounded",
      roundedLg: "rounded-lg",
      full: "rounded-full",
      none: "",
    },
    animate: {
      true: " transition ease-in-out hover:scale-105 ",
      false: "",
    },
    font: {
      normal: "font-normal",
      bold: "font-bold",
      semibold: "font-semibold",
      medium: "font-medium",
    },
    textAlign: {
      left: "text-left",
      right: "text-right",
      center: "text-center",
    },
  },
  defaultVariants: {
    color: "none",
    padding: "normal",
    fullWidth: false,
    rounded: "full",
    animate: false,
    font: "medium",
    textAlign: "center",
    textSize: "normal",
  },
});

export interface ButtonProps extends VariantProps<typeof buttonStyles> {
  className?: string;
  onClick?: () => void;
  onMouseOver?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  rounded?: "rounded" | "roundedLg" | "full" | "none";
}

function Button({
  color,
  onClick,
  type,
  children,
  padding,
  fullWidth,
  onMouseOver,
  className,
  rounded,
  animate,
  font,
  textAlign,
  textSize,
}: ButtonProps) {
  return (
    <button
      className={`${buttonStyles({
        color,
        padding,
        fullWidth,
        rounded,
        animate,
        font,
        textAlign,
        textSize,
      })} ${className ?? ""}`}
      onClick={onClick}
      type={type}
      onMouseOver={onMouseOver}
    >
      {children}
    </button>
  );
}

export default Button;
