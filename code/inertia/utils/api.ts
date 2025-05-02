/// <reference path="../../adonisrc.ts" />

import { createTuyau } from '@tuyau/client'
import { api } from '#adonis/api'

export const tuyau = createTuyau({
  api,
  baseUrl: 'http://localhost:3333',
})
