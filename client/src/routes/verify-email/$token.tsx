import { createFileRoute } from '@tanstack/react-router'
import VerifyMail from '../../pages/auth/verifyMail'

export const Route = createFileRoute('/verify-email/$token')({
  component: VerifyMail
})