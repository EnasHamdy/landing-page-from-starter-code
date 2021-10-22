/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
// Create a variable to hold all sections in the page.
const allSections = document.querySelectorAll("section");
// Get Navbar menu list.
let navbarMenuList = document.querySelector("#navbar__list");
// Set the delay time before hiding the navigation bar.
let timer = null;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
/**
 * 
 * This function checks if an element is in the viewport or not
 * @param {*} secElement is the element to check its visibility
 * @returns the result of check : boolean
 */

function isInView(secElement){  
    // 1 - Get the bounds of the element
    var bounding = secElement.getBoundingClientRect();
    // 2 - Check if the element is in the viewport or not
    if (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    ) {
        return true;    // The element is in the viewport
    } else {
        return false;   // The element is not in the viewport
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
/**
 * This function builds the navigation bar dynamically according to the number of sections on the page.
 */
function buildNavBar(){
    for (let i = 0; i < allSections.length; i++){
        // 1 - Create li: Navbar list item
        const newListItem = document.createElement("li");        
        // 2 - Create a: list item anchor link and set its attributes
        const newLink = document.createElement("a");
        newLink.innerText = allSections[i].getAttribute("data-nav");
        newLink.className = "menu__link";
        // 3 - Append link to li
        newListItem.appendChild(newLink);
        // 4 - Append li to ul
        navbarMenuList.appendChild(newListItem);    
    }
}

// Add class 'active' to section when near top of viewport
/**
 * This function adds active class to the section if it is in the viewport .
 */
function checkActiveSection(){
    for (let oneSection of allSections){
        // Sets a variable and assigns the result of isInView() method to it
        let viewStatus = isInView(oneSection);
        // If the result is true, set a section as active and activate the corresponding link
        if(viewStatus === true){
            // 1 - Set section as active            
            oneSection.classList.add("your-active-class");
            // 2 - Make navbar link active
            setNavLinkActive(oneSection);            
        } else {
            // Remove active class from a section
            oneSection.classList.remove("your-active-class");
        }
    }
}

// Scroll to anchor ID using scrollTO event
/**
 * This function gets the corresponding section of the clicked link
 * and scrolls to it in a smooth behavior.
 * @param {*} navLink the navbar clicked link
 */
 function scrollToSection(navLink){           
    // 1 - Get the corresponding section of the clicked link
    for (let oneSection of allSections){
        if (navLink.innerText === oneSection.getAttribute("data-nav")){  
            // 2 - Scroll to the section with smooth behavior
            oneSection.scrollIntoView({behavior: "smooth"});
        }
    }
}

/**
 * This function activates the navbar link if the corresponding section is in the viewport.
 * @param {*} secElement is the section which in the viewport
 */
 function setNavLinkActive(secElement){
    for (let navLink of navbarAnchorLinks){
        // 1 - Get the corresponding navigation bar link
        if(secElement.getAttribute("data-nav") === navLink.innerText){
            // 2 - Set the link as active
            navLink.setAttribute('style', 'background: #333; color: #fff; transition: ease 0.3s all');
        }
        else {
            // Remove active styles if it isn't the desired link
            navLink.removeAttribute('style', 'background: #333; color: #fff; transition: ease 0.3s all');
        }
    }
}

/**
 * This function creates a scroll to top button on the page, 
 * and set its id, text and styles.
 */
function createToTopButton(){
    // 1 - Create a new button
    const toTopBtn = document.createElement("button");
    // 2 - Set button id
    toTopBtn.setAttribute('id', "toTopId"); 
    // 3 - Set button text
    toTopBtn.innerText = "Top"; 
    // 4 - Set styles of the button
    toTopBtn.setAttribute("style", "display: none; position: fixed; bottom: 20px; right: 30px; z-index: 99; color: white; background-color: red; border: none; outline: none;  cursor: pointer; padding: 15px; border-radius: 10px; font-size: 18px;");
    // 5 - Append the button to the page
    document.body.appendChild(toTopBtn);
}

/**
 * This function defines whether or not to display the scroll to top button
 */
function scrollToTopButton() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      toTopBtn.style.display = "block";
    } else {
        toTopBtn.style.display = "none";
    }
  }

  // Hide fixed navigation bar
  /**
   * This function hides fixed navigation bar while not scrolling.
   * If a new scroll event occurred in the meantime, the timer is aborted, a new one is created 
   * and the navigation bar will be displayed. If not, the navigation bar will hide.
   */
function hideNavBar(){    
    if(timer !== null) {
        // Display navigation bar
        document.querySelector(".navbar__menu").style.display = "initial"; 
        clearTimeout(timer);
    }
    // Hide navigation bar after 4seconds
    timer = setTimeout(function() {       
       document.querySelector(".navbar__menu").style.display = "none";
    }, 4000);
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu
buildNavBar();

// Scroll to section on link click
// 1 - Get Navbar links
let navbarAnchorLinks = document.querySelectorAll("a");
// 2 - Add Click event listener to the link to scroll to the corressponding section
for (let navLink of navbarAnchorLinks){
    navLink.addEventListener('click', function(){
        scrollToSection(navLink);
    });
}

// Create scroll to top button on Page load
/**
 * Add event listener to the page to create 
 * the scroll to top button on load.
 */
document.body.addEventListener("load", createToTopButton());

/**
 * // Add event listener to the scroll to top button
 * When clicking on it, the page is scrolled to the top.
 */
let toTopBtn = document.querySelector("#toTopId");
toTopBtn.addEventListener("click", function(){
    // 1 - Scroll to the top of the page
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    // 2 - Deactivate navbar links (as default)
    for(let link of navbarAnchorLinks){
        link.removeAttribute('style', 'background: #333; color: #fff; transition: ease 0.3s all');    }
    // 3 - Display navigation bar
    document.querySelector(".navbar__menu").style.display = "initial"; 
});

// Add scroll event listener to the page
document.addEventListener("scroll", function(){
    // 1 - Display scroll up to top button
    scrollToTopButton();
    // 2 - Hide navigation bar while not scrolling
    hideNavBar();
    // 3 - Check the active section
    checkActiveSection();
});