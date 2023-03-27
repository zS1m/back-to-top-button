/* back-to-top-button.js v1.0.0 */
(function (w, d) {
  'use strict';

  w.backToTopButton = onLoad;
  addStyles();

  function onLoad() {
    if (d.readyState === 'interactive' || d.readyState === 'complete') {
      documentReady();
    } else {
      w.addEventListener('DOMContentLoaded', documentReady);
    }
  }

  function documentReady() {
    addButton();
    toggleButton();
  }

  /**
   * Add a button at the end of the body that, when clicked, will scroll to the top
   */
  function addButton() {
    const buttonBlock = d.createElement('div');
    buttonBlock.id = 'back-to-top-container';
    buttonBlock.innerHTML = `<button class="back-to-top-button">TOP</button>`;
    buttonBlock.addEventListener('click', scrollToTop);
    d.body.appendChild(buttonBlock);
  }

  /**
   * Monitor the position of the button container and control the visibility of the button
   */
  function toggleButton() {
    const scrollButton = d.querySelector('#back-to-top-container .back-to-top-button');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          scrollButton.classList.remove('show');
        } else {
          scrollButton.classList.add('show');
        }
      })
    });
    observer.observe(d.getElementById('back-to-top-container'));
  }

  /**
   * Scroll to top
   */
  function scrollToTop() {
    w.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  /**
   * Set styles for button container and button
   */
  function addStyles() {
    const style = d.createElement('style');
    style.textContent = `
      #back-to-top-container {
        position: absolute;
        top: 0;
        left: 0;
        height: 0;
        width: 0;
      }
      #back-to-top-container .back-to-top-button {
        position: fixed;
        bottom: 64px;
        right: 64px;
        height: 50px;
        width: 50px;
        border: none;
        border-radius: 5px;
        background-color: #fff;
        font-size: 16px;
        line-height: 50px;
        cursor: pointer;
        visibility: hidden;
        opacity: 0;
        transition: all 0.3s ease;
      }
      #back-to-top-container .back-to-top-button.show {
        visibility: visible;
        opacity: 1;
      }
      #back-to-top-container .back-to-top-button:hover {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        background-image: linear-gradient(to bottom right, #b2dfdb, #03a9f4);
      }
    `;
    d.head.appendChild(style);
  }
})(window, document);

backToTopButton();
