interface Link {
  url: string
  status: number
  state: string
  parent: string
}

const reportBrokenLinks = (i: string) => {
  const j = JSON.parse(i) as Array<Link>
  const linksByParent: Record<string, Array<Link>> = {}
  for (let i = 0; i < j.length; i++) {
    const e = j[i]
    if (!linksByParent[e.parent]) {
      linksByParent[e.parent] = []
    }
    linksByParent[e.parent].push(e)
  }
  for (const k in linksByParent) {
    console.log(k)
    if (Object.prototype.hasOwnProperty.call(linksByParent, k)) {
      const links = linksByParent[k]
      for (let i = 0; i < links.length; i++) {
        const l = links[i]
        console.log(`  - ${l.url}`)
      }
    }
    console.log("")
  }
  console.log(`Total broken links: ${j.length}`)
}

const getInput = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stdin = process.stdin
    let data = ""

    stdin.setEncoding("utf8")
    stdin.on("data", function (chunk) {
      data += chunk
    })

    stdin.on("end", function () {
      resolve(data)
    })

    stdin.on("error", reject)
  })
}

getInput().then(reportBrokenLinks).catch(console.error)
