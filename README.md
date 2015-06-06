# Cannon

A server and client side ReactJS powered blogging engine.

## How

Cannon is run as a series of ExpressJS middlewares that you run on a server
locally whilst building and developing your site. Once you're ready to deploy,
Cannon provides you with a tool to generate a directory of static files
containing your application. These can then be pushed live (GitHub Pages, Amazon
S3, for example) to any host that can store static files. No server is needed in
production, and your site will work in clients with and without JavaScript
enabled.

The idea from Cannon and a lot of the approach is taken from [How we built the
new
gocardless.com](https://gocardless.com/blog/how-we-built-the-new-gocardless.com/).

## Getting Started

_Cannon is currently very unstable and should not be considered stable, yet. As
it gets to that stages more documentation will be written._

Your first step is to create a new empty folder for your project and run:

```
npm init
npm install --save cannon-blog
```

## Available Middlewares

_Coming Soon_
