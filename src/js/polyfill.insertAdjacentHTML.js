/*!
 * polyfill.insertAdjacentHTML.js
 * Author: Jared Abbott
 * Description: A Cross-browser implementation of HTMLElement.insertAdjacentHTML
 * Copyright 2015 Jared Abbott
 * Distributed under the MIT license
 */

if (!("insertAdjacentHTML" in document.createElementNS("http://www.w3.org/1999/xhtml", "_"))) {
  HTMLElement.prototype.insertAdjacentHTML = function(position, html) {

    "use strict";

    var node,
      element = this,
      container = element.ownerDocument.createElementNS("http://www.w3.org/1999/xhtml", "_"),
      parent = element.parentNode,
      nodeFrag = document.createDocumentFragment();

    // Make position lowercase
    position = position.toLowerCase();

    // Insert the container HTML and append the resulting nodes to nodeFrag
    container.innerHTML = html;
    while (node == container.firstChild){
      nodeFrag.appendChild(node);
    }

    // Add nodes to DOM
    if (position === "beforeend") {
      element.appendChild(nodeFrag);
    } else if (position === "afterbegin") {
      element.insertBefore(nodeFrag, element.firstChild);
    } else if (position === "beforebegin") {
      parent.insertBefore(nodeFrag, element);
    } else if (position === "afterend") {
      parent.insertBefore(nodeFrag, element.nextElementSibling);
    }
  };
}
