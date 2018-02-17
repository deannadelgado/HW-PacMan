/*
Problem Set 1 PacMan  - Bounce off Walls 
1)  Bounce off Walls -  Given the code below and the 4 images  
PacMan1.png etc make the PacMan bounce off the boundary at x=600px 
so that it reverses its direction of motion and uses the last 2 images.
Then make it bounce off the boundary at x = 0px.  
You will need to take into account the size of the image.

*/
<html>
<head>
<SCRIPT>
    var flag = 1;
    var direction = 0;
    var pos = null;  // this is a JavaScript Object
    var timer = null;
    var img1;
    var velocity = 5;
    var deltaT = 1;
    var stepSize = velocity * deltaT;
    var target = null;
    var mouseOffset = {x:0, y:0};

    window.onload = function(){
        img1 = document.getElementById("PacMan");
        pos = {x:100,y:100};
        img1.addEventListener('mousedown',startDrag);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup',stopDrag);
    };

    
    //Hint: Update function so that it calls the appropriate functions in the correct order and allows user to drag the the image.
    function Run(){ 
        img1.style.top  = pos.y + "px";
        img1.style.left = pos.x + "px";

        updatePosition();
        checkWallCollision();
        chooseImage();
        startDrag();
        drag();
        stopDrag();
    }

    //Hint: Update the position of the pacman based on its previous position plus its velocity * deltaT.  You should use the pos object to keep track of position.
    function updatePosition(){
        pos.x += stepSize;
    }

    //Hint: Update function to checks if image has "hit" the wall on either side, and bounces off horizontally in the opposite direction (it should turn around and start chomping in the other direction)
    function checkWallCollision(){
        if (pos.x >= 600){
            pos.x = 600;
            stepSize = -stepSize;
            direction=1;
        }
        if (pos.x < 0){
            pos.x = 0;
            stepSize = -stepSize;
            direction=0;        
        }
    }

    //Hint: Update function to select image based on flag value to decide the direction pacman is moving towards.
    function chooseImage(){
        if(direction === 0){    
            if(flag === 1){
                img1.src = "PacMan2.png";
                flag=0;
            }
            else {
                img1.src = "PacMan1.png";
                flag=1;
            }
        }
        else{   
            if(flag === 1){
                img1.src = "PacMan4.png";
                flag=0;
            }
            else {
                img1.src = "PacMan3.png";
                flag=1; 
            }
        }
    }

function startDrag(e){
        target = e.target;
        mouseOffset = {
            x: e.clientX-target.offsetLeft,
            y: e.clientY-target.offsetTop

        };
    }

    function drag(e){
        if (target !== null){
            target.style.left = e.clientX - mouseOffset.x;
            target.style.top = e.clientY - mouseOffset.y;
            e.preventDefault();
            pos.x=e.clientX - mouseOffset.x;
            pos.y=e.clientY - mouseOffset.y;
        }
    }

    function stopDrag(e){
        if (target !== null){
            target.style.left = e.clientX - mouseOffset.x;
            target.style.top = e.clientY - mouseOffset.y;
            target = null;
        }   
    }

    function RunPhysics(){timer = setInterval(Run,100); // calls Run every 100ms
    }

    function ResetTimer(){clearInterval(timer);
    }
</SCRIPT>
</head>
<body>
    <div>
    <!-- this is a comment in html -->
     <input type="button" value="Start" onclick= "RunPhysics()" />
     <input type="button" value="Stop"  onclick= "ResetTimer()" />
     <img id="PacMan" src="PacMan1.png" width="200" height="200" style="position:absolute" />
    </div>
</body>
</html>