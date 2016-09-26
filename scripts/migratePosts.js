var fs = require('fs')
var path = require('path')
var fm = require('front-matter')
var moment = require('moment')
var mkdirp = require('mkdirp');

var postsBasePath = path.join('.', 'old', 'contents', 'posts')
var postsDestPath = path.join('.', 'pages')

var files = fs.readdirSync(postsBasePath);
files.forEach(function (origPostFilepath) {
  console.log(origPostFilepath);
  var origPostFilePath = path.join(postsBasePath, origPostFilepath)
  var origPostFileContents = fs.readFileSync(origPostFilePath, 'utf8')
  var content = fm(origPostFileContents)

  var date = moment(content.attributes.date).format('YYYY-MM-DD')
  var postTitleNoExtention = origPostFilepath.split('.md')[0]
  var newPath = path.join(postsDestPath, date +'-'+ postTitleNoExtention)

  mkdirp.sync(newPath)
  var newIndexPath = path.join(newPath, 'index.md')
  var newFrontMatter = '---\n'
  newFrontMatter += 'title: ' + content.attributes.title + '\n'
  newFrontMatter += 'date: ' + date + '\n'
  newFrontMatter += 'layout: post' + '\n'
  newFrontMatter += 'path: /posts/' + postTitleNoExtention + '/\n'
  newFrontMatter += 'tags: \n'
  content.attributes.tags.split(', ').forEach(function (tag) {
    newFrontMatter += '  - '+tag+'\n'
  })
  newFrontMatter += '---\n\n'
  fs.writeFileSync(newIndexPath, newFrontMatter + content.body)
})
