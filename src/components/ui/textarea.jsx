import styled from 'styled-components'
import { forwardRef } from 'react'

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 220px;
  border-radius: 18px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: rgba(2, 6, 23, 0.65);
  color: #f1f5f9;
  font-size: 1.05rem;
  padding: 1.2rem 1.4rem;
  resize: vertical;
  transition: border 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: rgba(148, 163, 184, 0.6);
  }

  &:focus {
    outline: none;
    border-color: rgba(99, 102, 241, 0.8);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const Textarea = forwardRef((props, ref) => <StyledTextarea ref={ref} {...props} />)
