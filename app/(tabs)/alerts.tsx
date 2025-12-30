import { Pressable, ScrollView, Text, View } from 'react-native'
import { useStore } from '../../store/useStore'
import { useThemeColors } from '../../utils/theme'

export default function AlertsScreen() {
  const colors = useThemeColors()
  const alerts = useStore((s) => s.alerts)
  const user = useStore((s) => s.user)
  const acknowledge = useStore((s) => s.acknowledgeAlert)
  const clear = useStore((s) => s.clearAlert)

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: colors.background,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: colors.text,
        }}
      >
        Alerts
      </Text>

      {alerts.map((a) => (
        <View
          key={a.id}
          style={{
            marginTop: 12,
            padding: 14,
            backgroundColor: colors.card,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text style={{ color: colors.text }}>
            Machine: {a.machineId}
          </Text>

          <Text style={{ color: colors.mutedText }}>
            Status: {a.state}
          </Text>

          {a.state === 'CREATED' && (
            <Pressable
              onPress={() => acknowledge(a.id, user?.email)}
            >
              <Text style={{ color: colors.warning }}>
                Acknowledge
              </Text>
            </Pressable>
          )}

          {a.state === 'ACKNOWLEDGED' && (
            <Pressable onPress={() => clear(a.id)}>
              <Text style={{ color: colors.success }}>
                Clear
              </Text>
            </Pressable>
          )}
        </View>
      ))}
    </ScrollView>
  )
}
