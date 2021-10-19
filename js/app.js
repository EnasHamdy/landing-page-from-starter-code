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
const allSections = document.querySelectorAll('section');

// Get Navbar menu list
let navbarMenuList = document.getElementById("navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
/**
 * 
 * This function checks if an element is in the viewport or not
 * @param {*} secElement is the element to check its visibility
 * @returns the result of check (boolean)
 */
function isInView(secElement){  
    // Get the bounds of the element
    var bounding = secElement.getBoundingClientRect();
    // Check if the element is in the viewport or not
    if (
        (bounding.top >= 0) &&
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
function buildNavBar(){
    for (let i=0; i<allSections.length; i++){
        // 1 - Create li: Navbar list item
        const newListItem = document.createElement("li");
        
        // 2 - Create a: list item link and set its attributes
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



// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNavBar();


// Scroll to section on link click


// Set sections as active        
document.addEventListener("scroll", function(){
    for (let oneSection of allSections){
        // Sets a variable and assigns the result of isInView() method to it
        let viewStatus = isInView(oneSection);
        // If the result is true, set a section as active
        if(viewStatus === true){
            oneSection.className = "your-active-class";
        } else {
            oneSection.className = "";
        }
    }
});

