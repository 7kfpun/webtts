import { franc } from 'franc-min'

const ISO_639_3_TO_PIPER = {
  eng: 'en_US',
  spa: 'es_ES',
  fra: 'fr_FR',
  deu: 'de_DE',
  ita: 'it_IT',
  por: 'pt_BR',
  rus: 'ru_RU',
  zho: 'zh_CN',
  cmn: 'zh_CN',
  jpn: 'ja_JP',
  kor: 'ko_KR',
  ara: 'ar_SA',
  hin: 'hi_IN',
  ben: 'bn_BD',
  nld: 'nl_NL',
  pol: 'pl_PL',
  tur: 'tr_TR',
  vie: 'vi_VN',
  tha: 'th_TH',
  swe: 'sv_SE',
  dan: 'da_DK',
  fin: 'fi_FI',
  nor: 'no_NO',
  ces: 'cs_CZ',
  hun: 'hu_HU',
  ron: 'ro_RO',
  slk: 'sk_SK',
  ukr: 'uk_UA',
  ell: 'el_GR',
  heb: 'he_IL',
  ind: 'id_ID',
  msa: 'ms_MY',
  fil: 'fil_PH',
  cat: 'ca_ES',
  hrv: 'hr_HR',
  srp: 'sr_RS',
  bul: 'bg_BG',
  lit: 'lt_LT',
  lav: 'lv_LV',
  est: 'et_EE',
  slv: 'sl_SI',
  isl: 'is_IS',
  afr: 'af_ZA',
  sqi: 'sq_AL',
  eus: 'eu_ES',
  glg: 'gl_ES',
  kat: 'ka_GE',
  kaz: 'kk_KZ',
  mkd: 'mk_MK',
  mon: 'mn_MN',
  nep: 'ne_NP',
  fas: 'fa_IR',
  urd: 'ur_PK',
  swh: 'sw_KE',
  tam: 'ta_IN',
  tel: 'te_IN',
  mar: 'mr_IN',
  guj: 'gu_IN',
  kan: 'kn_IN',
  mal: 'ml_IN',
  pan: 'pa_IN',
  sin: 'si_LK',
  mya: 'my_MM',
  khm: 'km_KH',
  lao: 'lo_LA',
  amh: 'am_ET',
  hau: 'ha_NG',
  yor: 'yo_NG',
  ibo: 'ig_NG',
  zul: 'zu_ZA',
  xho: 'xh_ZA'
}

export function detectLanguage(text) {
  if (!text || text.trim().length < 10) {
    return null
  }

  const detectedISO639_3 = franc(text, { minLength: 10 })

  if (detectedISO639_3 === 'und') {
    return null
  }

  return ISO_639_3_TO_PIPER[detectedISO639_3] || null
}

export function findMatchingLanguageCode(detectedCode, languages) {
  if (!detectedCode || !languages) {
    return null
  }

  const match = languages.find(lang => {
    return lang.code === detectedCode ||
           lang.code.startsWith(detectedCode.split('_')[0]) ||
           detectedCode.startsWith(lang.code.split('_')[0])
  })

  return match?.code || null
}
