import styled from 'styled-components'
import { forwardRef } from 'react'

const StyledLabel = styled.label`
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: rgba(148, 163, 184, 0.9);
  font-weight: 600;
`

export const Label = forwardRef((props, ref) => <StyledLabel ref={ref} {...props} />)
