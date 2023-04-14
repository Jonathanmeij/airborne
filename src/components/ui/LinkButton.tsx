import { type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { buttonStyles } from "./Button";

export interface ButtonProps extends VariantProps<typeof buttonStyles> {
  className?: string;
  onClick?: () => void;
  onMouseOver?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  to: string;
  padding?: "none" | "small" | "normal";
}

function LinkButton({
  color,
  onClick,
  type,
  children,
  to,
  padding,
  fullWidth,
  onMouseOver,
  className,
  animate,
  font,
  textAlign,
  rounded,
}: ButtonProps) {
  return (
    <Link
      href={to}
      className={`${buttonStyles({
        color,
        padding,
        fullWidth,
        animate,
        font,
        textAlign,
        rounded,
      })} ${className ?? ""}`}
    >
      <button onClick={onClick} type={type} onMouseOver={onMouseOver}>
        {children}
      </button>
    </Link>
  );
}

export default LinkButton;
