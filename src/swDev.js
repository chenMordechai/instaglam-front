
// for development mode
export default function swDev() {
    // console.log('swDev', process.env.NODE_ENV)

    // console.log('process:', process)
    let swUrl = '/sw.js'
    // let swUrl = '../public/sw.js'
    // console.log('swUrl:', swUrl)
    navigator.serviceWorker.register(swUrl)
        .then(res => {
            console.log('res', res)
        })
}
