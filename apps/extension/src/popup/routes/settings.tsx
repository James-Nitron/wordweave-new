import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import Button from "~/components/button"
import Card from "~/components/card"
import { ColorPicker } from "~/components/color-picker"
import Wrapper from "~/components/wrapper"
import { useUpdateColor } from "~/hooks/use-update-color"
import { useUser } from "~/hooks/use-user"

const formSchema = z.object({
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid hex color")
})

type FormValues = z.infer<typeof formSchema>

export const Settings = () => {
  const { user } = useUser()
  const { trigger, isLoading: isUpdating, error } = useUpdateColor()

  const {
    register,
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
    console.log(data)
    try {
      await trigger(data.color)
    } catch (err) {
      console.error("Failed to update color:", err)
    }
  }

  return (
    <Wrapper title="Settings" back="/home">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card
          title="Highlight color"
          description="Change the color of the word highlight across screens.">
          <label
            htmlFor="color-picker"
            className="text-sm font-medium text-gray-700">
            Highlight color
          </label>
          <ColorPicker
            id="color-picker"
            defaultColor={user?.color ?? "#3B82F6"}
            onChange={(color) => {
              setValue("color", color)
            }}
          />
        </Card>
        <Button
          className="w-full"
          type="submit"
          variant="info"
          disabled={isUpdating}>
          {isUpdating ? <Loader2 className="animate-spin" /> : "Save"}
        </Button>
      </form>
    </Wrapper>
  )
}
