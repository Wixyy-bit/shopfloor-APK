import { View, Text } from 'react-native'
import { useStore } from '../../store/useStore'
import { useThemeColors } from '../../utils/theme'

export default function SummaryScreen() {
  const colors = useThemeColors()
  const downtimes = useStore((s) => s.downtimes)

  const active = downtimes.filter((d) => !d.endTime).length

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: colors.background }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.text }}>
        Shift Summary
      </Text>

      <Text style={{ marginTop: 12, color: colors.mutedText }}>
        Active Incidents: {active}
      </Text>
    </View>
  )
}
