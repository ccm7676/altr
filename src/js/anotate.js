const colorSelector = document.querySelector(".color-selector");
const colorSelectorInp = document.querySelector(".color-selector input");
const pen = document.querySelector(".pen");
const strokeBtn = document.querySelector(".stroke-icon");
const strokeSelector = document.querySelector(".stroke-selector");
const strokeSlider = document.querySelector(".slider");
const strokeExample = document.querySelector(".stroke-example");
const eraser = document.querySelector(".eraser");
const trash = document.querySelector(".trash");
const NewCanvasMenu = document.querySelector(".create-menu");
const AddButton = document.querySelector(".add-button");
const FileInput = document.querySelector(".file-inp");
const createBtn = document.querySelector(".create-btn");
const WidthInp = document.querySelector(".width-inp");
const HeightInp = document.querySelector(".height-inp");
const BgColorPicker = document.querySelector(".bg-color-picker");
const saveBtn = document.querySelector(".save-btn");
const downloader = document.querySelector(".downloader");
const canvasSelector = document.querySelector(".canvas-selector");

var newCanvas;
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var canvases = document.querySelectorAll("canvas");
var mode = "painting"
var NewCanvasMenuVisible = false;
var strokeSelectorVisible = false;
var strokeWidth = 3*vh;
var currEditing = false;
var currErasing = false;
var paintColor = "#000000";
var vh = window.innerHeight / 100;   


ctx.lineWidth = strokeWidth;
canvas.height = 60*vh;
canvas.width = 80*vh;


function erase(e){
    if(!currEditing|| mode != "erasing"){
        return;
    }
    ctx.globalCompositeOperation = "destination-out";
    ctx.strokeStyle = "#00FF00";
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.lineTo(e.clientX - canvas.offsetLeft + canvas.width*0.5 , e.clientY - canvas.offsetTop + canvas.height * 0.5);
    ctx.moveTo(e.clientX - canvas.offsetLeft + canvas.width*0.5 , e.clientY - canvas.offsetTop + canvas.height * 0.5)
  
    ctx.stroke();
    

}


function draw(e){
    if(!currEditing || mode != "painting"){
        return;
    }
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = paintColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.lineTo(e.clientX - canvas.offsetLeft + canvas.width*0.5, e.clientY - canvas.offsetTop + canvas.height * 0.5);
    ctx.moveTo(e.clientX - canvas.offsetLeft + canvas.width*0.5, e.clientY - canvas.offsetTop + canvas.height * 0.5)
    ctx.stroke();
    
}

canvas.addEventListener("mousedown", ()=>{currEditing = true; ctx.beginPath();})
window.addEventListener("mouseup", ()=>{currEditing = false; ctx.endPath})
canvas.addEventListener("mousemove", (e) => {if(mode == "painting"){draw(e)}else if(mode == "erasing"){erase(e)}});





pen.addEventListener("click",()=>{
    if(mode != "painting"){
        mode = "painting";
        eraser.style.backgroundColor = "#00000000";
        pen.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    }
    else{
        mode = "";
        pen.style.backgroundColor = "#00000000";
    }
})


eraser.addEventListener("click",()=>{
    if(mode != "erasing"){
        mode = "erasing";
        pen.style.backgroundColor = "#00000000";
        eraser.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    }
    else{
        mode = "";
        eraser.style.backgroundColor = "#00000000";
    }
})


colorSelectorInp.addEventListener("change", ()=>{
    colorSelector.style.backgroundColor = colorSelectorInp.value;
    paintColor = colorSelectorInp.value;
})

strokeSlider.addEventListener("change", ()=>{
    strokeWidth = strokeSlider.value/10 * vh;
    strokeExample.style.width = (strokeSlider.value/10).toString() + "vh";
    strokeExample.style.height = (strokeSlider.value/10).toString() + "vh";
})

strokeBtn.addEventListener("click", () => {
    if(!strokeSelectorVisible){
        strokeSelector.style.display = "block";
        strokeSelectorVisible = true;
    }
    else{
        strokeSelector.style.display = "none";
        strokeSelectorVisible = false;
    }
})

