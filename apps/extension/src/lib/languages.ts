export interface LanguageType {
  code: string
  name: string
  flag: string
}

const languages: Array<LanguageType> = [
  {
    code: "es",
    name: "Spanish",
    flag: "U+1F1EA U+1F1F8"
  },
  {
    code: "fr",
    name: "French",
    flag: "U+1F1EB U+1F1F7"
  },
  {
    code: "de",
    name: "German",
    flag: "U+1F1E9 U+1F1EA"
  },
  {
    code: "it",
    name: "Italian",
    flag: "U+1F1EE U+1F1F9"
  },
  {
    code: "pt",
    name: "Portuguese",
    flag: "U+1F1F5 U+1F1F9"
  }
]

export const getLanguageFlag = (value: string) => {
  return value
    .split(" ")
    .map((cp) => String.fromCodePoint(parseInt(cp.replace("U+", ""), 16)))
    .join("")
}

export default languages
