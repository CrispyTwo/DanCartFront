import { Dispatch, SetStateAction, ChangeEvent } from "react"

type FormHandleChangeProps<T> = {
  setFormData: Dispatch<SetStateAction<T>>
  setError?: Dispatch<SetStateAction<string>>
}

export const formHandleChange = <T>({ setFormData, setError }: FormHandleChangeProps<T>) => {
  return (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (setError) setError("")
  }
}