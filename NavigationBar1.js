import React, { useState } from 'react';
import './NavigationBar.css';

const NavigationBar = () => {
  const [tabs, setTabs] = useState(["Company", "Personal", "Educational", "Professional", "Documents"]);
  const [draggedTab, setDraggedTab] = useState(null);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
    setDraggedTab(tabs[index]);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    const droppedIndex = index;
    const draggedIndex = e.dataTransfer.getData("index");
    if (draggedIndex !== droppedIndex) {
      const newTabs = [...tabs];
      newTabs.splice(droppedIndex, 0, draggedTab);
      if (draggedIndex < droppedIndex) {
        newTabs.splice(draggedIndex, 1);
      } else {
        newTabs.splice(draggedIndex + 1, 1);
      }
      setTabs(newTabs);
    }
    setDraggedTab(null);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className="nav-item"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
          >
            <span className="nav-link">{tab}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationBar;

// import React, { useState } from "react";

// const NavigationBar = () => {
//   const [tabs, setTabs] = useState([
//     {
//       id: 1,
//       label: "Home",
//     },
//     {
//       id: 2,
//       label: "About",
//     },
//     {
//       id: 3,
//       label: "Contact",
//     },
//   ]);

//   const handleShiftTab = (direction) => {
//     const newTabs = [...tabs];
//     const currentIndex = newTabs.findIndex((tab) => tab.id === 1);
//     const nextIndex = currentIndex + direction;

//     if (nextIndex < 0 || nextIndex >= newTabs.length) {
//       return;
//     }

//     const [currentTab, nextTab] = [newTabs[currentIndex], newTabs[nextIndex]];
//     newTabs[currentIndex] = nextTab;
//     newTabs[nextIndex] = currentTab;

//     setTabs(newTabs);
//   };

//   return (
//     <div className="navigation-bar">
//       <ul>
//         {tabs.map((tab) => (
//           <li key={tab.id}>
//             <button onClick={() => handleShiftTab(1)}>{tab.label}</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

//  export default NavigationBar;