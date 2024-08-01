interface ButtonProps {
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
  isDisabled?: boolean;
  children?: React.ReactNode;
}

function Button({
  onClick,
  className,
  ariaLabel,
  isDisabled,
  children,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}

export default Button;
