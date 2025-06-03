import { useEffect, useState } from "react"

export type ToastProps = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 5000

type ToasterToast = ToastProps

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const toasts: ToasterToast[] = []

type ToasterActionType = {
  type: "ADD_TOAST"
  toast: Omit<ToasterToast, "id">
} | {
  type: "UPDATE_TOAST"
  toast: Partial<ToasterToast> & { id: string }
} | {
  type: "DISMISS_TOAST"
  toastId?: string
} | {
  type: "REMOVE_TOAST"
  toastId?: string
}

let listeners: ((state: ToasterToast[]) => void)[] = []

function dispatch(action: ToasterActionType) {
  if (action.type === "ADD_TOAST") {
    const id = genId()
    
    const toast = {
      id,
      ...action.toast,
      variant: action.toast.variant || "default",
    } as ToasterToast

    toasts.push(toast)
    listeners.forEach((listener) => { listener([...toasts]) })

    setTimeout(() => {
      dispatch({ type: "DISMISS_TOAST", toastId: id })
    }, TOAST_REMOVE_DELAY)
  }

  if (action.type === "UPDATE_TOAST") {
    const { id, ...rest } = action.toast
    const index = toasts.findIndex((t) => t.id === id)
    if (index !== -1) {
      toasts[index] = { ...toasts[index], ...rest }
      listeners.forEach((listener) => { listener([...toasts]) })
    }
  }

  if (action.type === "DISMISS_TOAST") {
    const { toastId } = action

    if (toastId) {
      const index = toasts.findIndex((t) => t.id === toastId)
      if (index !== -1) {
        toasts.splice(index, 1)
        listeners.forEach((listener) => { listener([...toasts]) })
      }
    } else {
      toasts.splice(0, toasts.length)
      listeners.forEach((listener) => { listener([...toasts]) })
    }
  }

  if (action.type === "REMOVE_TOAST") {
    const { toastId } = action

    if (toastId) {
      const index = toasts.findIndex((t) => t.id === toastId)
      if (index !== -1) {
        toasts.splice(index, 1)
        listeners.forEach((listener) => { listener([...toasts]) })
      }
    } else {
      toasts.splice(0, toasts.length)
      listeners.forEach((listener) => { listener([...toasts]) })
    }
  }
}

export function useToast() {
  const [state, setState] = useState<ToasterToast[]>(toasts)

  useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    toasts: state,
    toast: (props: Omit<ToasterToast, "id">) => {
      dispatch({ type: "ADD_TOAST", toast: props })
    },
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
    remove: (toastId?: string) => dispatch({ type: "REMOVE_TOAST", toastId }),
  }
}