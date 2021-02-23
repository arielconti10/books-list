# BookList

This project is a simple app built with React Native to search and display books on [Google Books](https://developers.google.com/books/docs/v1/using)

# Screenshots

![Home](https://raw.githubusercontent.com/arielconti10/books-list/master/screenshots/screen1.png)
![List](https://raw.githubusercontent.com/arielconti10/books-list/master/screenshots/screen2.png)
![Detail](https://raw.githubusercontent.com/arielconti10/books-list/master/screenshots/screen3.png)

# Main Features

### Home

- Buscar por um tema
- Navegar direto para a lista com um tema sugerido (setted to "Harry Potter")

### List

- Display the books in a FlatList with infinite scroll, to see more results just scroll at the bottom

- Go to the detail screen of the book

- Search for another theme

### Detail

- View all the informations about the book selected
- Like
- Rating with stars

# Requirements

- Yarn
- React Native
- IOS/Android Emulator or device

# Installation

Clone this repository and follow these steps

### IOS

1. yarn install
2. cd ios && pod install && cd ..
3. yarn ios

### Android

1. yarn install
2. yarn android
