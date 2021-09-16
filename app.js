"use strict";

const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');


// original array, correct
const fastestCars = [
     'F1',
     'Where Lambo?',
     'McLaren',
     'RS6',
     'Ford Mustang 69\'',
     'X5',
     'WRX STi',
     'Supra',
     'XC 90',
     'Peogot206'
];


// list items storing
const listItems = [];
let dragStartIndex;


// calling list creation
createList();


// Inserting list items into DOM
function createList() {
     [...fastestCars]
          .map(a => ({ value: a, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(a => a.value)
          .forEach((car, index) => {
               const listItem = document.createElement('li');
               listItem.setAttribute('data-index', index);
               listItem.innerHTML = `
          <span class='number'>${index + 1} </span>
          <div class = 'draggable' draggable = 'true'>
               <p class = 'car-name'> ${car}</p>
               <i class ='fas fa-grip-lines'></i>
          </div>`;
               listItems.push(listItem);
               draggableList.appendChild(listItem);
          });
     addEventListener();


     // drag event function call
};
function dragStart() {
     dragStartIndex = this.closest('li').getAttribute('data-index');
     // console.log('Event: ', 'dragstart');
}
function dragEnter() {
     this.classList.add('over')
     // console.log('Event: ', 'dragenter');
}
function dragLeave() {
     this.classList.remove('over')
     // console.log('Event: ', 'dragleave');
}
function dragOver(e) {
     // console.log('Event: ', 'dragover');
     e.preventDefault();
}
function dragDrop() {
     const dragEndIndex = +this.getAttribute('data-index');
     swapItems(dragStartIndex, dragEndIndex);
     this.classList.remove('over');
     // console.log('Event: ', 'drop');
}


// swapping items in list
function swapItems(fromIndex, toIndex) {
     const itemOne = listItems[fromIndex].querySelector('.draggable');
     const itemTwo = listItems[toIndex].querySelector('.draggable');

     listItems[fromIndex].appendChild(itemTwo);
     listItems[toIndex].appendChild(itemOne);
}


//  checking order on click
function checkOrder() {
     listItems.forEach((listItem, index) => {
          const carName = listItem.querySelector('.draggable').innerText.trim();
          if (carName !== fastestCars[index]) {
               listItem.classList.add('wrong');
          } else {
               listItem.classList.remove('wrong');
               listItem.classList.add('right');
          }
     })
}


// drag events
function addEventListener() {
     const draggables = document.querySelectorAll('.draggable');
     const draggablesListItems = document.querySelectorAll('.draggable-list li');
     draggables.forEach(draggable => {
          draggable.addEventListener('dragstart', dragStart);
     })
     draggablesListItems.forEach(item => {
          item.addEventListener('dragover', dragOver);
          item.addEventListener('drop', dragDrop);
          item.addEventListener('dragenter', dragEnter);
          item.addEventListener('dragleave', dragLeave);
     })
}

check.addEventListener('click', checkOrder);