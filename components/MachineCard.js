import { Text, Pressable } from 'react-native'
import { useStore } from '../store/useStore'
import { useThemeColors } from '../utils/theme'

export default function MachineCard({ machine, onPress }) {
  const colors = useThemeColors()
  const downtimes = useStore((s) => s.downtimes)
  const alerts = useStore((s) => s.alerts)

  const hasActiveDowntime = downtimes.some(
    (d) => d.machineId === machine.id && !d.endTime
  )

  const hasActiveAlert = alerts.some(
    (a) => a.machineId === machine.id && a.state !== 'CLEARED'
  )

  let status = 'RUN'
  let statusColor = colors.success

  if (hasActiveDowntime) {
    status = 'OFF'
    statusColor = colors.danger
  } else if (hasActiveAlert) {
    status = 'IDLE'
    statusColor = colors.warning
  }

  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        padding: 14,
        marginBottom: 12,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text }}>
        {machine.name}
      </Text>

      <Text style={{ color: colors.mutedText }}>
        Machine ID: {machine.id}
      </Text>

      <Text style={{ marginTop: 6, fontWeight: 'bold', color: statusColor }}>
        Status: {status}
      </Text>
    </Pressable>
  )
}
