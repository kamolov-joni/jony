import React from 'react';
import './tabs.css';

const Tabs = ({ selectedCategory, onSelectCategory }) => {
  return (
    <section className="category-menu">
      <div className="container">
        <div className="category-tabs">
          <button
            className={`category-tab ${selectedCategory === "somsa" ? "active" : ""}`}
            onClick={() => onSelectCategory("somsa")}
          >
            Somsalar
          </button>
  
          <button
            className={`category-tab ${selectedCategory === "drinks" ? "active" : ""}`}
            onClick={() => onSelectCategory("drinks")}>
            Ichimliklar
          </button>
        </div>
      </div>
    </section>
  );
};

export default Tabs;
