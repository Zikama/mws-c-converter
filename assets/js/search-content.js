function searchContent(input, container,...n) {
    let e ; e = e || window.event;
    input = document.querySelector(input);

    input == "undefined"? input = document.querySelector(".s-input")  : input = input;

    input.addEventListener("keyup",function(){    
      let isContainer = document.querySelector(container);
      isContainer == "undefined" ? isContainer = document.querySelector(".s-container") : isContainer = isContainer;
      n = [...n];
      1>n.length ? n = ["allUnderContainer","*"] : n = n;

      let filter = input.value.toLowerCase();

      for (var i = 0; i < n.length; i++) {
        let content ="";
        if (n[0] === "allUnderContainer")
          content = isContainer.querySelectorAll(n[1]);

        if (n[0] !== "allUnderContainer")
         content = document.querySelectorAll(n[i]);


        for (let i = 0; i < content.length; i++) {

          if (content[i].innerText) {
            if (content[i].innerText.toLowerCase().indexOf(filter) > -1 && input.value !== " "){

              content[i].style.display = "block";
              content[i].style.background = "rgba(255, 255, 0, 0.37)";

              if(input.value == ""){
                content[i].style.display = "block";
                content[i].style.background = "transparent";
              }
            } else {
              if(input.value !== ""&&" "){
                content[i].style.display = "none";
                content[i].style.background = "transparent";
              }
            }
          }
        }
      }
    });
  }