function delay(duration = 500) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration)
    })
}

export default delay;