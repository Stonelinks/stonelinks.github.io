const fs = require('fs')
const path = require('path')
const fm = require('front-matter')
const moment = require('moment')
const mkdirp = require('mkdirp')

const postsBasePath = path.join('.', 'old', 'contents', 'posts')
const postsDestPath = path.join('.', 'pages', 'posts')

const files = fs.readdirSync(postsBasePath)
files.forEach(function (origPostFilepath) {
  console.log(origPostFilepath)
  const origPostFilePath = path.join(postsBasePath, origPostFilepath)
  const origPostFileContents = fs.readFileSync(origPostFilePath, 'utf8')
  const content = fm(origPostFileContents)

  const date = moment(content.attributes.date).format('YYYY-MM-DD')
  const postTitleNoExtention = origPostFilepath.split('.md')[0]
  const newPath = path.join(postsDestPath, date + '-' + postTitleNoExtention)

  mkdirp.sync(newPath)
  const newIndexPath = path.join(newPath, 'index.md')
  let newFrontMatter = '---\n'
  newFrontMatter += 'title: ' + content.attributes.title + '\n'
  newFrontMatter += 'date: ' + date + '\n'
  newFrontMatter += 'path: /posts/' + postTitleNoExtention + '/\n'
  newFrontMatter += 'tags: \n'
  content.attributes.tags.split(', ').forEach(function (tag) {
    newFrontMatter += '  - ' + tag + '\n'
  })
  newFrontMatter += '---\n\n'
  fs.writeFileSync(newIndexPath, newFrontMatter + content.body)
})
