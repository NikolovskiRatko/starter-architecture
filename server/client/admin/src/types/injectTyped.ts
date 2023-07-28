// Function to deal with undefined values, when you use inject()
import { inject, InjectionKey } from 'vue'

export function injectStrict<T>(key: InjectionKey<T>, fallback?: T) {
    const resolved = inject(key, fallback)
    if (!resolved) {
        throw new Error(`Could not resolve ${key.description}`)
    }
    return resolved
}