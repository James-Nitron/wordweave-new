import { useEffect, useState } from "react"
import { Link } from "react-router"

import Banner from "~/components/banner"
import Button from "~/components/button"
import Card from "~/components/card"
import Seperator from "~/components/seperator"
import { useUser } from "~/hooks/use-user"
import languages, { getLanguageFlag, type LanguageType } from "~/lib/languages"

const Home = () => {
  const { user } = useUser()
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType | null>(
    null
  )
  const dailyWord = user?.dailyWord

  console.log("user", user)

  useEffect(() => {
    setSelectedLanguage(
      languages.find((language) => language.code === user?.selectedLanguage)
    )
  }, [user?.selectedLanguage])
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <Card title="Daily word">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm">
            English {getLanguageFlag("U+1F1EC U+1F1E7")} :{" "}
            {dailyWord?.translations.join(", ")}
          </h3>
          <Seperator />
          <p className="text-sm">
            {selectedLanguage?.name}{" "}
            {selectedLanguage ? getLanguageFlag(selectedLanguage.flag) : ""} :{" "}
            {dailyWord?.word}
          </p>
        </div>
      </Card>
      <Banner
        variant="info"
        description="Look out for this word whilst you are browsing the web."
      />
      <Card
        title="History"
        description="View your history of words you have learned.">
        <Button
          className="w-full"
          variant="info"
          disabled={user?.plan === "FREE"}
          to="/history">
          {user?.plan === "FREE" ? "Upgrade to view history" : "View history"}
        </Button>
      </Card>
      <Card title="Settings">
        <Link to="/settings">Settings</Link>
      </Card>
      <Link to="/setup">Setup</Link>
    </div>
  )
}

export default Home
