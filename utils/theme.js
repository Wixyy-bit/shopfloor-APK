import { useColorScheme } from 'react-native'

export function useThemeColors() {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'

  return {
    background: isDark ? '#020617' : '#ffffff',
    card: isDark ? '#020617' : '#ffffff',

    text: isDark ? '#e5e7eb' : '#111827',
    mutedText: isDark ? '#9ca3af' : '#6b7280',

    border: isDark ? '#334155' : '#e5e7eb',

    primary: '#2563eb',
    success: '#16a34a',
    warning: '#f59e0b',
    danger: '#dc2626',
  }
}
