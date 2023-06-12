let insertedValuesFiltered = []
const filterButtonsVisual = () => {
    const filterButtons = document.querySelectorAll(".filterButton")

    filterButtons[0].classList.add("pressed")

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (button.classList.contains("pressed")){
                button.classList.remove("pressed")
            }
            else {
                filterButtons.forEach((button) => {
                    button.classList.remove("pressed")
                })
                button.classList.add("pressed")

                if (button.id === "filter0") {
                    insertedValuesFiltered = insertedValues.filter((value) => value.categoryID === 0)
                    sumMaker(insertedValuesFiltered)
                    renderList(insertedValuesFiltered)
                    noValuesSituation()
                }
                else if (button.id === "filter1") {
                    insertedValuesFiltered = insertedValues.filter((value) => value.categoryID === 1)
                    sumMaker(insertedValuesFiltered)
                    renderList(insertedValuesFiltered)
                    noValuesSituation()
                }
                else {
                    sumMaker(insertedValues)
                    renderList(insertedValues)
                    noValuesSituation()
                }
            }
            if (button.classList.contains("pressed") === false){
                filterButtons[0].classList.add("pressed")
                sumMaker(insertedValues)
                renderList(insertedValues)
                noValuesSituation()
            }
        })
    })  
}
filterButtonsVisual()

const sumMaker = (array) => {
    let sum = 0
    array.forEach((element) => {
        if (element.categoryID === 0){
            sum += element.value
        }
        else {
            sum -= element.value
        }
    })
    const valueSpan = document.querySelector("#values__sum")
    valueSpan.innerHTML = `${sum.toFixed(2)}`
    return valueSpan
}
sumMaker(insertedValues)

const createCard = (item) => {
    const card = document.createElement("li")
    const cardValue = document.createElement("p")
    const cardContent = document.createElement("div")
    const cardTag = document.createElement("span")
    const deleteButton = document.createElement("img")
    
    cardValue.innerHTML = `R$ ${item.value.toFixed(2)}`
    
    cardContent.appendChild(cardTag)
    cardContent.appendChild(deleteButton)
    
    if (item.categoryID === 0){
        cardTag.innerText = "Entrada"
    }
    else {
        cardTag.innerText = "Saída"
    }

    card.setAttribute("class","main__Content valueCard")
    
    deleteButton.setAttribute("src","./src/assets/trash (1).svg")
    deleteButton.setAttribute("class","delete__button")
    deleteButton.setAttribute("id","image")
    deleteButton.setAttribute("alt","Excluir")
    
    deleteButton.addEventListener("click", () => {
        const currentCard = insertedValues.indexOf(item)
        insertedValues.splice(currentCard, 1)
        sumMaker(insertedValues)
        renderList(insertedValues)
        trashIconHover()
        noValuesSituation()
    })
    
    card.appendChild(cardValue)
    card.appendChild(cardContent)
    
    return card
}
const renderList = (array) => {
    const htmlList = document.querySelector("ul")
    htmlList.innerHTML = ""
    array.forEach(arrayItem => {
        htmlList.appendChild(createCard(arrayItem))
    })
}
renderList(insertedValues)

const noValuesSituation = () => {
    if (insertedValues.length === 0) {
        const htmlList = document.querySelector("ul")
        const card = document.createElement("li")
        const noValuesContainer = document.createElement("div")
        const noValuesTitle = document.createElement("h4")
        const noValuesSubtitle = document.createElement("h5")

        noValuesTitle.innerText = "Nenhum valor cadastrado"
        noValuesSubtitle.innerText = "Registrar novo valor"

        noValuesContainer.setAttribute("id","no-values__container")
        noValuesContainer.append(noValuesTitle,noValuesSubtitle)
        card.appendChild(noValuesContainer)
        htmlList.appendChild(card)

        const modalController = document.querySelector(".modal__controller")
        htmlList.addEventListener("click", () => {
            modalController.showModal()
        })
    }
}
noValuesSituation()

const trashIconHover = () => {
    let images = document.querySelectorAll("#image")
    
    images.forEach((imagem) => {
        imagem.addEventListener("mouseover", () => {
            imagem.setAttribute("src","./src/assets/trash.svg")
        })
        imagem.addEventListener("mouseleave", () => {
            imagem.setAttribute("src","./src/assets/trash (1).svg")
        })
    })
}
trashIconHover()