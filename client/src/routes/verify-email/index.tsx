import { createFileRoute, redirect } from '@tanstack/react-router'
import EmailVerificationPage from '../../pages/emailSentConfirmation'
import isAuthenticated from '../../utils/authenticated';

export const Route = createFileRoute('/verify-email/')({
  beforeLoad: async () => {
    if (isAuthenticated()) {
      throw redirect({ to: "/home" });
    }
  },
  component: EmailVerificationPage
})