import { ScrollView, View, Text, Pressable } from 'react-native'
import { useStore } from '../../store/useStore'
import { useThemeColors } from '../../utils/theme'

export default function SupervisorScreen() {
  const colors = useThemeColors()

  const downtimes = useStore((s) => s.downtimes)
  const resolveDowntime = useStore((s) => s.resolveDowntime)

  const activeDowntimes = downtimes.filter((d) => !d.endTime)

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: colors.background }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.text }}>
        Supervisor Dashboard
      </Text>

      {activeDowntimes.length === 0 && (
        <Text style={{ color: colors.mutedText, marginTop: 12 }}>
          No active downtimes 🎉
        </Text>
      )}

      {activeDowntimes.map((d) => (
        <View
          key={d.id}
          style={{
            marginTop: 12,
            padding: 16,
            backgroundColor: colors.card,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text style={{ color: colors.text, fontWeight: 'bold' }}>
            Machine: {d.machineId}
          </Text>

          <Text style={{ color: colors.mutedText }}>
            Reason: {d.reason} → {d.subReason}
          </Text>

          <Pressable
            onPress={() => resolveDowntime(d.id)}
            style={{
              marginTop: 10,
              backgroundColor: colors.success,
              padding: 12,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: '#fff', textAlign: 'center' }}>
              Resolve Downtime
            </Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  )
}
