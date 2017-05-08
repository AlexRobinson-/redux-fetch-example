export default (failSometimes = true, timeout = 1000) => new Promise(
  (res, rej) => {
    setTimeout(() => {
      if (Math.floor(Math.random() * 3) === 2 || !failSometimes) {
        res()
      } else {
        rej(new Error('Connection error, please try again'));
      }

    }, timeout)
  }
)