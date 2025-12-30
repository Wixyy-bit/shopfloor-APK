import { View, Text, Pressable } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useStore } from '../../../store/useStore'
import { useThemeColors } from '../../../utils/theme'
import { useMemo } from 'react'

const CHECKLIST = [
  'Lubrication check',
  'Safety guard inspection',
  'Sensor alignment',
  'Cleaning completed',
]

export default function MaintenanceScreen() {
  const colors = useThemeColors()
  const router = useRouter()
  const { id } = useLocalSearchParams()

  const allMaintenance = useStore((s) => s.maintenance)
  const addMaintenance = useStore((s) => s.addMaintenance)

  const maintenance = useMemo(
    () => allMaintenance.filter((m) => m.machineId === id),
    [allMaintenance, id]
  )

  const completed = maintenance.map((m) => m.note)

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: colors.background }}>
      <Pressable onPress={() => router.back()}>
        <Text style={{ color: colors.primary, marginBottom: 12 }}>
          ← Back
        </Text>
      </Pressable>

      <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.text }}>
        Maintenance Checklist
      </Text>

      {CHECKLIST.map((item) => {
        const done = completed.includes(item)

        return (
          <Pressable
            key={item}
            disabled={done}
            onPress={() => addMaintenance(id, item)}
            style={{
              marginTop: 14,
              padding: 14,
              borderRadius: 6,
              backgroundColor: done ? colors.card : colors.success,
              borderWidth: 1,
              borderColor: colors.border,
              opacity: done ? 0.6 : 1,
            }}
          >
            <Text
              style={{
                color: done ? colors.mutedText : '#fff',
                fontWeight: 'bold',
              }}
            >
              {done ? '✔ ' : ''}{item}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}
