var intervalID;
var closeBtn = document.querySelector('#closeAd');
var adBox = document.querySelector('.ad');


window.addEventListener('load', () => {
    intervalID = setInterval(async () => {
        
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://source.unsplash.com/random/500x500', true);
        xhr.onload = function() {
            if(this.status == 200){
                let response = xhr.responseURL;
                adBox.innerHTML = `<img src=${response} />`;
                closeBtn.style.display="inline-block";
                adBox.style.boxShadow="0 0 1rem 0 rgb(107, 104, 104)";
            }
        }
        xhr.send();
    }, 5000);
    
})



closeBtn.addEventListener('click', () => {
    clearInterval(intervalID);
    document.querySelector('.ad-block').style.display='none';
});