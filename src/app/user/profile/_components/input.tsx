type ProfileFieldProps = {
  id: string,
  label: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  disabled: boolean
  p?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>
}

export default function ProfileField({ id, label, value, onChange, disabled, p }: ProfileFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        required
        disabled={disabled}
      />
      {p && <p {...p} />}
    </div>
  )
}