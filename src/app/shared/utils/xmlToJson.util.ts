import xml2json from 'xml2json'

export default (content: string) => JSON.parse(xml2json.toJson(content))
