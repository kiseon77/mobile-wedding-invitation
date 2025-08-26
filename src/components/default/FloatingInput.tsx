type FloatingInputProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function FloatingInput({
  label,
  name,
  type = "text",
  value,
  onChange,
}: FloatingInputProps) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="peer w-full min-h-12 px-3 pt-4 pb-1 text-base text-gray-800 bg-gray-100 border border-black/40 rounded-lg focus:outline-none focus:bg-white placeholder-transparent"
      />
      <label
        htmlFor={name}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base 
                    peer-focus:top-2 peer-focus:text-xs peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-700"
      >
        {label}
      </label>
    </div>
  );
}

export default FloatingInput;
