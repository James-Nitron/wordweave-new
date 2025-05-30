import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { z } from "zod"

import Button from "~/components/button"
import Card from "~/components/card"
import ColorPicker from "~/components/color-picker"
import Dropdown from "~/components/dropdown/dropdown"
import Seperator from "~/components/seperator"
import Wrapper from "~/components/wrapper"
import { useUpdateProfile } from "~/hooks/use-update-profile"
import { useUser } from "~/hooks/use-user"
import languages, { getLanguageFlag } from "~/lib/languages"
import plans from "~/lib/plan"

const formSchema = z.object({
  language: z.string({
    required_error: "Please select a language"
  }),
  color: z
    .string()
    .regex(
      /^rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-1](?:\.[0-9]+)?)\s*\)$/,
      "Invalid RGBA color"
    )
})

type FormValues = z.infer<typeof formSchema>

const Setup = () => {
  const navigate = useNavigate()
  const { user, isLoading: isUserLoading } = useUser()
  const { trigger, isLoading: isUpdating, error } = useUpdateProfile()

  // useEffect(() => {
  //   if (!isUserLoading && !user?.isNewUser) {
  //     navigate("/home")
  //   }
  // }, [isUserLoading, user])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      color: "#3B82F6"
    }
  })

  const onSubmit = async (data: FormValues) => {
    console.log(data)
    try {
      await trigger({
        language: data.language,
        color: data.color
      })
      // navigate("/home")
    } catch (err) {
      console.error("Failed to update language:", err)
    }
  }

  return (
    <Wrapper title="Setup">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4">
        <Card
          title="Setup your profile."
          description="Choose a language and highlight color."
          className="flex flex-col gap-4">
          <div>
            <Dropdown
              id="language-select"
              label="Language"
              {...register("language")}
              options={languages.map((lang) => ({
                value: lang.code,
                label: `${getLanguageFlag(lang.flag)} ${lang.name}`
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
          </div>
          <Seperator />

          <label
            htmlFor="highlight-color"
            className="text-sm font-medium text-gray-700">
            Highlight color
          </label>
          <ColorPicker
            id="highlight-color"
            defaultColor={"rgb(59, 130, 246)"}
            onChange={(color) => {
              setValue("color", color)
            }}
          />

          <Button
            className="w-full"
            type="submit"
            variant="info"
            disabled={isUpdating}>
            {isUpdating ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </Card>
      </form>
    </Wrapper>
  )
}

export default Setup
