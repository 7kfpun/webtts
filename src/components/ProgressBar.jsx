import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const Track = styled.div`
  position: relative;
  width: 100%;
  height: 6px;
  border-radius: 999px;
  background: rgba(71, 85, 105, 0.5);
  overflow: hidden;
`

const Fill = styled.div`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, #38bdf8, #6366f1);
  transition: width 0.2s ease;
`

const Label = styled.div`
  font-size: 0.85rem;
  color: #cbd5f5;
`

const Value = styled.div`
  font-size: 0.7rem;
  text-align: right;
  letter-spacing: 0.08em;
  color: rgba(148, 163, 184, 0.9);
`

export function ProgressBar({ progress, label }) {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <Track>
        <Fill style={{ width: `${Math.min(progress, 100)}%` }} />
      </Track>
      <Value>{Math.round(progress)}%</Value>
    </Wrapper>
  )
}
