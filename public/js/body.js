

// Handle Slide show


var slideIndex = 1;
currentSlide(slideIndex);
autoShowSlides();

function currentSlide(slide){
	showSlide(slideIndex = slide);
}

function plusSlides(slide){
	showSlide(slideIndex += slide);
}

function showSlide(slide){
	var images = document.getElementsByClassName("main__slideshow-element");
	var buttons = document.getElementsByClassName("dot");
	if(slideIndex > images.length){
		slideIndex = 1;
	}
	else if(slideIndex < 1){
		slideIndex = images.length;
	}
	for(var button of buttons){
		button.className = button.className.replace(" active","");
	}
	for(var image of images){
		image.style.display = "none";
	}
	images[slideIndex-1].style.display = "block";
	buttons[slideIndex-1].className += " active";

}

function autoShowSlides() {
  var i;
  var slides = document.getElementsByClassName("main__slideshow-element");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(autoShowSlides, 5000); // Change image every 5 seconds
}