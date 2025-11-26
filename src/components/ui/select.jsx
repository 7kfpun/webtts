import styled from 'styled-components'
import { forwardRef } from 'react'

const StyledSelect = styled.select`
  width: 100%;
  box-sizing: border-box;
  padding: 0.9rem 1rem;
  padding-right: 2.8rem;
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.3);
  background: rgba(15, 23, 42, 0.7);
  color: #f8fafc;
  font-size: 1rem;
  appearance: none;
  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cpath fill='%2394a3b8' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E\");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.1rem;
  transition: border 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: rgba(96, 165, 250, 0.8);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const Select = forwardRef((props, ref) => <StyledSelect ref={ref} {...props} />)
