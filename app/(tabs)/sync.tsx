import { View, Text, Pressable } from 'react-native'
import { useStore } from '../../store/useStore'
import { useThemeColors } from '../../utils/theme'

export default function SyncScreen() {
  const colors = useThemeColors()
  const pending = useStore((s) => s.pendingSyncCount())
  const syncAll = useStore((s) => s.syncAll)

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: colors.background }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.text }}>
        Sync Status
      </Text>

      <Text style={{ marginVertical: 12, color: colors.mutedText }}>
        Pending items: {pending}
      </Text>

      <Pressable
        onPress={syncAll}
        style={{
          backgroundColor: colors.primary,
          padding: 14,
          borderRadius: 6,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          Sync Now
        </Text>
      </Pressable>
    </View>
  )
}
