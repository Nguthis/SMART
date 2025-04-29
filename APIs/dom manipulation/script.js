const playground = document.getElementById("playground");

playground.append("Wizard");  //adding you use .append when you want to use string and appenChild when you want to append element

const magicalOrb = document.createElement('div');
magicalOrb.textContent = "Orb";
playground.append(magicalOrb)//adding textContent

const scrollOfWisdom = document.createElement('p');
playground.append(scrollOfWisdom);//adding  an element

scrollOfWisdom.innerText = "Ancient wisdom lies within";
console.log(scrollOfWisdon.innerText);//using innerText (produces thos that are visibly rendered)

scrollOfWisdom.textContent = "Ancient wisdom lies within";
console.log(scrollOfWisdom.textContent)//textContent (produces all text regardless of the styling)

//Using innerHTML
const spellBook = document.createElement('div');
spellBook.innerHTML = `<p>Spells include: 
<strong>Levitation</strong> and <em>Invisibility</em>!</p>`;
playground.append(spellBook);

//Removing element
const temporaryElement = document.createElement('p');
temporaryElement.textContent = "Now you see me.";
playground.append(temporaryElement);

temporaryElement.remove();//removing here
    //or
playground.removeChild(temporaryElement);

//Using loops to remove 
const fruitBasket = document.createElement('div');
fruitBasket.innerHtml = `
    <p>Apple</p>
    <p>Banana</p>
    <p>Cherry</p>`;
playground.append(fruitBasket);

while (fruitBasket.firstChild){//introduce the loop
    fruitBasket.removeChild(fruitBasket.firstChild);
}
//If you remove element from a dom , it is not be visible on the page but it is in memory if you have javascript referencing

//Working with attributes
const magicWand = document.createElement('div');
magicWand.setAttribute('id','wand1');//sets (id,id-name)
magicWand.setAttribute('class','magical-item');
magicWand.textContent = "Magic wand";
playground.append(magicWand);

console.log(playground.getAttribute("id"));//to get the attribute of the id its checked on the console


