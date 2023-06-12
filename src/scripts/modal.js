const handleModal = () => {
    const button = document.querySelector(".addButton")
    const modalController = document.querySelector(".modal__controller")
    button.addEventListener("click", () => {
        modalController.showModal()
    })

    const closeModal = () => {
        const closeButton = document.querySelector(".modal__close")
        closeButton.addEventListener("click", () => {
            modalController.close()
        })

        const cancelButton = document.querySelector("#cancel__button")
        cancelButton.addEventListener("click", () => {
            modalController.close()
        })
    }
    closeModal()
}
handleModal()

const renderNew = () => {
    const modalController = document.querySelector(".modal__controller")
    const valueInput = document.querySelector("#modal__id")
    const cardTags = document.querySelectorAll(".tagButton")
    const insertButton = document.querySelector("#insert__button")

    cardTags.forEach((tag) => {
        tag.addEventListener("click",() => {
            if (tag.classList.contains("pressed")){
                tag.classList.remove("pressed")
            }
            else {
                cardTags.forEach((tag) => {
                    tag.classList.remove("pressed")
                })
                tag.classList.add("pressed")
            }
        })
    })

    insertButton.addEventListener("click", (e) => {
        e.preventDefault()
        if (valueInput.value !== "" || valueInput.value !== 0) {
            let newCardObj = {}
            newCardObj.value = parseFloat(valueInput.value)
            if (cardTags[0].classList.contains("pressed")) {
                newCardObj.categoryID = 0
            }
            else if (cardTags[1].classList.contains("pressed")) {
                newCardObj.categoryID = 1
            }
            else {
                return
            }
            insertedValues.push(newCardObj)
            valueInput.value = null
            cardTags.forEach((tag) => {
                tag.classList.remove("pressed")
            })
            sumMaker(insertedValues)
            renderList(insertedValues)
            modalController.close()
        }
    })
}
renderNew()