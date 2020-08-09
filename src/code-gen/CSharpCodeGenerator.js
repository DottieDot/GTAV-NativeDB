
export default class {
  data = null
  result = null
  settings = null

  constructor(settings, data) {
    this.data = data
    this.settings = settings
  }

  generateHeader() {
    this.result += `// Generated ${new Date().toLocaleString()}\n`
    this.result += `// https://nativedb.dotindustries.dev/\n\n`
  }

  generateNative({ name, hash, jhash }) {
    if ((this.settings.includeUnnamed) || (name.substr(1) !== hash)) {
      this.result += `\t${name} = ${hash}, ${jhash ? ` // ${jhash}` : ''}\n`
    }
  }

  generateNamespace({ name, natives }) {
    this.result += `\t/*\n\t\t${name}\n\t*/\n`

    natives.forEach(hash => this.generateNative(this.data.natives[hash]))
  }

  generate() {
    this.result = ''
    this.generateHeader()
    this.result += 'public enum Hash : ulong\n{\n'
    Object.values(this.data.namespaces).forEach(ns => this.generateNamespace(ns))
    this.result += '}\n'
  }

  getCode() {
    return this.result
  }
}
