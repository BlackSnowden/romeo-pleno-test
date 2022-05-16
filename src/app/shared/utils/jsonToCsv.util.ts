import json2Csv from 'json2csv'

export default (data: Array<{ [x: string]: any }> | { [x: string]: any }, fields: Array<string>) =>
  json2Csv.parse(data, { delimiter: ';', fields })
