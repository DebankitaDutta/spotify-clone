console.log('welcome to spotify');
let songIndex=0;
// let songDivIndex=0;

const audioElement=new Audio('songs/mereNishan.mp3');

const masterPlay=document.getElementById('masterPlay');
const gif=document.getElementById('gif');
const progressBar=document.getElementById('myProgressBar');
const  songItems=Array.from(document.getElementsByClassName('songItem'));
const songItemPlay=Array.from(document.getElementsByClassName('songItemPlay'));
const bottomTitle=document.getElementById('bottomTitle');

let songs=[
    {songName:'Mere Nishan',filePath:'songs/mereNishan.mp3',coverPath:'cover/mereNishan.jpeg'},
    {songName:'Asal Mein',filePath:'songs/asalMein.mp3',coverPath:'cover/asalMein.jpeg'},
    {songName:'Bhula Dunga',filePath:'songs/bhulaDunga.mp3',coverPath:'cover/bhulaDunga.jpeg'},
    {songName:'Chogada',filePath:'songs/chogada.mp3',coverPath:'cover/chogada.jpeg'},
    {songName:'Hawa Banke',filePath:'songs/hawaBanke.mp3',coverPath:'cover/hawaBanke.jpeg'},
    {songName:'Judaiyaan',filePath:'songs/judaiyaan.mp3',coverPath:'cover/judaiyaan.jpeg'},
    {songName:'Kabhi Tumhe',filePath:'songs/kabhiTumhe.mp3',coverPath:'cover/kabhiTumhe.jpg'},
    {songName:'Ek Tarfa',filePath:'songs/ekTarfa.mp3',coverPath:'cover/ekTarfa.jpeg'},
    {songName:'Teri Meri Dosti',filePath:'songs/teriMeriDosti.mp3',coverPath:'cover/teriMeriDosti.jpeg'},
    {songName:'Tu Mileya',filePath:'songs/tuMileya.mp3',coverPath:'cover/tuMileya.jpeg'}
]

// iterating through all the songs
songItems.forEach((item,i)=>{
    item.getElementsByTagName('img')[0].src=songs[i].coverPath;
    item.getElementsByTagName('span')[0].innerText=songs[i].songName;
})

//changing the action after clicking on the play/pause btn

function makeAllPlay(){
    songItemPlay.forEach(element=>{
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    })
}

songItemPlay.forEach((element,i)=>{


//iterating through the click events of each songs
    element.addEventListener('click',(e)=>{
        //if the clicked song is alraedy playing & we wanna pause it
        if(e.target.classList.contains('fa-circle-pause')){
            e.target.classList.add('fa-circle-play');
            e.target.classList.remove('fa-circle-pause');
            audioElement.pause();
            gif.style.opacity=0;
            masterPlay.classList.add('fa-circle-play')
            masterPlay.classList.remove('fa-circle-pause')
        }
        // if we wanna play another song while playing a one
        else{
            makeAllPlay();
            songIndex=parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src=`${songs[songIndex].filePath}`
            audioElement.currentTime=0;
            audioElement.play();
            bottomTitle.innerText=`${songs[songIndex].songName}`;
            gif.style.opacity=1;
            masterPlay.classList.remove('fa-circle-play')
            masterPlay.classList.add('fa-circle-pause')
            
        }
        audioElement.addEventListener('timeupdate',()=>{

        // if we wanna forward or backward the current playing song through the progree bar
            progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
            progressBar.value=progress;
            progressBar.addEventListener('change',()=>{
                audioElement.currentTime=( progressBar.value * audioElement.duration)/100;
            })
        })
       
    })
})

masterPlay.addEventListener('click',()=>{
    
    if(audioElement.paused){
        audioElement.currentTime=currentTime;
        audioElement.play();
        const songDiv=document.getElementById(songIndex)
    
        songDiv.classList.add('fa-circle-pause');
        songDiv.classList.remove('fa-circle-play');
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        

    }
    else{
        audioElement.pause();
        gif.style.opacity=0;

        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        currentTime=audioElement.currentTime;
        const songDiv=document.getElementById(songIndex)
        songDiv.classList.add('fa-circle-play');
        songDiv.classList.remove('fa-circle-pause');
    }
})

const previous=document.getElementById('previous');
const next=document.getElementById('next');

next.addEventListener('click',()=>{
    if(songIndex<9){
        songIndex+=1;
    }
    audioElement.src=`${songs[songIndex].filePath}`
    audioElement.currentTime=0;
    audioElement.play();
    const songDiv=document.getElementById(songIndex);
    const songDivEarlier=document.getElementById(songIndex-1);

    songDiv.classList.add('fa-circle-pause');
    songDiv.classList.remove('fa-circle-play');

    songDivEarlier.classList.add('fa-circle-play');
    songDivEarlier.classList.remove('fa-circle-pause');

    gif.style.opacity=1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    bottomTitle.innerText=`${songs[songIndex].songName}`;
})
previous.addEventListener('click',()=>{
    if(songIndex>0){
        songIndex-=1;
    }
    audioElement.src=`${songs[songIndex].filePath}`
    audioElement.currentTime=0;
    audioElement.play();

    const songDiv=document.getElementById(songIndex);
    const songDivEarlier=document.getElementById(songIndex+1);
    
    songDiv.classList.add('fa-circle-pause');
    songDiv.classList.remove('fa-circle-play');

    songDivEarlier.classList.add('fa-circle-play');
    songDivEarlier.classList.remove('fa-circle-pause');

    gif.style.opacity=1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    bottomTitle.innerText=`${songs[songIndex].songName}`;
})