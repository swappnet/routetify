import { MovingPreferencesType } from '@/types/global/movingPreferencesType.types'
import clsx from 'clsx'
import { ReactNode } from 'react'

interface MovingPreferencesButton {
  selectedPreference: MovingPreferencesType
  handlePreferenceChange: (preference: MovingPreferencesType) => void
  preference: MovingPreferencesType
  title: string
  children: ReactNode
}

const MovingPreferencesButton = ({
  selectedPreference,
  handlePreferenceChange,
  preference,
  title,
  children,
}: MovingPreferencesButton) => {
  return (
    <button
      title={title}
      onClick={() => handlePreferenceChange(preference)}
      disabled={selectedPreference === preference}
      className={clsx(
        'flex flex-col items-center justify-center gap-1 p-2 h-18 min-w-[4rem] bg-lime-200 text-neutral-800 border-2 border-transparent font-roboto rounded-md font-semibold transition-colors',
        'disabled:border-lime-400 disabled:bg-lime-300',
        'hocus:bg-lime-300',
      )}
    >
      {children}
    </button>
  )
}

export { MovingPreferencesButton }
