/* eslint-disable import/no-named-default */
import { default as userSchedule } from './user.schedule'
import { default as userExportCsvSchedule } from './user-export-csv.schedule'

export default {
  start() {
    userSchedule.start()
    userExportCsvSchedule.start()
  },
}
