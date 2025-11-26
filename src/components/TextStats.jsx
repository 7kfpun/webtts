import styled from 'styled-components'
import { getWordCount, getCharCount } from '../utils/textStats'

const StatsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`

const StatCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 0.95rem;
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  background: rgba(15, 23, 42, 0.65);
  font-size: 0.9rem;
`

const Label = styled.span`
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
`

const Value = styled.span`
  color: #f8fafc;
  font-weight: 600;
`

const LangBadge = styled(StatCard)`
  border-color: rgba(96, 165, 250, 0.4);
  color: #bfdbfe;
`

export function TextStats({ text, detectedLanguage }) {
  const wordCount = getWordCount(text)
  const charCount = getCharCount(text)

  return (
    <StatsWrapper>
      <StatCard>
        <Label>Words</Label>
        <Value>{wordCount}</Value>
      </StatCard>
      <StatCard>
        <Label>Characters</Label>
        <Value>{charCount}</Value>
      </StatCard>
      {detectedLanguage && (
        <LangBadge>
          <Label>Detected</Label>
          <Value>{detectedLanguage}</Value>
        </LangBadge>
      )}
    </StatsWrapper>
  )
}
