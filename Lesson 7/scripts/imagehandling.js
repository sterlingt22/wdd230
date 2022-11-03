// get all imgs with data-src attribute
const imagesToLoad = document.querySelectorAll("img[data-src]");

//console.log(imagesToLoad);
//optional parameters being set for the IntersectionalObserver
const imgOptions = {
    rootMargin: '0px 0px 50px 0px',
    threshold: 1  //.5
};

const loadImages = (image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = () => {
        image.removeAttribut('data-src');
    };
};

//first check to see if Intersection Observer is supported
if('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((items, imgObserver)) => {
      items.forEach(item => {
        if (item.isIntersecting) {
            loadImages(item.target);
            imgObserver.unobserve(item.target);
        }
      });
    }, imgOptions);

  //loop through each img and check status and load if necessary
  imagesToLoad.forEach(img => {
    imgObserver.observe(img);
  });
} else { //just load All images if not supported
    imagesToLoad.farEach(img => {
        loadImages(img);
    });

}
