document.addEventListener('DOMContentLoaded', () => {
    let rightHand = document.querySelector('#right')
    let leftHand = document.querySelector('#left')
    let draggable = false
    let offsetX = 0
    let offsetY = 0 // 
    let triggerSound = new Audio("plankton.mp3")
    let isLinked = false
    function playTriggerSound() {
        triggerSound.play()
    }

    function toggleSound() {
        let trigger = rightHand.getBoundingClientRect().left > window.innerWidth / 3
        if(trigger) {
            playTriggerSound()
        }
        setTimeout(() => {
            isLinked = false
            leftHand.style.transition = ".2s ease-out"
            leftHand.style.left = "0px"
            leftHand.style.top = "" // 
            leftHand.style.transition = "none"
        }, 4700)
    }

    function linkedToParent () {
        let shouldBeLinked = leftHand.getBoundingClientRect().right > rightHand.getBoundingClientRect().left
        if(shouldBeLinked){
            isLinked = true
        }
    }

    rightHand.addEventListener('pointerdown', (e) => {
        draggable = true
        rightHand.classList.remove('static')

        let rect = rightHand.getBoundingClientRect()

        offsetX = e.clientX - rect.left
        offsetY = e.clientY - rect.top //

        rightHand.style.left = `${e.clientX - rightHand.getBoundingClientRect().width/2}px`
        rightHand.style.top = `${e.clientY - rightHand.getBoundingClientRect().height/2}px`; 
    })

    rightHand.addEventListener('pointermove', (e) => {
        if(draggable){
            let rect = rightHand.getBoundingClientRect()
            let maxLeft = window.innerWidth - rect.width
            let maxTop = window.innerHeight - rect.height; //
            let desiredLeft = e.clientX - offsetX
            let desiredTop = e.clientY - offsetY //
            let clampedLeft = Math.min(Math.max(desiredLeft, 0), maxLeft) //!
            let clampedTop = Math.min(Math.max(desiredTop, 0), maxTop)
            rightHand.style.left = `${clampedLeft}px`
            rightHand.style.top = `${clampedTop}px`
            toggleSound()
            linkedToParent()
            if(isLinked){
                console.log('yes')
                leftHand.style.left = `${rightHand.getBoundingClientRect().left - leftHand.getBoundingClientRect().width + 50}px`
                leftHand.style.top = `${rightHand.getBoundingClientRect().top}px`
            }
        }
    })

    document.addEventListener('pointerup', () => {
        draggable = false
    })
})