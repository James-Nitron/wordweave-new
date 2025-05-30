import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import Button from "~/components/button"
import Card from "~/components/card"
import ColorPicker from "~/components/color-picker"
import Switch from "~/components/switch"
import Wrapper from "~/components/wrapper"
import { useUpdateColor } from "~/hooks/use-update-color"
import { useUser } from "~/hooks/use-user"

const formSchema = z.object({
  color: z
    .string()
    .regex(
      /^rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-1](?:\.[0-9]+)?)\s*\)$/,
      "Invalid RGBA color"
    )
})

type FormValues = z.infer<typeof formSchema>

export const Settings = () => {
  const { user } = useUser()
  const { trigger, isLoading: isUpdating, error } = useUpdateColor()

  const {
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      color: user?.color
    }
  })

  const onSubmit = async (data: FormValues) => {
    try {
      await trigger(data.color)
    } catch (err) {
      console.error("Failed to update color:", err)
    }
  }

  return (
    <Wrapper title="Settings" back="/home">
      <Card
        title="Enable/Disable translation."
        description="Want a break from translations? Disable them here.">
        <Switch
          label="Disable translations"
          checked={user?.disableTranslations}
        />
      </Card>
      <Card
        title="Highlight color"
        description="Change the color of the word highlight across screens.">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ColorPicker
            id="highlight-color"
            defaultColor={user?.color ?? "rgb(59, 130, 246)"}
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
        </form>
      </Card>
    </Wrapper>
  )
}
