// for development mode
export default async function swDev() {

    // check permission
    if (!('serviceWorker' in navigator)) {
        throw new Error('No support for service worker')
    }
    if (!('Notification' in window)) {
        throw new Error('No support for notification API')
    }

    // register SW
    const swUrl = '/sw.js'
    const registration = await navigator.serviceWorker.register(swUrl)
    console.log('registration:', registration)

    // request notification permission
    const permission = await Notification.requestPermission()

    if (permission !== 'granted') {
        throw new Error('Notification permission not granted')
    } else {
        // work
        // new Notification('Example', {
        //     body: "More text"
        // })
    }

    // push notification
    registration.showNotification('Hello World')
    console.log('registration.showNotification')
    // return registration


}

