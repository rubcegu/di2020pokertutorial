// Wrap every letter in a span
var textWrapper = document.querySelector('.ml3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.ml3 .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 700,
    delay: (el, i) => 50 * (i+1)
  });

//   let TrynowButton=document.getElementById("trialbutton")
// TrynowButton.addEventListener("click",function Trialpage(event){
//   location.href="courses.html"
// })


// let TrynowButton=document.getElementById("trialbutton")
// TrynowButton.addEventListener("click",function Trialpage(event){
//   location.href="pokerhands.html"
// })