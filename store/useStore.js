import { create } from 'zustand'
const uuidv4 = () =>
  Date.now().toString() + Math.random().toString(36).slice(2)
import { MACHINES } from '../constants/machines'

const TENANT_ID = 'tenant_demo_001'

export const useStore = create((set, get) => ({

  user: null, 

  login: (email, role) =>
    set({
      user: {
        email,
        role,
        token: 'mock-jwt-token',
      },
    }),

  logout: () => set({ user: null }),

  machines: MACHINES,

  downtimes: [],

  startDowntime: (machineId, reason, subReason) =>
  set((state) => {
    if (state.user?.role !== 'operator') {
      return state
    }

    return {
      downtimes: [
        ...state.downtimes,
        {
          id: uuidv4(),
          tenant_id: TENANT_ID,
          machineId,
          reason,
          subReason,
          startTime: new Date().toISOString(),
          endTime: null,
          acknowledged: false,
          resolved: false,
          synced: false,
        },
      ],
    }
  }),


  acknowledgeDowntime: (id) =>
    set((state) => ({
      downtimes: state.downtimes.map((d) =>
        d.id === id ? { ...d, acknowledged: true } : d
      ),
    })),

  resolveDowntime: (id) =>
    set((state) => ({
      downtimes: state.downtimes.map((d) =>
        d.id === id
          ? {
              ...d,
              endTime: new Date().toISOString(),
              resolved: true,
            }
          : d
      ),
    })),


  maintenance: [],

  addMaintenance: (machineId, note) =>
    set((state) => ({
      maintenance: [
        ...state.maintenance,
        {
          id: uuidv4(),
          tenant_id: TENANT_ID,
          machineId,
          note,
          status: 'DONE',
          completedAt: new Date().toISOString(),
          synced: false,
        },
      ],
    })),


  alerts: [],

  generateAlert: (machineId) =>
    set((state) => ({
      alerts: [
        ...state.alerts,
        {
          id: uuidv4(),
          tenant_id: TENANT_ID,
          machineId,
          state: 'CREATED',
          createdAt: new Date().toISOString(),
          acknowledgedBy: null,
          acknowledgedAt: null,
        },
      ],
    })),

  acknowledgeAlert: (id, email) =>
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === id
          ? {
              ...a,
              state: 'ACKNOWLEDGED',
              acknowledgedBy: email,
              acknowledgedAt: new Date().toISOString(),
            }
          : a
      ),
    })),

  clearAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === id ? { ...a, state: 'CLEARED' } : a
      ),
    })),

  syncAll: () =>
    set((state) => ({
      downtimes: state.downtimes.map((d) =>
        d.endTime ? { ...d, synced: true } : d
      ),

      maintenance: state.maintenance.map((m) => ({
        ...m,
        synced: true,
      })),
    })),

  pendingSyncCount: () => {
    const { downtimes, maintenance } = get()

    const pendingDowntimes = downtimes.filter(
      (d) => !d.synced && d.endTime !== null
    )

    const pendingMaintenance = maintenance.filter(
      (m) => !m.synced
    )

    return pendingDowntimes.length + pendingMaintenance.length
  },
}))
