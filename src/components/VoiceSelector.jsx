import styled from 'styled-components'
import { Select } from './ui/select'
import { Label } from './ui/label'

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`

export function VoiceSelector({
  languages,
  selectedLanguage,
  onLanguageChange,
  availableVoices,
  selectedVoice,
  onVoiceChange,
  downloadedModels,
  disabled
}) {
  return (
    <Grid>
      <Field>
        <Label htmlFor="language-select">Language</Label>
        <Select
          id="language-select"
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          disabled={disabled}
        >
          <option value="">Select Language</option>
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.name_english}
              {lang.country_english ? ` (${lang.country_english})` : lang.name_native ? ` (${lang.name_native})` : ''}
            </option>
          ))}
        </Select>
      </Field>

      <Field>
        <Label htmlFor="voice-select">Voice</Label>
        <Select
          id="voice-select"
          value={selectedVoice}
          onChange={(e) => onVoiceChange(e.target.value)}
          disabled={disabled || !selectedLanguage}
        >
          <option value="">Select Voice</option>
          {availableVoices.map(voice => (
            <option key={voice.key} value={voice.key}>
              {voice.name} ({voice.quality}) {downloadedModels.has(voice.key) ? '• cached' : ''}
            </option>
          ))}
        </Select>
      </Field>
    </Grid>
  )
}
