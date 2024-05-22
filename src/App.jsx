import { useState } from "react"
import "./App.css"
import DatePicker from "./DatePicker"

export default function App() {
  const [value, setValue] = useState(new Date())
  return <DatePicker value={value} onChange={setValue} />
}