📸 React Gallery Application

A modern, responsive image gallery web application built with React and Tailwind CSS. It fetches images from the Picsum API and provides a smooth user experience with features like search, filtering, favorites, and image preview modal.


📌 Features
🔍 Debounced Search (smooth author search without lag)
🎯 Author Filter Dropdown
📸 Image Grid Gallery (responsive layout)
❤️ Favorites System (Instagram-like)
💾 LocalStorage Support (favorites persist after refresh)
🖼️ Image Modal Preview (fullscreen view)
📦 Dynamic Image Limit Selector (10–50 images)
📄 Pagination System
⚡ Optimized rendering with React best practices
📱 Fully Responsive Design
🛠️ Tech Stack
⚛️ React (Hooks)
🎨 Tailwind CSS
🌐 Picsum Photos API
💾 LocalStorage (Browser Storage)
⚡ JavaScript (ES6+)
📷 API Used

This project uses the Picsum Photos API:

https://picsum.photos/v2/list

It provides random images with metadata like:

author
width
height
download URL
📁 Project Structure
src/
│── App.jsx
│── Navbar.jsx
│── Content.jsx
│── ImageModal.jsx
│── index.css
⚙️ Installation & Setup

Clone the repository:

git clone https://github.com/your-username/gallery-app.git

Move into the project folder:

cd gallery-app

Install dependencies:

npm install

Run the project:

npm run dev
📦 Build for Production
npm run build
✨ Key Features Explained
🔍 Debounced Search

Prevents unnecessary API filtering by delaying input handling, improving performance.

❤️ Favorites System

Users can save favorite images which are stored in localStorage.

🖼️ Image Modal

Click any image to view it in a fullscreen popup with details.

🎯 Author Filter

Dropdown menu to filter images by selected author.

📦 Image Limit Control

Users can choose how many images to load (10, 20, 30, 50).

📈 Performance Improvements
React.memo optimization
Lazy image loading
Debounced input handling
Reduced unnecessary re-renders
Efficient filtering logic
🎯 Future Improvements
Infinite scroll (replace pagination)
Dark mode support 🌙
Backend for synced favorites
Image download button
Share functionality
Skeleton loading UI
👨‍💻 Author
GitHub: Your Username
📄 License

This project is open-source and available under the MIT License.