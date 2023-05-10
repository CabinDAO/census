import { InputHTMLAttributes, ReactNode } from 'react'
import styled from 'styled-components'
import { InputLabel } from './InputLabel'
import { HelperTextPosition } from './input.types'
import { Caption } from './Typography'

interface ContainerProps {
  disabled?: boolean
  filled?: boolean
}

interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string
  label?: string
  info?: string
  required?: boolean
  filled?: boolean
  focused?: boolean
  outlined?: boolean
  error?: boolean
  message?: string
  endAdornment?: ReactNode
  helperText?: string
  bottomHelpText?: string
  disabled?: boolean
  className?: string
  children: ReactNode
  onClick?: () => void
  helperTextPosition?: HelperTextPosition
}
export const InputBase = ({
  label,
  required = false,
  filled,
  focused,
  outlined = true,
  error,
  disabled,
  endAdornment,
  onClick,
  children,
  helperText,
  bottomHelpText,
  helperTextPosition = 'top',
  className,
}: InputBaseProps) => {
  return (
    <Container
      disabled={disabled}
      filled={filled}
      onClick={onClick}
      className={className}
    >
      {label && (
        <InputLabel
          required={required}
          label={label}
          helperText={helperTextPosition === 'top' ? helperText : undefined}
        />
      )}
      <InputOutline
        filled={filled}
        focused={focused}
        error={error}
        disabled={disabled}
        outlined={outlined}
      >
        <InputContent>
          <ChildrenContainer>{children}</ChildrenContainer>
          {endAdornment}
        </InputContent>
        {helperTextPosition === 'inset' && helperText ? (
          <InsetHelperText>
            <Caption>{helperText}</Caption>
          </InsetHelperText>
        ) : null}
      </InputOutline>
      {bottomHelpText && (
        <BottomHelpTextCaption emphasized>
          {bottomHelpText}
        </BottomHelpTextCaption>
      )}
    </Container>
  )
}

const BottomHelpTextCaption = styled(Caption)`
  opacity: 0.6;
`

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.8rem;
  width: 100%;
  ${(props) =>
    props.disabled &&
    !props.filled &&
    `
    opacity: 0.42;
    pointer-events: none;
  `}

  ${(props) =>
    props.disabled &&
    `
    opacity: ${props.filled ? '1' : '0.5'};
    pointer-events: none;
  `}
`

const ChildrenContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  width: 100%;
  padding: 0.2rem;
  overflow: scroll;
  height: 100%;
  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`

const InsetHelperText = styled.div`
  display: flex;
  align-self: flex-end;
`

const InputContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.2rem;
`
interface InputOutlineProps {
  filled?: boolean
  focused?: boolean
  error?: boolean
  disabled?: boolean
  outlined?: boolean
}

const InputOutline = styled.div<InputOutlineProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  outline: 0;

  background: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.yellow900};
  --icon-color: ${(props) => props.theme.colors.yellow900};

  ${(props) =>
    props.outlined &&
    `box-shadow: inset 0 0 0 1px ${props.theme.colors.yellow900};`}

  ${(props) =>
    props.filled &&
    `
    background: ${props.theme.colors.white};
    color: ${
      props.disabled ? props.theme.colors.red600 : props.theme.colors.yellow900
    };
    box-shadow: inset 0 0 0 1px ${props.theme.colors.yellow900};
  `}

  ${(props) =>
    props.error &&
    `
    box-shadow: inset 0 0 0 2px ${props.theme.colors.red600};
    padding: 1.5rem;
  `}
`

InputBase.displayName = 'InputBase'
