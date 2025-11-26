import styled from 'styled-components'
import { AlertTriangle } from 'lucide-react'

const Wrapper = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  padding: 1rem 1.25rem;
  border-radius: 16px;
  border: 1px solid rgba(239, 68, 68, 0.4);
  background: rgba(127, 29, 29, 0.25);
  color: #fecaca;
`

const Message = styled.p`
  margin: 0;
  color: #ffe4e6;
  font-weight: 600;
`

const Dismiss = styled.button`
  border: none;
  background: transparent;
  color: inherit;
  font-size: 1.2rem;
  cursor: pointer;
`

export function ErrorMessage({ message, onDismiss }) {
  if (!message) return null

  return (
    <Wrapper>
      <AlertTriangle size={22} />
      <div style={{ flex: 1 }}>
        <Message>{message}</Message>
      </div>
      {onDismiss && <Dismiss onClick={onDismiss}>×</Dismiss>}
    </Wrapper>
  )
}
