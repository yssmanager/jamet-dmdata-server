import ioEmitter from 'socket.io-emitter'

const redisHost = process.env.REDIS_HOST || 'localhost';
const io = ioEmitter({ host: redisHost, port: 6379 })

const nspAdmin = io.of('/admin')
const nspWeather = io.of('/weather')
const nspEarthQuake = io.of('/earthquake')

type emitterOptions = {
  namespace?: string
  room?: string
  isBroadcast?: boolean
}
const emitter = (event: string, data: any[], options?: emitterOptions) => {
  let ioTo = io;
  if (options?.namespace !== undefined) {
    ioTo = ioTo.of(options.namespace)
  }
  if (options?.room !== undefined) {
    ioTo = ioTo.to(options.room)
  }

  ioTo.emit(event, ...data);
}

export default emitter