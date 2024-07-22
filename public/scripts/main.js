/* Set the width of the sidebar to 250px (show it) */
function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

function openSearch() {
  let element = document.querySelector('.search-section').style;
  element.display==='none'? element.display='block':element.display='none';
}

  // Get the button:
  let mybutton = document.getElementById("myBtn");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function() {scrollFunction()};
  
  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }
  
  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  function video(cloudId){
    videoTag = document.querySelector('#video');
    videoInfo = document.querySelector('.video-player');
    videoTag.src = `https://player.cloudinary.com/embed/?cloud_name=delv0907j&public_id=${cloudId}&player[showJumpControls]=true&player[pictureInPictureToggle]=true`;
    
  }