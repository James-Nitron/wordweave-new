import { useEffect, useState } from "react"
import { Link } from "react-router"

import Badge from "~/components/badge"
import Banner from "~/components/banner"
import Button from "~/components/button"
import Card from "~/components/card"
import Seperator from "~/components/seperator"
import Wrapper from "~/components/wrapper"
import { useUser } from "~/hooks/use-user"
import languages, { getLanguageFlag, type LanguageType } from "~/lib/languages"

const Home = () => {
  const { user } = useUser()
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType | null>(
    null
  )
  const dailyWord = user?.dailyWord

  useEffect(() => {
    setSelectedLanguage(
      languages.find((language) => language.code === user?.selectedLanguage)
    )
  }, [user?.selectedLanguage])
  return (
    <Wrapper>
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
        description={
          <p>
            Look out for this word whilst you browse. It will appear as{" "}
            <Badge color={user?.color}>{dailyWord?.word}</Badge>
          </p>
        }
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
      <Card
        title="Settings"
        description="Manage your selected language, highlight color and more.">
        <Button className="w-full" variant="info" to="/settings">
          Settings
        </Button>
      </Card>
      <Link to="/setup">Setup</Link>
    </Wrapper>
  )
}

export default Home
