import { ArrowLeftIcon } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import Banner from "~/components/banner"
import Button from "~/components/button"
import Card from "~/components/card"
import Loader from "~/components/loader"
import Search from "~/components/search"
import Wrapper from "~/components/wrapper"
import { useUser } from "~/hooks/use-user"
import languages, { getLanguageFlag, type LanguageType } from "~/lib/languages"

const History = () => {
  const { user, isLoading } = useUser()
  const [search, setSearch] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType | null>(
    null
  )

  useEffect(() => {
    setSelectedLanguage(
      languages.find((language) => language.code === user?.selectedLanguage)
    )
  }, [user?.selectedLanguage])

  const filteredHistory = useMemo(() => {
    if (!user?.history) return []

    const searchLower = search.toLowerCase()
    return user.history.filter(
      (item) =>
        item.word.toLowerCase().includes(searchLower) ||
        item.translations.some((t) => t.toLowerCase().includes(searchLower))
    )
  }, [user?.history, search])

  return (
    <Wrapper>
      <div className="flex items-center gap-2">
        <Button
          className="w-fit"
          to="/home"
          variant="info"
          icon={<ArrowLeftIcon />}
        />
        <Search
          placeholder="Search history..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredHistory.length === 0 && (
        <Banner
          variant="warning"
          description={
            search
              ? "No words found matching your search"
              : "No words in your history yet"
          }
        />
      )}

      <div className="flex flex-col gap-2">
        {filteredHistory.map((item) => (
          <Card key={`${item.word}-${item.language}`} title={item.word}>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">
                  {item.word}{" "}
                  {selectedLanguage
                    ? getLanguageFlag(selectedLanguage.flag)
                    : ""}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(item.seenAt).toLocaleDateString()}
                </p>
              </div>
              <p className="text-xs text-gray-600">
                {item.translations.join(", ")}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </Wrapper>
  )
}

export default History
