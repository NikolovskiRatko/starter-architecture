// This is required to type Provide/Inject
import { InjectionKey } from 'vue'
import { AxiosInstance } from 'axios'
import { Router } from 'vue-router'
import { Auth } from '@websanova/vue-auth'

export const AxiosKey: InjectionKey<AxiosInstance> = Symbol('http')
export const RouterKey: InjectionKey<Router> = Symbol('router')
export const AuthKey: InjectionKey<Auth> = Symbol('auth')
