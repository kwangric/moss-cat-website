document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector(".mc-loading")
    const blobs = Array.from(document.querySelectorAll(".mc-blur"))

    if (!root) return

    const prefersReducedMotion = window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches


    function applyDayTint() {
        const tint = document.querySelector(".mc-tint")
        if (!tint) return

        const hour = new Date().getHours()
        let color

        if (hour >= 5 && hour < 10) {
            color = "rgba(140, 200, 180, 0.4)"
        } else if (hour >= 10 && hour < 17) {
            color = "rgba(120, 190, 150, 0.35)"
        } else if (hour >= 17 && hour < 20) {
            color = "rgba(160, 130, 90, 0.35)"
        } else {
            color = "rgba(40, 60, 70, 0.45)"
        }

        tint.style.background = color
    }

    applyDayTint()

    setInterval(applyDayTint, 1000 * 60 * 30)

    if (prefersReducedMotion) {
        return
    }

    const MAX_MOTES = 35

    function createMote() {
        const existing = root.querySelectorAll(".mc-mote").length
        if (existing >= MAX_MOTES) return

        const mote = document.createElement("span")
        mote.className = "mc-mote"

        const left = 10 + Math.random() * 80
        const top = 20 + Math.random() * 70

        const size = 2 + Math.random() * 4

        mote.style.left = left + "%"
        mote.style.top = top + "%"
        mote.style.width = size + "px"
        mote.style.height = size + "px"

        const depth = Math.random()
        let duration

        if (depth < 0.5) {
            duration = 5 + Math.random() * 10
            mote.style.boxShadow = "0 0 3px rgba(255,255,255,0.4)"
            mote.style.filter = "blur(1px)"
        } else {
            duration = 3 + Math.random() * 2
            mote.style.filter = "blur(0px)"
            mote.style.boxShadow = "0 0 4px rgba(255,255,255,0.6)"
        }

        mote.style.animationDuration = duration + "s"

        root.appendChild(mote)

        setTimeout(() => {
            mote.remove()
        }, (duration + 1) * 1000)
    }


    function scheduleNextMote() {
        const delay = 500 + Math.random() * 900
        setTimeout(() => {
            createMote()
            scheduleNextMote()
        }, delay)
    }

    function createBloom(clientX, clientY) {
        const rect = root.getBoundingClientRect()

        const bloom = document.createElement("span")
        bloom.className = "mc-bloom"

        const left = ((clientX - rect.left) / rect.width) * 100
        const top = ((clientY - rect.top) / rect.height) * 100

        bloom.style.left = left + "%"
        bloom.style.top = top + "%"

        root.appendChild(bloom)

        setTimeout(() => {
            bloom.remove()
        }, 2000)
    }

    root.addEventListener("pointerdown", (event) => {
        if (event.button !== 0 && event.button !== undefined) return
        createBloom(event.clientX, event.clientY)
    })

    function triggerBlobFlicker() {
        if (!blobs.length) return

        const blob = blobs[Math.floor(Math.random() * blobs.length)]
        blob.classList.add("mc-flicker")

        setTimeout(() => {
            blob.classList.remove("mc-flicker")
        }, 1200)
    }

    function scheduleNextFlicker() {
        const delay = 5000 + Math.random() * 25000
        setTimeout(() => {
            triggerBlobFlicker()
            scheduleNextFlicker()
        }, delay)
    }

    scheduleNextMote()
    scheduleNextFlicker()
})
