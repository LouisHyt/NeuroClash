/// <reference path="../../adonisrc.ts" />

import { createTuyau } from '@tuyau/client'
import { api } from '#adonis/api'

export const tuyau = createTuyau({
  api,
  baseUrl: 'http://192.168.173.22:3333',
})
