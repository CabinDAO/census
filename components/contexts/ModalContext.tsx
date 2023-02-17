import { createContext, ReactNode, useState } from 'react'
import Modal from '../core/modals/Modal'

export const ModalContext = createContext<ModalState | null>(null)

export interface ModalState {
  showModal: (render: () => ReactNode) => void
  showLoadingModal: (render: () => ReactNode) => void
  hideModal: () => void
  active: boolean
}

interface ModalProviderProps {
  children: ReactNode
}

interface InternalState {
  render: (() => ReactNode) | null
  hideOnClickAway?: boolean
}

const initialState: InternalState = {
  render: null,
  hideOnClickAway: true,
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [internalState, setInternalState] =
    useState<InternalState>(initialState)

  function showModal(render: () => ReactNode) {
    setInternalState({ render, hideOnClickAway: true })
  }

  // Shows a modal but disables close on click away
  function showLoadingModal(render: () => ReactNode) {
    setInternalState({ render, hideOnClickAway: false })
  }

  function hideModal() {
    setInternalState({ render: null, hideOnClickAway: true })
  }

  const state = {
    showModal,
    hideModal,
    showLoadingModal,
    active: !!internalState.render,
  }

  return (
    <ModalContext.Provider value={state}>
      {children}
      <Modal
        active={!!internalState.render}
        onClose={hideModal}
        hideOnClickAway={internalState.hideOnClickAway}
      >
        {internalState.render && internalState.render()}
      </Modal>
    </ModalContext.Provider>
  )
}