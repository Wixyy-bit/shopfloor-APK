import { View, Text, Pressable } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useStore } from '../../../store/useStore'
import { useThemeColors } from '../../../utils/theme'
import { useState } from 'react'

const REASONS = [
  {
    code: 'POWER',
    label: 'Power',
    children: [
      { code: 'GRID', label: 'Grid' },
      { code: 'INTERNAL', label: 'Internal' },
    ],
  },
  {
    code: 'CHANGEOVER',
    label: 'Changeover',
    children: [{ code: 'TOOLING', label: 'Tooling' }],
  },
]

export default function DowntimeScreen() {
  const colors = useThemeColors()
  const router = useRouter()
  const { id } = useLocalSearchParams()

  const startDowntime = useStore((s) => s.startDowntime)
  const [selected, setSelected] = useState<any>(null)

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: colors.background }}>
      <Pressable onPress={() => router.back()}>
        <Text style={{ color: colors.primary, marginBottom: 12 }}>
          ← Back
        </Text>
      </Pressable>

      <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.text }}>
        Capture Downtime
      </Text>

      {!selected &&
        REASONS.map((r) => (
          <Pressable
            key={r.code}
            onPress={() => setSelected(r)}
            style={{
              marginTop: 16,
              padding: 14,
              backgroundColor: colors.card,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text style={{ color: colors.text, fontWeight: 'bold' }}>
              {r.label}
            </Text>
          </Pressable>
        ))}

      {selected &&
        selected.children.map((c) => (
          <Pressable
            key={c.code}
            onPress={() => {
              startDowntime(id, selected.code, c.code)
              router.back()
            }}
            style={{
              marginTop: 16,
              padding: 14,
              backgroundColor: colors.primary,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: '#fff', textAlign: 'center' }}>
              {selected.label} → {c.label}
            </Text>
          </Pressable>
        ))}
    </View>
  )
}