window.addEventListener("mousedown", (e) => {
    if(!(strokeSelector.contains(e.target)) && strokeSelectorVisible){
        strokeSelector.style.display = "none";
        strokeSelectorVisible = "false";
        
    }
    if(!(NewCanvasMenu.contains(e.target)) && NewCanvasMenuVisible){
        NewCanvasMenu.style.display = "none";
        NewCanvasMenuVisible = false;
    }
})

trash.addEventListener("click", ()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

AddButton.addEventListener("click", ()=>{
    if(!NewCanvasMenuVisible){
        NewCanvasMenu.style.display = "block";
        NewCanvasMenuVisible = true;
    }
    else{
        NewCanvasMenu.style.display = "none";
        NewCanvasMenuVisible = false;
    }
})

FileInput.addEventListener("change", ()=>{
    const reader = new FileReader();
    reader.readAsDataURL(FileInput.files[0]);
    reader.addEventListener("load", ()=>{

        localStorage.setItem("selected-file", reader.result)
        
    })
    
})



createBtn.addEventListener("click", ()=>{
    canvases = document.querySelectorAll("canvas");

        canvases.forEach((elem)=>{
            elem.style.display = "none";
        })

    if(FileInput.files.length <= 0){
        newOption = document.createElement("option");
        newOption.innerHTML = "canvas"+(canvases.length + 1).toString();
        newOption.value = "canvas"+(canvases.length + 1).toString();
        canvasSelector.appendChild(newOption);
        newCanvas = document.createElement("canvas");
        newCanvas.classList.add("canvas"+(canvases.length + 1).toString());

        
        newCanvas.width = WidthInp.value;
        newCanvas.height = HeightInp.value;
        newCanvas.style.backgroundColor = BgColorPicker.value;
        document.body.appendChild(newCanvas);
        canvas = document.querySelector(".canvas"+(canvases.length + 1).toString());
        ctx = canvas.getContext("2d");
        canvas.addEventListener("mousedown", ()=>{currEditing = true; ctx.beginPath();})
        window.addEventListener("mouseup", ()=>{currEditing = false; ctx.endPath})
        canvas.addEventListener("mousemove", (e) => {if(mode == "painting"){draw(e)}else if(mode == "erasing"){erase(e)}});
       
    }
    else {
        newOption = document.createElement("option");
        newOption.innerHTML = "canvas"+(canvases.length + 1).toString();
        newOption.value = "canvas"+(canvases.length + 1).toString();
        canvasSelector.appendChild(newOption);
        newCanvas = document.createElement("canvas");
        newCanvas.classList.add("canvas"+(canvases.length + 1).toString());

        
        newCanvas.width = WidthInp.value;
        newCanvas.height = HeightInp.value;
        newCanvas.style.backgroundColor = BgColorPicker.value;
        document.body.appendChild(newCanvas);
        canvas = document.querySelector(".canvas"+(canvases.length + 1).toString());
        ctx = canvas.getContext("2d");
        canvas.addEventListener("mousedown", ()=>{currEditing = true; ctx.beginPath();})
        window.addEventListener("mouseup", ()=>{currEditing = false; ctx.endPath})
        canvas.addEventListener("mousemove", (e) => {if(mode == "painting"){draw(e)}else if(mode == "erasing"){erase(e)}});
        
        bgImg = new Image();
        bgImg.src = localStorage.getItem("selected-file");
        bgImg.onload = () => {
            canvas.width = bgImg.width;
            canvas.height = bgImg.height;
            ctx.drawImage(bgImg,0,0);
            FileInput.value ="";


        }
    }

   

})

saveBtn.addEventListener("click", ()=>{
    downloader.setAttribute('download', 'canvas.png');
    downloader.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    downloader.click();

})

canvasSelector.addEventListener("change",()=>{
    canvases = document.querySelectorAll("canvas");

    canvases.forEach((elem)=>{
        elem.style.display = "none";
    })

    canvas = document.querySelector("." + canvasSelector.value);
    canvas.style.display = "block";
    ctx = canvas.getContext("2d");
        canvas.addEventListener("mousedown", ()=>{currEditing = true; ctx.beginPath();})
        window.addEventListener("mouseup", ()=>{currEditing = false; ctx.endPath})
        canvas.addEventListener("mousemove", (e) => {if(mode == "painting"){draw(e)}else if(mode == "erasing"){erase(e)}});
})