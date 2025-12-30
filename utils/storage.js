import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveUser = async (user) => {
  await AsyncStorage.setItem('user', JSON.stringify(user))
}

export const loadUser = async () => {
  const json = await AsyncStorage.getItem('user')
  return json ? JSON.parse(json) : null
}

export const clearUser = async () => {
  await AsyncStorage.removeItem('user')
}

export const addQueueItem = async (item) => {
  const queue = JSON.parse(await AsyncStorage.getItem('queue') || '[]')
  queue.push(item)
  await AsyncStorage.setItem('queue', JSON.stringify(queue))
}

export const loadQueue = async () => {
  return JSON.parse(await AsyncStorage.getItem('queue') || '[]')
}
