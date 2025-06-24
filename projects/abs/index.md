---
title: Awesome Backup System
featuredImage: /abs/abs.png
date: 2011-01-03
dateFormat: 'yyyy'
---

Cross platform and bandwidth efficient file backups.

The Awesome Backup System (ABS) is a cross platform file backup solution. It consists of a server and native clients for OS X, Windows and Linux. They all communicate with the server through a common API.

ABS was written for a Software Design and Documentation class at RPI in the fall of 2011 by Lucas Doyle, Peter Fernandes, Kevin Todisco and Jeff Hui. Since it was written for a documentation class, the majority of the time making ABS was actually spent documenting things.

## Features

- **_Native clients:_** One of our goals was that all clients are native to their platforms. We wanted to stay away from cross platform tools like java or Qt for the GUI. Using these tools would have cut down on development time, but we felt that customer's expect a certain look and feel to their applications that are consistent with the platform they are running on.
- **_API:_** A common API for our server was developed using django to allow different languages and platforms to use ABS, as well as enforce implementation consistency for all clients. The API includes features for uploading and downloading files, managing different computers, authentication, and more. Additionally, the development API makes it easy to add new clients without changing anything on the server.
- **_Minimal bandwidth usage:_** The API was also designed so that clients would only have to transfer the minimal amount of file contents to the server. During a backup cycle, the client downloads a list of hashes from the server that correspond to files that have already been backed up. The client starts generating hashes for all the files it is currently trying to back up, and if any of them match the hashes downloaded from the server, then that particular file is already backed up and the upload is skipped.

## Possible Future Improvements

**_Security:_** ABS is lacking is in the security department. Because it was just a class project, security wasn't one of our goals. Still, we are using HTTPS (though we feel like that alone isn't a very good security measure) and never store or transfer passwords in plaintext. In fact, because the clients (and HTTPS technically) are stateless entities, every API request needs to be authenticated for it to do anything. This means no cookies or any artifact of your authentication other than a hashed password remains on the client.

**_Minimize disk space:_** Similar to git and other version control systems, one of the ways we could cut down on disk storage space for files is storing incremental "diffs" for changes between backup cycles.

## Code

Check out the source code on [github](https://github.com/Lorem/ABS)
