---
title: Neural Network Bug Generator
date: 2016-08-15
path: /posts/jira-neural-net-bugs/
image: /posts/jira-neural-net-bugs/Pasted image at 2016_08_14 10_06 PM (1).png
gallery: [/posts/jira-neural-net-bugs/Pasted image at 2016_08_14 08_48 PM.png,
/posts/jira-neural-net-bugs/Pasted image at 2016_08_14 08_50 PM (1).png,
/posts/jira-neural-net-bugs/Pasted image at 2016_08_14 08_52 PM.png,
/posts/jira-neural-net-bugs/Pasted image at 2016_08_14 10_06 PM (1).png,
/posts/jira-neural-net-bugs/Pasted image at 2016_08_14 10_09 PM (1).png,
/posts/jira-neural-net-bugs/Pasted image at 2016_08_15 07_45 AM (1).png,
/posts/jira-neural-net-bugs/Pasted image at 2016_08_15 07_46 AM.png,
/posts/jira-neural-net-bugs/Pasted image at 2016_08_15 07_47 AM.png,
/posts/jira-neural-net-bugs/Pasted image at 2016_08_15 07_49 AM.png]
tags:
  - generators
  - neural networks
---

Ever wanted to piss off your team by generating plausible (but fake) sounding bug reports? Then look no further! This guide will walk you through exporting all your bugs from JIRA and using [torch-rnn](https://github.com/jcjohnson/torch-rnn) to generate nonsense like this:

You may need to swap URLs / field names as needed depending on your exact JIRA setup.

## Step 1: Download all your bugs to your hard drive

JIRA isn't too keen on exporting every single bug in one go, so we need to batch download them. Go to the JIRA issues search and search for `type = bug` to get on all your bugs. Make sure to show the "Description" field (the "Columns" dropdown on the right).

Open up the javascript console for your browser (CTRL + Shift + J in chrome) and paste the blow in to batch download your bugs as excel spreadsheets. You may have to adjust some variables at the top as needed.

```js
var numberOfPages = 6
var baseUrl =
  "http://jira/sr/jira.issueviews:searchrequest-excel-current-fields/temp/SearchRequest.xls?jqlQuery=type+%3D+bug&tempMax=1000"

function downloadURI(uri) {
  var link = document.createElement("a")
  link.href = uri
  link.click()
}

downloadURI(baseUrl)

for (var i = 1; i < numberOfPages; i++) {
  ;(function (i) {
    setTimeout(function () {
      var url = baseUrl + "&pager/start=" + (i + 1) + "001"
      console.log("download", url)
      downloadURI(url)
    }, i * 5000)
  })(i)
}
```

This should download a bunch of spreadsheets named `JIRA.xls`, `JIRA (1).xls`, ...`JIRA (n).xls` to your Downloads folder.

## Step 2: Merge all bugs into a single CSV file

We need a giant CSV of all these bugs. There is probably a better way to do this, but I merged them all manually in google docs:

- Create a google docs spreadsheet, I called mine "JIRA Bug Dump"
- Open up as many tabs as you have spreadsheets that got downloaded in Step 1 (trust me on this)
- For each tab, go to File -> Import -> Upload and upload `JIRA (i).xls` (where `i` is the index of the sheet)
- Insert the upload as a new sheet in the document
- Once all sheets are inserted, create a new blank sheet (this is your "master" sheet)
- Copy in the column headings from one of the sheets
- Copy in the bugs from all the other sheets into this blank sheet (watch out for the extra cell JIRA creates at the end of each sheet)
- Export this "master" sheet as a CSV, I named mine `dump.csv`

If anyone knows a more efficient way to do this, by all means go ahead!

## Step 3: Generate markdown corpus

I used `node` to generate a large markdown document from `dump.csv`. For below to work, make sure to `npm i jira2md csvtojson`.

```js
// for markdown generation:
var j2m = require("jira2md")
var fs = require("fs")
var Converter = require("csvtojson").Converter
var csvConverter = new Converter({
  workerNum: 4,
})

// record_parsed will be emitted each csv row being processed
csvConverter.on("record_parsed", function (jsonObj) {
  console.log(jsonObj["Key"], "parsed")
})

// end_parsed will be emitted once parsing finished
csvConverter.on("end_parsed", function (jsonArray) {
  // uncomment below to to test on first 10 items
  // var outputMarkdown = jsonArray.slice(0, 10).map(function (row) {
  var outputMarkdown = jsonArray
    .map(function (row) {
      var r = ""
      r += "## " + row["Key"] + ": " + row["Summary"]
      r += "\n\n"
      var headerKeys = [
        "Priority",
        "Component",
        "FixVersion",
        "Reporter",
        "Assignee",
      ]
      headerKeys.forEach(function (k) {
        r += "- **" + k + ":** " + (row[k] ? row[k] : "*None*") + "\n"
      })

      if (row["Description"]) {
        r += "\n" + j2m.to_markdown(row["Description"]) + "\n"
      }

      return r
    })
    .join("\n-------\n\n")
  fs.writeFile("./bugs.md", outputMarkdown, function (err) {
    if (err) {
      return console.log(err)
    }

    console.log("done")
  })
})

// read from file
fs.createReadStream("./dump.csv").pipe(csvConverter)
```

Running this should generate `bugs.md`, which should be a monster concatenation of every bug ever filed (mine was 4.4MB).

## Step 4: Preprocess, train and sample your RNN

You need to install [torch-rnn](https://github.com/jcjohnson/torch-rnn) for this. You can install straight from that repo, but since I'm on linux I opted for the docker version: [docker-torch-rnn](https://github.com/crisbal/docker-torch-rnn). These instructions assume the docker version of `torch-rnn`.

Spin up and get a console in the container

```
docker run --rm -ti -v `pwd`:/data crisbal/torch-rnn:base bash
```

Preprocess data. This is a one-time thing.

```
python scripts/preprocess.py \
--input_txt /data/bugs.md \
--output_h5 /data/bugs.h5 \
--output_json /data/bugs.json
```

Train the network. This part took me two days, but the checkpoints saved periodically can still be sampled.

```
time th train.lua \
-input_h5 /data/bugs.h5 \
-input_json /data/bugs.json \
-gpu -1 \
-checkpoint_every 1000
```

Sample the network. Change length and checkpoint around to sample from different checkpoints / character lengths. Access the markdown output on your host machine in whatever path the container was started.

```
th sample.lua -gpu -1 -length 18000 -checkpoint cv/checkpoint_67900.t7 > /data/rnn_out.md
```
