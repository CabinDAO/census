import { ProfileContactFieldType } from '@/generated/graphql'
import { AboutStep } from './AboutStep'
import { ContactStep } from './ContactStep'
import { RoleStep } from './RoleStep'

export type StepConfig = {
  name: string
  component: ({ onBack, onNext }: StepProps) => JSX.Element
}

export type StepProps = {
  name: string
  onNext: () => void
  onBack: () => void
}

export const steps: StepConfig[] = [
  {
    name: 'About',
    component: AboutStep,
  },
  {
    name: 'Roles',
    component: RoleStep,
  },
  {
    name: 'Contact',
    component: ContactStep,
  },
]

export const contactFieldDisplayNameMapping = {
  [ProfileContactFieldType.Email]: 'Email',
  [ProfileContactFieldType.Discord]: 'Discord Username',
  [ProfileContactFieldType.Twitter]: 'Twitter Username',
  [ProfileContactFieldType.Instagram]: 'Instagram Username',
  [ProfileContactFieldType.LinkedIn]: 'Linkedin Username',
  [ProfileContactFieldType.Telegram]: 'Telegram Username',
  [ProfileContactFieldType.Lens]: 'Lens URL',
  [ProfileContactFieldType.Website]: 'Website URL',
}
