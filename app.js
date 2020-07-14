var bookShelf = [{
  id: 0,
  title: '1984',
  author: 'Джордж Оруэл',
  date: '1949',
  image: 'book1984icon.jpg'
}];
var showWarningMessage = false;
var editMode = false;
var additionFormVisible = false;
var additionFormAnimationSpeed = 200;
var additionForm;
var editBookRecordId;
var lastId = 1;

function showAndHide() {
 
  if (additionFormVisible == true){
    additiveFormHide();
  } else {
    additiveFormShow();
  };

};

function createBookRecord() {

  let bookRecordData = {
    id: lastId,
    title: $('#editBookTitle').val(),
    author: $('#editBookAuthor').val(),
    date: $('#editBookDate').val(),
    image: $('#editBookImage').val()
  }

  if (bookRecordData.title == '' || bookRecordData.author == '' || bookRecordData.date == '' || bookRecordData.image =='' ) {
    if (showWarningMessage == false){
      showWarningMessage = true;
      $('#additiveWindow').append("<p class='warningMessage'>Пожалуйста заполните все поля!</p>");   
    }; 
  } else {
    if (editMode == true){
      bookShelf.forEach((bookRecord, i) => {
        if(bookRecord.id == editBookRecordId){
          bookRecord.title = bookRecordData.title;
          bookRecord.author = bookRecordData.author;
          bookRecord.date = bookRecordData.date;
          bookRecord.image = bookRecordData.image;
        };
      });
      editMode = false;
    } else {
      bookShelf.push(bookRecordData);
      lastId++;
    };

    additiveFormHide();
    clearAdditiveFormInputs();
    render();
  };

};

function cancelCreateBookRecord() {

  clearAdditiveFormInputs();

  additiveFormHide();
  editMode = false;
  editBookRecordId = null;

  showWarningMessage = false;
  $('.warningMessage').remove();
};

function deleteBookRecord() {
  
  let recordId = $(event.target).data('book-id');

  bookShelf.forEach((bookRecord, i) => {
    if(bookRecord.id == recordId){
      bookShelf.splice(i, 1);
    };
  });
  editMode = false;
  render();

};

function editBookRecord() {

  let recordId = $(event.target).data('book-id');
  editMode = true;

  if(additionFormVisible == false){
    additiveFormShow();
  };

  bookShelf.forEach( bookRecord => {
    if(bookRecord.id == recordId){
      $('#editBookTitle').val(bookRecord.title);
      $('#editBookAuthor').val(bookRecord.author);
      $('#editBookDate').val(bookRecord.date);
      $('#editBookImage').val(bookRecord.image);
    };
  });
  editBookRecordId = recordId;
};

$('input').on('click', () => {
  showWarningMessage = false;
  $('.warningMessage').remove();
});

$(function (){
  preLoading();
  render();
});

function bindignKeys() {

  $('.btnDelete').on('click', deleteBookRecord);
  $('.btnEdit').on('click', editBookRecord);

};

function clearAdditiveFormInputs() {
  $('#editBookTitle').val('');
  $('#editBookAuthor').val('');
  $('#editBookDate').val('');
  $('#editBookImage').val('');
};

function additiveFormHide() {
  additionFormVisible = false;
  additionForm.hide(additionFormAnimationSpeed);
};

function additiveFormShow() {
  additionFormVisible = true;
  additionForm.show(additionFormAnimationSpeed);
};

function render() {

$('.book').remove();

bookShelf.forEach( bookRecord => {

  $('#bookshelf').append(
        `<div class='book' data-book-id='${bookRecord.id}'>
          <p>Название книги: ${bookRecord.title}</p>
          <p>Автор: ${bookRecord.author}</p>
          <p>Дата публикации: ${bookRecord.date} г.</p>
          <img src=${bookRecord.image}>
          <div class='bookRecordButtons'>
            <button type='button' class='btnEdit buttonInput' data-book-id='${bookRecord.id}'>Редактировать</button>|
            <button type='button' class='btnDelete buttonInput' data-book-id='${bookRecord.id}'>Удалить</button>
          </div>
        </div>`);

});
  bindignKeys();
};

function preLoading() {

  $('#showAndHideBtn').on('click', showAndHide);
  $('#btnSave').on('click', createBookRecord);
  $('#btnCancel').on('click', cancelCreateBookRecord);

  bindignKeys();

  additionForm = $('#additiveWindow');
};