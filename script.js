const chosenPicture = document.querySelector("#select-picture");
const canvas = document.querySelector("#meme");
const textTop = document.querySelector("#text-top");
const textBottom = document.querySelector("#text-bottom");
const generateButton = document.querySelector("#generate-button");
const downloadButton = document.querySelector("#download-button");

let picture;

generateButton.style.display = "none";
downloadButton.style.display = "none";

function updateMeme(canvas, picture, textTop, textBottom)
{
    const ctx = canvas.getContext("2d");

    const width = picture.width;
    const height = picture.height;

    const fontSize  = Math.floor(width / 20)
    const offsetY = fontSize + 20;

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(picture, 0, 0);
    ctx.strokeStyle = "black";
    ctx.lineWidth = Math.floor(fontSize / 4);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.lineJoin = "round";
    ctx.font = `${fontSize}px Lato`;

    ctx.textBaseline = "top";
    ctx.strokeText(textTop, width / 2, offsetY);
    ctx.fillText(textTop, width / 2, offsetY);

    ctx.strokeText(textBottom, width / 2, height - offsetY);
    ctx.fillText(textBottom, width / 2, height - offsetY);
}

chosenPicture.addEventListener("change", function(e)
{
    const pictureURL = URL.createObjectURL(e.target.files[0])
    picture = new Image();
    picture.src = pictureURL;
    picture.addEventListener("load", function()
    {
        generateButton.style.display = "block";
        downloadButton.style.display = "none";
    });
});

generateButton.addEventListener("click", function()
{
    if (picture) {
        updateMeme(canvas, picture, textTop.value, textBottom.value);
        downloadButton.style.display = "block";
    }
});

downloadButton.addEventListener("click", function()
{
    const dataURL = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = "meme.png";
    a.click();
})