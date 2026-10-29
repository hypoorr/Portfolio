import { Application } from '@splinetool/runtime';

const canvas = document.getElementById('canvas3d');
// htmlContentMode 'inline' runs the scene's HTML content (if any) directly in
// this page — zero-latency window.spline. Use the default 'sandbox' instead
// if this page embeds scenes you didn't author.
const app = new Application(canvas, { htmlContentMode: 'inline' });
app.load('https://prod.spline.design/uIlITVqAXs50bun3/scene.splinecode');

const gameWindow = document.getElementById('game');


function doprint() {
    console.log("hi");
}
setTimeout(() => {
    //display the game after 4.5 seconds
    gameWindow.style.display = "inline";

}, 4500);

