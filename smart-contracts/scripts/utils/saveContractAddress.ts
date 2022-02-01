import fs from 'fs'
import path from 'path'

function checkDir(dir: string) {
  const subDirs = dir.split(path.sep)
  let last = ''
  subDirs.forEach((s) => {
    const current = last + s + path.sep
    if (!fs.existsSync(current)) {
      fs.mkdirSync(current)
    }
    last = current
  })
}

export default function saveContractAddress(
  name: string,
  address: string,
  network: string,
) {
  const dir = path.join(
    '..',
    'frontend',
    'src',
    'eth',
    'contracts',
    name,
    network,
  )
  checkDir(dir)
  const fileName = 'address.json'
  const fullPath = path.join(dir, fileName)

  fs.writeFileSync(fullPath, JSON.stringify({ name, address }))
  console.log(`'${fileName}' generated`)
}
