
// BUTTONS & LINKS
let TrynowButton=document.getElementById("trialbutton")
TrynowButton.addEventListener("click",function Trialpage(event){
	location.href="pokerhands.html"
})

let TrynowButton2=document.getElementById("trialbutton2")
TrynowButton2.addEventListener("click",function Trialpage(event){
	location.href="pokerhands.html"
})

let Free1=document.getElementById("Free1")
Free1.addEventListener("click",function Trialpage(event){
	location.href="freelesson.html"
})

let Free2=document.getElementById("Free2")
Free2.addEventListener("click",function Trialpage(event){
	location.href="freelesson.html"
})

let Free3=document.getElementById("Free3")
Free3.addEventListener("click",function Trialpage(event){
	location.href="freelesson.html"
})

let Free4=document.getElementById("Free4")
Free4.addEventListener("click",function Trialpage(event){
	location.href="freelesson.html"
})

let Free5=document.getElementById("Free5")
Free5.addEventListener("click",function Trialpage(event){
	location.href="freelesson.html"
})

let Free6=document.getElementById("Free6")
Free6.addEventListener("click",function Trialpage(event){
	location.href="freelesson.html"
})

let courses = ["Rules","Hands","Table Position","Glossary","Calculating Odds","Identifying Poker Hands!","Pot Odds & Expected Value","Basics","C-Betting","Bet Sizing","Overbetting","Detecting and Executing the Bluff","Hand Reviews","Opening","In the Table","Final Table"];

let search=document.getElementById("Search")
search.addEventListener("click",function Trialpage(event){
	location.href="freelesson.html"
})

// SEARCH BAR EXECUTION
autocomplete(document.getElementById("myInput"),courses);



// FUNCTIONS FOR THE SEARCH BAR
function autocomplete(inp,arr) {
  let currentFocus;
  inp.addEventListener("input", function(e) {
      let a, b, i, val = this.value;
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(a);
      for (i = 0; i < arr.length; i++) {
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          b = document.createElement("DIV");
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          b.addEventListener("click", function(e) {
              inp.value = this.getElementsByTagName("input")[0].value;
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });

  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) {
        currentFocus--;
        addActive(x);
      } else if (e.keyCode == 13) {
        location.href="freelesson.html";
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
  });

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}
