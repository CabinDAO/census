import { DescriptionStep } from './DescriptionStep'
import { BasicDetailStep } from './BasicDetailStep'
import { LocationFragment } from '@/generated/graphql'
import { PhotoGalleryStep } from './PhotoGalleryStep'
import { OffersStep } from './OffersStep'

export type StepConfig = {
  name: string
  component: ({ onBack, onNext }: StepProps) => JSX.Element | null
}

export type StepProps = {
  name: string
  onNext: () => void
  onBack: () => void
  location: LocationFragment
  steps: StepConfig[]
}

export const editLocationSteps: StepConfig[] = [
  {
    name: 'Basic Detail',
    component: BasicDetailStep,
  },
  {
    name: 'Description',
    component: DescriptionStep,
  },
  {
    name: 'Photo Gallery',
    component: PhotoGalleryStep,
  },
  {
    name: 'Offers',
    component: OffersStep,
  },
]
