const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const { app, server } = require('./app');

const config = require('../nuxt.config.js');

async function start() {
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;
  

  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  app.use(nuxt.render);

  server.listen(port, () => {
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true,
    });
  });
}

try {
  start()
} catch(e) {
  console.log(e)
}
