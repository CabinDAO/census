import styled from 'styled-components'
import { modalContentHorizontalPadding } from './modal.styles'

export const ModalContent = styled.div`
  padding: 1.6rem;
  overflow-y: auto;

  ${({ theme }) => theme.bp.md} {
    padding: 1.6rem ${modalContentHorizontalPadding};
  }
`
