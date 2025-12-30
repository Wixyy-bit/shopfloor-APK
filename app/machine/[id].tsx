import { View, Text, Pressable } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useStore } from '../../store/useStore'
import { useThemeColors } from '../../utils/theme'

export default function MachineDetailScreen() {
  const colors = useThemeColors()
  const router = useRouter()
  const { id } = useLocalSearchParams()

  const machine = useStore((s) =>
    s.machines.find((m) => m.id === id)
  )

  const user = useStore((s) => s.user)
  const role = user?.role ?? 'operator'

  if (!machine) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <Text style={{ color: colors.text }}>Machine not found</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: colors.background }}>
      {/* 🔙 BACK */}
      <Pressable onPress={() => router.back()}>
        <Text style={{ color: colors.primary, marginBottom: 12 }}>
          ← Back
        </Text>
      </Pressable>

      <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.text }}>
        {machine.name}
      </Text>

      <Text style={{ color: colors.mutedText }}>
        ID: {machine.id}
      </Text>

      {role === 'operator' && (
        <>
          <Pressable
            onPress={() => router.push(`/machine/${id}/downtime`)}
            style={{
              marginTop: 20,
              backgroundColor: colors.primary,
              padding: 14,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: '#fff', textAlign: 'center' }}>
              Capture Downtime
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.push(`/machine/${id}/maintenance`)}
            style={{
              marginTop: 12,
              backgroundColor: colors.success,
              padding: 14,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: '#fff', textAlign: 'center' }}>
              Maintenance Checklist
            </Text>
          </Pressable>
        </>
      )}
    </View>
  )
}
