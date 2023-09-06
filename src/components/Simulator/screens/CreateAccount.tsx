import React, { useState } from "react"
import type { PhoneScreenProps } from "../interfaces"
import { generateInvalidSafeSeed } from "../../../utils/generateSeed"
import { WalletHome, ProgressCta } from ".."
import {
  GeneratingKeys,
  HomeScreen,
  InitialWordDisplay,
  InteractiveWordSelector,
  RecoveryPhraseNotice,
  WelcomeScreen,
} from "./CreateAccount/index"

export const CreateAccount: React.FC<PhoneScreenProps> = ({
  state,
  ctaLabel,
}) => {
  const { progressStepper, step } = state
  const [words, setWords] = useState<Array<string>>(generateInvalidSafeSeed())
  const generateNewWords = () => {
    setWords(generateInvalidSafeSeed())
  }
  return (
    <>
      {[0, 1].includes(step) && <HomeScreen state={state} />}
      {[2].includes(step) && <WelcomeScreen />}
      {[3].includes(step) && (
        <GeneratingKeys
          state={state}
          generateNewWords={generateNewWords}
          ctaLabel={ctaLabel}
        />
      )}
      {[4].includes(step) && <RecoveryPhraseNotice />}
      {[5].includes(step) && <InitialWordDisplay words={words} />}
      {[6].includes(step) && (
        <InteractiveWordSelector
          state={state}
          words={words}
          ctaLabel={ctaLabel}
        />
      )}
      {[7].includes(step) && <WalletHome />}
      {[0, 1, 2, 4, 5].includes(step) && (
        <ProgressCta
          isAnimated={step === 0}
          progressStepper={progressStepper}
          bg={[5].includes(step) ? "background.base" : "background.highlight"}
        >
          {ctaLabel}
        </ProgressCta>
      )}
    </>
  )
}
