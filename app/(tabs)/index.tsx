import { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'
import { useRouter } from 'expo-router'
import { useStore } from '../../store/useStore'
import { useThemeColors } from '../../utils/theme'
import MachineCard from '../../components/MachineCard'

export default function HomeScreen() {
  const colors = useThemeColors()
  const router = useRouter()

  const user = useStore((s) => s.user)
  const login = useStore((s) => s.login)
  const logout = useStore((s) => s.logout)
  const machines = useStore((s) => s.machines)

  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'operator' | 'supervisor'>('operator')

  const handleLogin = () => {
    if (!email.trim()) return
    login(email.trim(), role)
  }

  /* ---------------- LOGIN SCREEN ---------------- */
  if (!user) {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: colors.background }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            padding: 20,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <Text
            style={{
              fontSize: 26,
              fontWeight: 'bold',
              color: colors.text,
              marginBottom: 20,
            }}
          >
            Shop Floor Lite
          </Text>

          <TextInput
            placeholder="Enter email"
            placeholderTextColor={colors.mutedText}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              color: colors.text,
              padding: 12,
              borderRadius: 6,
              marginBottom: 14,
            }}
          />

          {/* ROLE SELECT */}
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            {['operator', 'supervisor'].map((r) => (
              <Pressable
                key={r}
                onPress={() => setRole(r as any)}
                style={{
                  flex: 1,
                  padding: 12,
                  marginRight: r === 'operator' ? 8 : 0,
                  backgroundColor:
                    role === r ? colors.primary : colors.card,
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color: role === r ? '#fff' : colors.text,
                    fontWeight: 'bold',
                  }}
                >
                  {r.toUpperCase()}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* LOGIN BUTTON */}
          <Pressable
            onPress={handleLogin}
            android_ripple={{ color: '#00000020' }}
            style={{
              backgroundColor: colors.success,
              padding: 14,
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 16,
              }}
            >
              Login
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }

  /* ---------------- DASHBOARD ---------------- */
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 16 }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: colors.text,
          }}
        >
          Machine Dashboard
        </Text>

        <Pressable
          onPress={logout}
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            backgroundColor: colors.danger,
            borderRadius: 6,
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            Logout
          </Text>
        </Pressable>
      </View>

      {machines.map((machine) => (
        <MachineCard
          key={machine.id}
          machine={machine}
          onPress={() => router.push(`/machine/${machine.id}`)}
        />
      ))}
    </ScrollView>
  )
}
