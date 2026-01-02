export default function AuthError({ error }: { error: string }) {
  return (
    error && (
      <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
        {error}
      </div>
    )
  )
}