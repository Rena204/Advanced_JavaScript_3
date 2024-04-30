// Функция для добавления отзыва
function addReview() {
    const productName = document.getElementById("productNameInput").value.trim();
    const reviewText = document.getElementById("reviewTextInput").value.trim();
    
    if (!productName || !reviewText) {
      alert("Пожалуйста, введите название продукта и отзыв.");
      return;
    }
    
    // Получаем текущие отзывы из LocalStorage
    const reviews = JSON.parse(localStorage.getItem("reviews")) || {};
    
    // Добавляем новый отзыв
    if (!reviews[productName]) {
      reviews[productName] = [reviewText];
    } else {
      reviews[productName].push(reviewText);
    }
    
    // Сохраняем обновленные отзывы в LocalStorage
    localStorage.setItem("reviews", JSON.stringify(reviews));
    
    alert("Отзыв успешно добавлен.");
    document.getElementById("productNameInput").value = "";
    document.getElementById("reviewTextInput").value = "";
  }
  
  // Функция для отображения отзывов по выбранному продукту
  function showReviews(productName) {
    const reviewsContainer = document.getElementById("reviewsContainer");
    reviewsContainer.innerHTML = "";
    
    const reviews = JSON.parse(localStorage.getItem("reviews")) || {};
    if (!reviews[productName]) {
      reviewsContainer.textContent = "Нет отзывов для этого продукта.";
      return;
    }
    
    reviews[productName].forEach(review => {
      const reviewElement = document.createElement("div");
      reviewElement.textContent = review;
      
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Удалить";
      deleteButton.onclick = function() {
        deleteReview(productName, review);
      };
      
      reviewElement.appendChild(deleteButton);
      reviewsContainer.appendChild(reviewElement);
    });
  }
  
  // Функция для удаления отзыва
  function deleteReview(productName, reviewText) {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || {};
    const index = reviews[productName].indexOf(reviewText);
    if (index !== -1) {
      reviews[productName].splice(index, 1);
      localStorage.setItem("reviews", JSON.stringify(reviews));
      showReviews(productName);
      alert("Отзыв успешно удален.");
    }
  }
  
  // Функция для отображения списка продуктов и отзывов
  function showProductsList() {
    const productsList = document.getElementById("productsList");
    productsList.innerHTML = "";
    
    const reviews = JSON.parse(localStorage.getItem("reviews")) || {};
    for (const productName in reviews) {
      const productItem = document.createElement("li");
      productItem.textContent = productName;
      productItem.onclick = function() {
        showReviews(productName);
      };
      productsList.appendChild(productItem);
    }
  }
  
  // Показываем страницу просмотра отзывов и список продуктов при загрузке страницы
  window.onload = function() {
    document.getElementById("viewReviewsPage").style.display = "block";
    showProductsList();
  };
  