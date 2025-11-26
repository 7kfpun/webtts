import styled from 'styled-components'
import { forwardRef } from 'react'

const BaseCard = styled.div`
  border-radius: 20px;
  border: 1px solid rgba(148, 163, 184, 0.15);
  background: rgba(15, 23, 42, 0.75);
  box-shadow: 0 30px 60px rgba(2, 6, 23, 0.65);
  backdrop-filter: blur(18px);
`

const Header = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(148, 163, 184, 0.15);
`

const Title = styled.h3`
  margin: 0;
  font-size: 1.15rem;
  letter-spacing: 0.03em;
  color: #f8fafc;
`

const Description = styled.p`
  margin: 0.35rem 0 0;
  font-size: 0.9rem;
  color: #94a3b8;
`

const Content = styled.div`
  padding: 1.5rem;
`

const Footer = styled.div`
  padding: 1.5rem;
  border-top: 1px solid rgba(148, 163, 184, 0.15);
`

export const Card = forwardRef((props, ref) => <BaseCard ref={ref} {...props} />)
export const CardHeader = forwardRef((props, ref) => <Header ref={ref} {...props} />)
export const CardTitle = forwardRef((props, ref) => <Title ref={ref} {...props} />)
export const CardDescription = forwardRef((props, ref) => <Description ref={ref} {...props} />)
export const CardContent = forwardRef((props, ref) => <Content ref={ref} {...props} />)
export const CardFooter = forwardRef((props, ref) => <Footer ref={ref} {...props} />)
