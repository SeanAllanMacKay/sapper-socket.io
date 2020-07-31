import express from 'express' 
import http from 'http'
import sirv from 'sirv'

import compression from 'compression'
import * as sapper from '@sapper/server';
import socketIO from 'socket.io-client'

const app = express()
const server = http.createServer(app)

const io = socketIO(server)

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

io.on('connection', (socket) => {
	console.log('connected')
})

app
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)

server.listen(PORT, err => {
	if (err) console.log('error', err);
});




	

