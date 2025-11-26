import styled from 'styled-components'
import { forwardRef } from 'react'

const Wrapper = styled.div`
  border-radius: 16px;
  padding: 1.1rem 1.25rem;
  border: 1px solid rgba(248, 113, 113, 0.4);
  background: rgba(127, 29, 29, 0.2);
  color: #fecaca;
`

const Title = styled.h5`
  margin: 0 0 0.25rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fecaca;
`

const Description = styled.div`
  font-size: 0.95rem;
  color: #ffe4e6;
`

export const Alert = forwardRef((props, ref) => <Wrapper ref={ref} role="alert" {...props} />)
export const AlertTitle = forwardRef((props, ref) => <Title ref={ref} {...props} />)
export const AlertDescription = forwardRef((props, ref) => <Description ref={ref} {...props} />)
