import type { Plan } from "@wordweave/database"

const plans: Record<Plan, { languages: number; price: number }> = {
  FREE: {
    languages: 1,
    price: 0
  },
  PREMIUM: {
    languages: 3,
    price: 4.99
  }
}

export default plans
