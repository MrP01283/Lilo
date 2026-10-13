export type CountryCode = 'KZ' | 'RU' | 'KG' | 'UZ' | 'BY'

export const phoneCountries: { code: CountryCode; name: string; dial: string; length: number; example: string }[] = [
  { code: 'KZ', name: 'Казахстан', dial: '+7', length: 10, example: '700 123 45 67' },
  { code: 'RU', name: 'Россия', dial: '+7', length: 10, example: '900 123 45 67' },
  { code: 'KG', name: 'Кыргызстан', dial: '+996', length: 9, example: '700 123 456' },
  { code: 'UZ', name: 'Узбекистан', dial: '+998', length: 9, example: '90 123 45 67' },
  { code: 'BY', name: 'Беларусь', dial: '+375', length: 9, example: '29 123 45 67' },
]

export const digitsOnly = (value: string) => value.replace(/\D/g, '')

export function nationalPhoneDigits(value: string, countryCode: CountryCode): string {
  const country = phoneCountries.find(item => item.code === countryCode) ?? phoneCountries[0]
  const digits = digitsOnly(value)
  const prefix = digitsOnly(country.dial)
  const isFullNumber = value.trim().startsWith('+') || digits.length > country.length
  return isFullNumber && digits.startsWith(prefix) ? digits.slice(prefix.length) : digits
}

export function phoneValidationError(value: string, countryCode: CountryCode): string | null {
  const country = phoneCountries.find(item => item.code === countryCode) ?? phoneCountries[0]
  const national = nationalPhoneDigits(value, countryCode)
  if (national.length !== country.length) return `Для страны «${country.name}» введите ${country.length} цифр после ${country.dial}`
  if (/^(\d)\1+$/.test(national)) return 'Введите действительный номер телефона'
  return null
}
