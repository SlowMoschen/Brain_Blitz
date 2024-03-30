import useToggle from "../hooks/useToggle";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: "text" | "email" | "password";
  placeholder: string;
  className: string;
}

export default function Input({
  type,
  placeholder,
  className,
  name,
  onChange,
  ...rest
}: InputProps) {
  const [showPassword, toggleShowPassword] = useToggle(false);
  const capitalize = (s: string | undefined) => {
    if (!s) return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <>
      <div className="flex flex-col w-full p-2 relative">
        <label htmlFor={name} className="text-xl my-1">
          {capitalize(name)}
        </label>
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          name={name}
          placeholder={placeholder}
          className={className}
          onChange={onChange}
          {...rest}
        />
        {rest.required && <p className="text-xs opacity-50 my-1">*Pflichtfeld</p>}
        {type === "password" && (
          <span
            className="material-symbols-outlined text-bg-primary absolute right-4 top-12 cursor-pointer"
            onClick={() => toggleShowPassword()}
          >
            {showPassword ? "visibility_off" : "visibility"}
          </span>
        )}
      </div>
    </>
  );
}
