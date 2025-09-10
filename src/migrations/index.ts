import * as migration_20250910_043045 from './20250910_043045'
import * as migration_20250910_043145 from './20250910_043145'

export const migrations = [
  {
    up: migration_20250910_043145.up,
    down: migration_20250910_043145.down,
    name: '20250910_043145',
  },
]
