import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { z } from "zod"

import Button from "~/components/button"
import Dropdown from "~/components/dropdown/dropdown"
import { useUpdateLanguage } from "~/hooks/use-update-language"
import { useUser } from "~/hooks/use-user"
import languages from "~/lib/languages"
import plans from "~/lib/plan"

const formSchema = z.object({
  language: z.string({
    required_error: "Please select a language"
  })
})

type FormValues = z.infer<typeof formSchema>

const Setup = () => {
  const navigate = useNavigate()
  const { user, isLoading: isUserLoading } = useUser()
  const {
    trigger,
    isLoading: isUpdating,
    error
  } = useUpdateLanguage(user?.id ?? "")

  useEffect(() => {
    if (!isUserLoading && !user?.isNewUser) {
      navigate("/home")
    }
  }, [isUserLoading, user])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (data: FormValues) => {
    try {
      await trigger(data.language)
      navigate("/home")
    } catch (err) {
      console.error("Failed to update language:", err)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <p className="text-sm text-gray-500">
        Your current plan allows you to choose {plans[user?.plan]?.languages}{" "}
        language
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4">
        <Dropdown
          id="language-select"
          label="Language"
          {...register("language")}
          options={languages.map((lang) => ({
            value: lang.code,
            label: `${lang.flag} ${lang.name}`
          }))}
          placeholder="Choose a language"
          required
        />
        {errors.language && (
          <p className="text-sm text-red-500">{errors.language.message}</p>
        )}
        {error && (
          <p className="text-sm text-red-500">Failed to update language</p>
        )}

        <Button type="submit" variant="info" disabled={isUpdating}>
          {isUpdating ? "Saving..." : "Save Language"}
        </Button>
      </form>
    </div>
  )
}

export default Setup
