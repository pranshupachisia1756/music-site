console.log("Spotify Clone Running");
if (!sessionStorage.getItem("loggedIn")) {
  window.location.href = "login.html";
}



const playbar = document.querySelector(".playbar");


const songs = [
  { src: "songs/AURORA - Runaway.mp3", title: "Runaway", artist: "AURORA", artistId: "aurora" },
  { src: "songs/SUBHANALLAH.mp3", title: "Subhanallah", artist: "Arijit Singh", artistId: "arijit" },
  { src: "songs/Saware.mp3", title: "Saware", artist: "Arijit Singh", artistId: "aurora" },
  { src: "songs/Rangi Saari.mp3", title: "Rangi Saari", artist: "Kavita Seth", artistId: "kavita" },
  { src: "songs/Tum Ho Toh.mp3", title: "Tum Ho Toh", artist: "Vishal Mishra", artistId: "vishal" },
  { src: "songs/WAVY.mp3", title: "WAVY", artist: "Karan Aujla", artistId: "karan" },
  { src: "songs/Fa9la.mp3", title: "Fa9la", artist: "King", artistId: "king" },
  { src: "songs/Dreamers.mp3", title: "Dreamers", artist: "BTS,Jung Kook", artistId: "bts" },
  { src: "songs/Pehle Bhi Main.mp3", title: "Pehle Bhi Main", artist: "Vishal Mishra", artistId: "vishal" },
  { src: "songs/Dooron Dooron.mp3", title: "Dooron Dooron", artist: "Paresh Pahuja", artistId: "paresh" },
  { src: "songs/Humsafar.mp3", title: "Humsafar", artist: "Sachet-Parampara", artistId: "sachet" },
  { src: "songs/Wavin Flag.mp3", title: "Wavin Flag", artist: "K'NAAN", artistId: "knaan" },
  { src: "songs/Ve Kamleya.mp3", title: "Ve Kamleya", artist: "Asees Kaur", artistId: "asees" },
  { src: "songs/Qaafirana.mp3", title: "Qaafirana", artist: "Arjit Singh", artistId: "arijit" },
  { src: "songs/Iktara.mp3", title: "Iktara", artist: "Amit Trivedi , Kavita Seth", artistId: "arijit" }



];

let index = 0;
let audio = new Audio(songs[index].src);
let playing = false;

// Elements
const ul = document.querySelector(".songlist ul");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const seekbar = document.querySelector(".seekbar");
const circle = document.querySelector(".circle");
const songtime = document.querySelector(".songtime");
const npTitle = document.querySelector(".np-title");
const npArtist = document.querySelector(".np-artist");

// Load song list
ul.innerHTML = songs.map((s, i) => `
  <li>
    <img class="invert" src="music.svg">
    <div class="info">
      <div>${s.title}</div>
      <div>${s.artist}</div>
    </div>
    <div class="playnow">
      <span>Play Now</span>
      <img class="invert play-btn" data-index="${i}" src="play.svg">
    </div>
  </li>
`).join("");

// Core functions
const playSong = () => {
  playbar.style.display = "flex";
  audio.play();
  playing = true;
  playBtn.src = "pause.svg";
};

const pauseSong = () => {
  audio.pause();
  playing = false;
  playBtn.src = "play.svg";
};

const loadSong = i => {
  audio.pause();
  audio = new Audio(songs[i].src);
  audio.ontimeupdate = updateTime;
  audio.onended = () => nextBtn.click();

  npTitle.innerText = songs[i].title;
  npArtist.innerText = songs[i].artist;

  // ✅ Update Now Playing section (header top right)
  document.getElementById("nowSong").textContent = songs[i].title;
  document.getElementById("nowArtist").textContent = songs[i].artist;

  playSong();
};


// List click
ul.onclick = e => {
  const btn = e.target.closest(".play-btn");
  if (!btn) return;
  index = +btn.dataset.index;
  loadSong(index);
  playbar.style.display = "flex";
};

// Controls
playBtn.onclick = () => playing ? pauseSong() : playSong();
nextBtn.onclick = () => { index = (index + 1) % songs.length; loadSong(index); };
prevBtn.onclick = () => { index = (index - 1 + songs.length) % songs.length; loadSong(index); };

// Time + seek
function updateTime() {
  if (!audio.duration) return;

  const percent = (audio.currentTime / audio.duration) * 100;

  circle.style.left = percent + "%";
  document.querySelector(".progress").style.width = percent + "%";

  songtime.innerText =
    `${fmt(audio.currentTime)} / ${fmt(audio.duration)}`;
}


seekbar.onclick = e => {
  audio.currentTime = (e.offsetX / seekbar.offsetWidth) * audio.duration;
};

const fmt = t => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

// Init now-playing
npTitle.innerText = songs[0].title;
npArtist.innerText = songs[0].artist;
audio.ontimeupdate = updateTime;

// // Update Now Playing info
// document.getElementById("nowSong").textContent = song.split("/")[1].replace(".mp3", "");
// document.getElementById("nowArtist").textContent = "Harry"; // or fetch artist dynamically




function loadArijit() {
  const right = document.querySelector(".spotifyPlaylists");

  // 🔥 move view to top
  document.querySelector(".right").scrollTop = 1;

  right.innerHTML = `
    <div class="artist-page">

      <div class="artist-header">
        <img src="https://c.saavncdn.com/editorial/BestofRomanceArijitSingh_20231005095622.jpg">
        <div>
          <h1>Arijit Singh</h1>
          <p>Artist • Hindi • Bollywood</p>
        </div>
      </div>

      <h2>Popular Songs</h2>

      <div class="artist-songs">
        <div class="song-row" onclick="playSpecificSong('songs/Arijit/Apna Bana Le.mp3','Apna Bana Le','Arijit Singh')">
          <span>▶</span>
          <div>
            <strong>Apna Bana Le</strong>
            <p>Arijit Singh</p>
          </div>
        </div>

        <div class="song-row" onclick="playSpecificSong('songs/Arijit/Raabta.mp3','Raabta','Arijit Singh')">
          <span>▶</span>
          <div>
            <strong>Raabta</strong>
            <p>Arijit Singh</p>
          </div>
        </div>
        <div class="song-row" onclick="playSpecificSong('songs/Arijit/Dekha Hazaro Dafaa.mp3','Dekha Hazaro Dafaa','Arijit Singh')">
          <span>▶</span>
          <div>
            <strong>Dekha Hazaro Dafaa</strong>
            <p>Arijit Singh</p>
          </div>
        </div>

        <div class="song-row" onclick="playSpecificSong('songs/Arijit/Kalank.mp3','Kalank','Arijit Singh')">
          <span>▶</span>
          <div>
            <strong>Kalank</strong>
            <p>Arijit Singh</p>
          </div>
        </div>

        <div class="song-row" onclick="playSpecificSong('songs/Arijit/Bandeya Rey Bandeya.mp3','Bandeya Rey Bandeya','Arijit Singh')">
          <span>▶</span>
          <div>
            <strong>Bandeya Rey Bandeya</strong>
            <p>Arijit Singh</p>
          </div>
        </div>
      </div>

    </div>
  `;
}

function loadKaran() {
  const right = document.querySelector(".spotifyPlaylists");

  // 🔥 move view to top
  document.querySelector(".right").scrollTop = 0;

  right.innerHTML = `
    <div class="artist-page">

      <div class="artist-header">
        <img src="http://media.insider.in/image/upload/c_crop,g_custom/v1756999925/m6gmdpmfdnpsrri6synm.png">
        <div>
          <h1>Karan Aujla</h1>
          <p>Artist • Punjabi • Pop</p>
        </div>
      </div>

      <h2>Popular Songs</h2>

      <div class="artist-songs">
        <div class="song-row" onclick="playSpecificSong('songs/Karan/WAVY.mp3','WAVY','Karan Aujla')">
          <span>▶</span>
          <div>
            <strong>WAVY</strong>
            <p>Karan Aujla</p>
          </div>
        </div>

        <div class="song-row" onclick="playSpecificSong('songs/Karan/For A Reason.mp3','For A Reason','Karan Aujla')">
          <span>▶</span>
          <div>
            <strong>For A Reason</strong>
            <p>Karan Aujla</p>
          </div>
        </div>

         <div class="song-row" onclick="playSpecificSong('songs/Karan/Winning Speech.mp3','Winning Speech','Karan Aujla')">
          <span>▶</span>
          <div>
            <strong>Winning Speech</strong>
            <p>Karan Aujla</p>
          </div>
        </div>

        <div class="song-row" onclick="playSpecificSong('songs/Karan/SOFTLY.mp3','SOFTLY','Karan Aujla')">
          <span>▶</span>
          <div>
            <strong>SOFTLY</strong>
            <p>Karan Aujla</p>
          </div>
        </div>

        <div class="song-row" onclick="playSpecificSong('songs/Karan/BOYFRIEND.mp3','BOYFRIEND','Karan Aujla')">
          <span>▶</span>
          <div>
            <strong>BOYFRIEND</strong>
            <p>Karan Aujla</p>
          </div>
        </div>
      </div>

    </div>
  `;
}

function loadShreya() {
  const right = document.querySelector(".spotifyPlaylists");

  // 🔥 move view to top
  document.querySelector(".right").scrollTop = 0;

  right.innerHTML = `
    <div class="artist-page">

      <div class="artist-header">
        <img src="https://yt3.googleusercontent.com/2aZ7wtIT6bYtZFotxM6cmcuZ9S6BRWDkFdiQvm1TW22NKvhJpwSbUlogfvBpZjzCi1WL2l8HBQ=s900-c-k-c0x00ffffff-no-rj">
        <div>
          <h1>Shreya Ghoshal</h1>
          <p>Artist • Hindi • Bollywood</p>
        </div>
      </div>

      <h2>Popular Songs</h2>

      <div class="artist-songs">
        <div class="song-row" onclick="playSpecificSong('songs/Shreya/O Rangrez.mp3','O Rangrez','Shreya Ghoshal')">
          <span>▶</span>
          <div>
            <strong>O Rangrez</strong>
            <p>Shreya Ghoshal</p>
          </div>
        </div>

        <div class="song-row" onclick="playSpecificSong('songs/Shreya/Ve Kamleya.mp3','Ve Kamleya','Shreya Ghoshal')">
          <span>▶</span>
          <div>
            <strong>Ve Kamleya</strong>
            <p>Shreya Ghoshal</p>
          </div>
        </div>

        <div class="song-row" onclick="playSpecificSong('songs/Shreya/Saibo.mp3','Saibo','Shreya Ghoshal')">
          <span>▶</span>
          <div>
            <strong>Saibo</strong>
            <p>Shreya Ghoshal</p>
          </div>
        </div>

        <div class="song-row" onclick="playSpecificSong('songs/Shreya/Samjhawan.mp3','Samjhawan','Shreya Ghoshal')">
          <span>▶</span>
          <div>
            <strong>Samjhawan</strong>
            <p>Shreya Ghoshal</p>
          </div>
        </div>

        <div class="song-row" onclick="playSpecificSong('songs/Shreya/Teri Ore.mp3','Teri Ore','Shreya Ghoshal')">
          <span>▶</span>
          <div>
            <strong>Teri Ore</strong>
            <p>Shreya Ghoshal</p>
          </div>
        </div>


        
      </div>

    </div>
  `;
}

function loadVishal() {
  const right = document.querySelector(".spotifyPlaylists");

  // 🔥 move view to top
  document.querySelector(".right").scrollTop = 0;

  right.innerHTML = `
    <div class="artist-page">

      <div class="artist-header">
        <img src="https://artistbookingcompany.com/wp-content/uploads/2024/04/435127004_18422550823043475_3090646912270320640_n-680x680.jpg">
        <div>
          <h1>Vishal Mishra</h1>
          <p>Artist • Hindi • Bollywood</p>
        </div>
      </div>

      <h2>Popular Songs</h2>

      <div class="artist-songs">
        <div class="song-row" onclick="playSpecificSong('songs/Vishal/Pehle Bhi Main.mp3','Pehle Bhi Main','Vishal Mishra')">
          <span>▶</span>
          <div>
            <strong>Pehle Bhi Main</strong>
            <p>Vishal Mishra</p>
          </div>
        </div>

        <div class="song-row" onclick="playSpecificSong('songs/Vishal/Kaise Hua.mp3','Kaise Hua','Vishal Mishra')">
          <span>▶</span>
          <div>
            <strong>Kaise Hua</strong>
            <p>Vishal Mishra</p>
          </div>
        </div>

        <div class="song-row" onclick="playSpecificSong('songs/Vishal/Khoobsurat.mp3','Khoobsurat','Vishal Mishra')">
          <span>▶</span>
          <div>
            <strong>Khoobsurat</strong>
            <p>Vishal Mishra</p>
          </div>
        </div>

        <div class="song-row" onclick="playSpecificSong('songs/Vishal/Tum Ho Toh.mp3','Tum Ho Toh','Vishal Mishra')">
          <span>▶</span>
          <div>
            <strong>Tum Ho Toh</strong>
            <p>Vishal Mishra</p>
          </div>
        </div>

        <div class="song-row" onclick="playSpecificSong('songs/Vishal/Pehla Pyaar.mp3','Pehla Pyaar','Vishal Mishra')">
          <span>▶</span>
          <div>
            <strong>Pehla Pyaar</strong>
            <p>Vishal Mishra</p>
          </div>
        </div>

        
        
      </div>

    </div>
  `;
}

function loadPritam() {
  const right = document.querySelector(".spotifyPlaylists");

  // 🔥 move view to top
  document.querySelector(".right").scrollTop = 0;

  right.innerHTML = `
    <div class="artist-page">

      <div class="artist-header">
        <img src="https://lh3.googleusercontent.com/sjGMYJQ1J3FZEIBsMYUztMjjYOM4-NJ24CjmIHqxTWCxAM1YgjL-d_17u7_PRhTouOwwAjbu-2x5S6I=w544-h544-p-l90-rj">
        <div>
          <h1>Pritam</h1>
          <p>Artist • Hindi • Bollywood</p>
        </div>
      </div>

      <h2>Popular Songs</h2>

      <div class="artist-songs">
        <div class="song-row" onclick="playSpecificSong('songs/Pritam/Tum Se Hi.mp3','Tum Se Hi','Pritam')">
          <span>▶</span>
          <div>
            <strong>Tum Se Hi</strong>
            <p>Pritam</p>
          </div>
        </div>

        <div class="song-row" onclick="playSpecificSong('songs/Pritam/Tera Hone Laga Hoon.mp3','Tera Hone Laga Hoon','Pritam')">
          <span>▶</span>
          <div>
            <strong>Tera Hone Laga Hoon</strong>
            <p>Pritam</p>
          </div>
        </div>
         

         <div class="song-row" onclick="playSpecificSong('songs/Pritam/Kabira.mp3','Kabira','Pritam')">
          <span>▶</span>
          <div>
            <strong>Kabira</strong>
            <p>Pritam</p>
          </div>
        </div>

        <div class="song-row" onclick="playSpecificSong('songs/Pritam/Itni Si Baat Hain.mp3','Itni Si Baat Hain','Pritam')">
          <span>▶</span>
          <div>
            <strong>Itni Si Baat Hain</strong>
            <p>Pritam</p>
          </div>
        </div>

        <div class="song-row" onclick="playSpecificSong('songs/Pritam/Shayad.mp3','Shayad','Pritam')">
          <span>▶</span>
          <div>
            <strong>Shayad</strong>
            <p>Pritam</p>
          </div>
        </div>



      </div>   
         

    </div>
  `;
}

function loadAtif() {
  const right = document.querySelector(".spotifyPlaylists");

  // 🔥 move view to top
  document.querySelector(".right").scrollTop = 0;

  right.innerHTML = `
    <div class="artist-page">

      <div class="artist-header">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbtm-8Y2rIdUkXHq0CScWTe5woupTVdRlD9w&s">
        <div>
          <h1>Atif Aslam</h1>
          <p>Artist • Hindi • Bollywood</p>
        </div>
      </div>

      <h2>Popular Songs</h2>

      <div class="artist-songs">
        <div class="song-row" onclick="playSpecificSong('songs/Atif/O Saathi.mp3','O Saathi','Atif Aslam')">
          <span>▶</span>
          <div>
            <strong>O Saathi</strong>
            <p>Atif Aslam</p>
          </div>
        </div>

        <div class="song-row" onclick="playSpecificSong('songs/Atif/Tu Jaane Na.mp3','Tu Jaane Na','Atif Aslam')">
          <span>▶</span>
          <div>
            <strong>Tu Jaane Na</strong>
            <p>Atif Aslam</p>
          </div>
        </div>

        <div class="song-row" onclick="playSpecificSong('songs/Atif/Main Rang Sharbaton Ka.mp3','Main Rang Sharbaton Ka','Atif Aslam')">
          <span>▶</span>
          <div>
            <strong>Main Rang Sharbaton Ka</strong>
            <p>Atif Aslam</p>
          </div>
        </div>

        <div class="song-row" onclick="playSpecificSong('songs/Atif/Jeena Jeena.mp3','Jeena Jeena','Atif Aslam')">
          <span>▶</span>
          <div>
            <strong>Jeena Jeena</strong>
            <p>Atif Aslam</p>
          </div>
        </div>

        <div class="song-row" onclick="playSpecificSong('songs/Atif/Pehli Nazar Mein.mp3','Pehli Nazar Mein','Atif Aslam')">
          <span>▶</span>
          <div>
            <strong>Pehli Nazar Mein</strong>
            <p>Atif Aslam</p>
          </div>
        </div>



 </div>

    </div>
  `;
}

function loadEd() {
  const right = document.querySelector(".spotifyPlaylists");

  // 🔥 move view to top
  document.querySelector(".right").scrollTop = 0;

  right.innerHTML = `
    <div class="artist-page">

      <div class="artist-header">
        <img src="https://static01.nyt.com/images/2021/10/29/arts/29sheeran-review/29sheeran-review-mediumSquareAt3X.jpg">
        <div>
          <h1>Ed Sheeran</h1>
          <p>Artist • English • Hollywood</p>
        </div>
      </div>

      <h2>Popular Songs</h2>

      <div class="artist-songs">
        <div class="song-row" onclick="playSpecificSong('songs/Ed/Shape of You.mp3','Shape of You','Ed Sheeran')">
          <span>▶</span>
          <div>
            <strong>Shape of You</strong>
            <p>Ed Sheeran</p>
          </div>
        </div>

      <div class="song-row" onclick="playSpecificSong('songs/Ed/Perfect.mp3','Perfect','Ed Sheeran')">
          <span>▶</span>
          <div>
            <strong>Perfect</strong>
            <p>Ed Sheeran</p>
          </div>
        </div>


      <div class="song-row" onclick="playSpecificSong('songs/Ed/Sapphire.mp3','Sapphire','Ed Sheeran')">
          <span>▶</span>
          <div>
            <strong>Sapphire</strong>
            <p>Ed Sheeran</p>
          </div>
        </div>

        <div class="song-row" onclick="playSpecificSong('songs/Ed/Photograph.mp3','Photograph','Ed Sheeran')">
          <span>▶</span>
          <div>
            <strong>Photograph</strong>
            <p>Ed Sheeran</p>
          </div>
        </div>

        <div class="song-row" onclick="playSpecificSong('songs/Ed/Thinking Out Loud.mp3','Thinking Out Loud','Ed Sheeran')">
          <span>▶</span>
          <div>
            <strong>Thinking Out Loud</strong>
            <p>Ed Sheeran</p>
          </div>
        </div>
          
          




        </div>

    </div>
  `;
}


function loadAnuv() {
  const right = document.querySelector(".spotifyPlaylists");

  // 🔥 move view to top
  document.querySelector(".right").scrollTop = 0;

  right.innerHTML = `
    <div class="artist-page">

      <div class="artist-header">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMOjDGbZ4j7pICSq0_8Ve-gRmi515zKp-1eA&s">
        <div>
          <h1>Anuv Jain</h1>
          <p>Artist • Hindi • Albums</p>
        </div>
      </div>

      <h2>Popular Songs</h2>

      <div class="artist-songs">
        <div class="song-row" onclick="playSpecificSong('songs/Anuv/HUSN.mp3','HUSN','Anuv Jain')">
          <span>▶</span>
          <div>
            <strong>HUSN</strong>
            <p>Anuv Jain</p>
          </div>
        </div>

        <div class="song-row" onclick="playSpecificSong('songs/Anuv/GUL.mp3','GUL','Anuv Jain')">
          <span>▶</span>
          <div>
            <strong>GUL</strong>
            <p>Anuv Jain</p>
          </div>
        </div>

        <div class="song-row" onclick="playSpecificSong('songs/Anuv/Jo Tum Mere Ho.mp3','Jo Tum Mere Ho','Anuv Jain')">
          <span>▶</span>
          <div>
            <strong>Jo Tum Mere Ho</strong>
            <p>Anuv Jain</p>
          </div>
        </div>

        <div class="song-row" onclick="playSpecificSong('songs/Anuv/Baarishein.mp3','Baarishein','Anuv Jain')">
          <span>▶</span>
          <div>
            <strong>Baarishein</strong>
            <p>Anuv Jain</p>
          </div>
        </div>

        <div class="song-row" onclick="playSpecificSong('songs/Anuv/Alag Aasmaan.mp3','Alag Aasmaan','Anuv Jain')">
          <span>▶</span>
          <div>
            <strong>Alag Aasmaan</strong>
            <p>Anuv Jain</p>
          </div>
        </div>






        </div>

    </div>
  `;
}

function loadYJHD() {
  const right = document.querySelector(".spotifyPlaylists");

  document.querySelector(".right").scrollTop = 0;

  right.innerHTML = `
    <div class="artist-page">

      <div class="artist-header">
        <img src="https://i.scdn.co/image/ab67616d00001e02707ea5b8023ac77d31756ed4">
        <div>
          <h1>Yeh Jawani Hai Deewani</h1>
          <p>Movie • Pritam</p>
        </div>
      </div>

      <h2>Songs</h2>

      <div class="artist-songs">

        <div class="song-row"
          onclick="playSpecificSong('songs/YJHD/Ghagra.mp3','Ghagra','Rekha Bhardwaj , Vishal Dadlani')">
          <span>▶</span>
          <div>
            <strong>Ghagra</strong>
            <p>Rekha Bhardwaj , Vishal Dadlani</p>
          </div>
        </div>

        <div class="song-row"
          onclick="playSpecificSong('songs/YJHD/Balam Pichkari.mp3','Balam Pichkari','Vishal Dadlani , Shalmali Kholgade')">
          <span>▶</span>
          <div>
            <strong>Balam Pichkari</strong>
            <p>Vishal Dadlani , Shalmali Kholgade</p>
          </div>
        </div>

        <div class="song-row"
          onclick="playSpecificSong('songs/YJHD/Subhanallah.mp3','Subhanallah','Sreerama Chandra , Shilpa Rao')">
          <span>▶</span>
          <div>
            <strong>Subhanallah</strong>
            <p>Sreerama Chandra , Shilpa Rao</p>
          </div>
        </div>

        <div class="song-row"
          onclick="playSpecificSong('songs/YJHD/Ilahi.mp3','Ilahi','Arijit Singh')">
          <span>▶</span>
          <div>
            <strong>Ilahi</strong>
            <p>Arijit Singh</p>
          </div>
        </div>

         <div class="song-row"
          onclick="playSpecificSong('songs/YJHD/Kabira.mp3','Kabira','Tochi Raina , Rekha Bhardwaj')">
          <span>▶</span>
          <div>
            <strong>Kabira</strong>
            <p>Tochi Raina , Rekha Bhardwaj</p>
          </div>
        </div>

        <div class="song-row"
          onclick="playSpecificSong('songs/YJHD/Badtameez Dil.mp3','Badtameez Dil','Benny Dayal , Shefali Alvares')">
          <span>▶</span>
          <div>
            <strong>Badtameez Dil</strong>
            <p>Benny Dayal , Shefali Alvares</p>
          </div>
        </div>

          <div class="song-row"
          onclick="playSpecificSong('songs/YJHD/Dilliwali Girlfriend.mp3','Dilliwali Girlfriend','Arijit Singh , Sunidhi Chauhan')">
          <span>▶</span>
          <div>
            <strong>Dilliwali Girlfriend</strong>
            <p>Arijit Singh , Sunidhi Chauhan</p>
          </div>
        </div>




        
      </div>

    </div>
  `;
}

function loadSaiyaara() {
  const right = document.querySelector(".spotifyPlaylists");

  document.querySelector(".right").scrollTop = 0;

  right.innerHTML = `
    <div class="artist-page">

      <div class="artist-header">
        <img src="https://speks.art/images/Album2c218f16185440f0.md.png">
        <div>
          <h1>Saiyaara</h1>
          <p>Movie • Akshaye Widhani</p>
        </div>
      </div>

      <h2>Songs</h2>

      <div class="artist-songs">

        <div class="song-row"
          onclick="playSpecificSong('songs/Saiyaara/Tum Ho Toh.mp3','Tum Ho Toh','Vishal Mishra , Hansika Pareek , Raj Shekhar')">
          <span>▶</span>
          <div>
            <strong>Tum Ho Toh</strong>
            <p>Vishal Mishra , Hansika Pareek , Raj Shekhar</p>
          </div>
        </div>

        <div class="song-row"
          onclick="playSpecificSong('songs/Saiyaara/Humsafar.mp3','Humsafar','Sachet-Parampara')">
          <span>▶</span>
          <div>
            <strong>Humsafar</strong>
            <p>Sachet-Parampara</p>
          </div>
        </div>

        <div class="song-row"
          onclick="playSpecificSong('songs/Saiyaara/Saiyaara.mp3','Saiyaara','Tanishk Bagchi , Faheem Abdullah , Arsalan Nizami , Irshad Kamil')">
          <span>▶</span>
          <div>
            <strong>Saiyaara</strong>
            <p>Tanishk Bagchi , Faheem Abdullah , Arsalan Nizami , Irshad Kamil</p>
          </div>
        </div>

        <div class="song-row"
          onclick="playSpecificSong('songs/Saiyaara/Dhun.mp3','Dhun','Mithoon , Arijit Singh')">
          <span>▶</span>
          <div>
            <strong>Dhun</strong>
            <p>Mithoon , Arijit Singh</p>
          </div>
        </div>

         <div class="song-row"
          onclick="playSpecificSong('songs/Saiyaara/Barbaad.mp3','Barbaad','The Rish , Jubin Nautiyal')">
          <span>▶</span>
          <div>
            <strong>Barbaad</strong>
            <p>The Rish , Jubin Nautiyal</p>
          </div>
        </div>
        
        
        
        
        
        </div>



    </div>
  `;
}

function loadBrahmastra() {
  const right = document.querySelector(".spotifyPlaylists");

  document.querySelector(".right").scrollTop = 0;

  right.innerHTML = `
    <div class="artist-page">

      <div class="artist-header">
        <img src="https://m.media-amazon.com/images/M/MV5BOTQxMjVmNzgtNWExNy00OGQ5LWIwYTAtMmM2MjE1NGEwNjA3XkEyXkFqcGc@._V1_.jpg">
        <div>
          <h1>Brahmastra</h1>
          <p>Movie • Karan Johar </p>
        </div>
      </div>

      <h2>Songs</h2>

      <div class="artist-songs">

        <div class="song-row"
          onclick="playSpecificSong('songs/Brahmastra/Kesariya.mp3','Kesariya','Arijit Singh , Amitabh Bhattacharya')">
          <span>▶</span>
          <div>
            <strong>Kesariya</strong>
            <p>Arijit Singh , Amitabh Bhattacharya</p>
          </div>
        </div>

        <div class="song-row"
          onclick="playSpecificSong('songs/Brahmastra/Deva Deva.mp3','Deva Deva','Arijit Singh , Amitabh Bhattacharya')">
          <span>▶</span>
          <div>
            <strong>Deva Deva</strong>
            <p>Arijit Singh , Amitabh Bhattacharya</p>
          </div>
        </div>


        <div class="song-row"
          onclick="playSpecificSong('songs/Brahmastra/Dance Ka Bhoot.mp3','Dance Ka Bhoot','')">
          <span>▶</span>
          <div>
            <strong>Dance Ka Bhoot</strong>
            <p>Arijit Singh , Amitabh Bhattacharya</p>
          </div>
        </div>


        <div class="song-row"
          onclick="playSpecificSong('songs/Brahmastra/Rasiya.mp3','Rasiya','Shreya Ghoshal , Tushar Joshi')">
          <span>▶</span>
          <div>
            <strong>Rasiya</strong>
            <p>Shreya Ghoshal , Tushar Joshi</p>
          </div>
        </div>

        <div class="song-row"
          onclick="playSpecificSong('songs/Brahmastra/Shiva Theme.mp3','Shiva Theme','Sid Sriram')">
          <span>▶</span>
          <div>
            <strong>Shiva Theme</strong>
            <p>Sid Sriram</p>
          </div>
        </div>





        </div>



    </div>
  `;
}


function loadAashiqui2() {
  const right = document.querySelector(".spotifyPlaylists");

  document.querySelector(".right").scrollTop = 0;

  right.innerHTML = `
    <div class="artist-page">

      <div class="artist-header">
        <img src="https://musiccircle.co.in/cdn/shop/files/9583e4727905a1f32f833e1a7cf1dad2.jpg?v=1746943933">
        <div>
          <h1>Aashiqui 2</h1>
          <p>Movie • Bhushan Kumar and Mahesh Bhatt </p>
        </div>
      </div>

      <h2>Songs</h2>

      <div class="artist-songs">

        <div class="song-row"
          onclick="playSpecificSong('songs/Aashiqui2/Tum Hi Ho.mp3','Tum Hi Ho','Mithoon , Arijit Singh')">
          <span>▶</span>
          <div>
            <strong>Tum Hi Ho</strong>
            <p>Mithoon , Arijit Singh</p>
          </div>
        </div>


        <div class="song-row"
          onclick="playSpecificSong('songs/Aashiqui2/Sunn Raha.mp3','Sunn Raha','Ankit Tiwari')">
          <span>▶</span>
          <div>
            <strong>Sunn Raha</strong>
            <p>Ankit Tiwari</p>
          </div>
        </div>

        <div class="song-row"
          onclick="playSpecificSong('songs/Aashiqui2/Chahun Main.mp3','Chahun Main','Palak Muchhal , Arijit Singh')">
          <span>▶</span>
          <div>
            <strong>Chahun Main</strong>
            <p>Palak Muchhal , Arijit Singh</p>
          </div>
        </div>

        <div class="song-row"
          onclick="playSpecificSong('songs/Aashiqui2/Hum Mar Jayenge.mp3','Hum Mar Jayenge','Tulsi Kumar , Arijit Singh')">
          <span>▶</span>
          <div>
            <strong>Hum Mar Jayenge</strong>
            <p>Tulsi Kumar , Arijit Singh</p>
          </div>
        </div>


        <div class="song-row"
          onclick="playSpecificSong('songs/Aashiqui2/Meri Aashiqui.mp3','Meri Aashiqui','Palak Muchhal , Arijit Singh')">
          <span>▶</span>
          <div>
            <strong>Meri Aashiqui</strong>
            <p>Palak Muchhal , Arijit Singh</p>
          </div>
        </div>

        <div class="song-row"
          onclick="playSpecificSong('songs/Aashiqui2/Piya Aaye Na.mp3','Piya Aaye Na','Tulsi Kumar , KK')">
          <span>▶</span>
          <div>
            <strong>Piya Aaye Na</strong>
            <p>Tulsi Kumar , KK</p>
          </div>
        </div>


        </div>



    </div>
  `;
}

function loadAnimal() {
  const right = document.querySelector(".spotifyPlaylists");

  document.querySelector(".right").scrollTop = 0;

  right.innerHTML = `
    <div class="artist-page">

      <div class="artist-header">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpf7WlgCMp15Y5VJE4c6Fuu4o7GkUCLJSdgQ&s">
        <div>
          <h1>Animal</h1>
          <p>Movie • Bhushan Kumar  </p>
        </div>
      </div>

      <h2>Songs</h2>

      <div class="artist-songs">

        <div class="song-row"
          onclick="playSpecificSong('songs/Animal/Pehle Bhi Main.mp3','Pehle Bhi Main','Vishal Mishra , Raj Shekhar')">
          <span>▶</span>
          <div>
            <strong>Pehle Bhi Main</strong>
            <p>Vishal Mishra , Raj Shekhar</p>
          </div>
        </div>

        <div class="song-row"
          onclick="playSpecificSong('songs/Animal/Satranga.mp3','Satranga','Arijit Singh , Shreyas Puranik , Siddhart-Garima')">
          <span>▶</span>
          <div>
            <strong>Satranga</strong>
            <p>Arijit Singh , Shreyas Puranik , Siddhart-Garima</p>
          </div>
        </div>

        <div class="song-row"
          onclick="playSpecificSong('songs/Animal/Arjan Vailly.mp3','Arjan Vailly','Manan Bhardwaj , Bhupinder Babbal')">
          <span>▶</span>
          <div>
            <strong>Arjan Vailly</strong>
            <p>Manan Bhardwaj , Bhupinder Babbal</p>
          </div>
        </div>

        <div class="song-row"
          onclick="playSpecificSong('songs/Animal/Abrars Entry.mp3','Abrars Entry','Harshvardhan Rameshwar , Choir')">
          <span>▶</span>
          <div>
            <strong>Abrars Entry</strong>
            <p>Harshvardhan Rameshwar , Choir</p>
          </div>
        </div>

        <div class="song-row"
          onclick="playSpecificSong('songs/Animal/Hua Main.mp3','Hua Main','Raghav Chaitanya')">
          <span>▶</span>
          <div>
            <strong>Hua Main</strong>
            <p>Raghav Chaitanya</p>
          </div>
        </div>


        </div>



    </div>
  `;
}

function loadAjab() {
  const right = document.querySelector(".spotifyPlaylists");

  document.querySelector(".right").scrollTop = 0;

  right.innerHTML = `
    <div class="artist-page">

      <div class="artist-header">
        <img src="https://static.toiimg.com/thumb.cms?msid=4957993&height=600&width=600">
        <div>
          <h1>Ajab Prem ki gajab Kahani</h1>
          <p>Movie • Rajkumar Santoshi  </p>
        </div>
      </div>

      <h2>Songs</h2>

      <div class="artist-songs">

        <div class="song-row"
          onclick="playSpecificSong('songs/Ajab/Tera Hone Laga Hoon.mp3','Tera Hone Laga Hoon','Atif Aslam , Alisha Chinai')">
          <span>▶</span>
          <div>
            <strong>Tera Hone Laga Hoon</strong>
            <p>Atif Aslam , Alisha Chinai</p>
          </div>
        </div>

        <div class="song-row"
          onclick="playSpecificSong('songs/Ajab/Tu Jaane Na.mp3','Tu Jaane Na','Atif Aslam')">
          <span>▶</span>
          <div>
            <strong>Tu Jaane Na</strong>
            <p>Atif Aslam</p>
          </div>
        </div>


        <div class="song-row"
          onclick="playSpecificSong('songs/Ajab/Prem Ki Naiyya.mp3','Prem Ki Naiyya','Neeraj Shridhar , Suzanne D'Mello')">
          <span>▶</span>
          <div>
            <strong>Prem Ki Naiyya</strong>
            <p>Neeraj Shridhar , Suzanne D'Mello</p>
          </div>
        </div>

        

        </div>



    </div>
  `;
}

function loadRocky() {
  const right = document.querySelector(".spotifyPlaylists");

  document.querySelector(".right").scrollTop = 0;

  right.innerHTML = `
    <div class="artist-page">

      <div class="artist-header">
        <img src="https://www.tribuneindia.com/sortd-service/imaginary/v22-01/jpg/medium/high?url=dGhldHJpYnVuZS1zb3J0ZC1wcm8tcHJvZC1zb3J0ZC9tZWRpYTZhYWRhNjAwLTRlNzUtMTFlZi1hZjA3LTQzNGZmN2YyMTQ4MS5qcGc=">
        <div>
          <h1>Rocky Aur Rani Kii Prem Kahaani</h1>
          <p>Movie • Karan Johar  </p>
        </div>
      </div>

      <h2>Songs</h2>

      <div class="artist-songs">

        <div class="song-row"
          onclick="playSpecificSong('songs/Rocky/Tum Kya Mile.mp3','Tum Kya Mile','Arjit Singh , Shreya Ghoshal')">
          <span>▶</span>
          <div>
            <strong>Tum Kya Mile</strong>
            <p>Arjit Singh , Shreya Ghoshal</p>
          </div>
        </div>

        <div class="song-row"
          onclick="playSpecificSong('songs/Rocky/Ve Kamleya.mp3','Ve Kamleya','Arjit Singh , Shreya Ghoshal')">
          <span>▶</span>
          <div>
            <strong>Ve Kamleya</strong>
            <p>Arjit Singh , Shreya Ghoshal</p>
          </div>
        </div>

        <div class="song-row"
          onclick="playSpecificSong('songs/Rocky/What Jhumka.mp3','What Jhumka','Arjit Singh , Jonita Gandhi')">
          <span>▶</span>
          <div>
            <strong>What Jhumka</strong>
            <p>Arjit Singh , Jonita Gandhi</p>
          </div>
        </div>


         </div>



    </div>
  `;
}


function loadSport() {
  const right = document.querySelector(".spotifyPlaylists");

  document.querySelector(".right").scrollTop = 0;

  right.innerHTML = `
    <div class="artist-page">

      <div class="artist-header">
        <img src="https://img.freepik.com/premium-photo/love-football-wallpaper_665280-12801.jpg">
        <div>
          <h1>Sports</h1>
          <p>Movie • Everyone  </p>
        </div>
      </div>

      <h2>Songs</h2>

      <div class="artist-songs">

        <div class="song-row"
          onclick="playSpecificSong('songs/Sport/Dreamers.mp3','Dreamers','BTS , Jungkook')">
          <span>▶</span>
          <div>
            <strong>Dreamers</strong>
            <p>BTS , Jungkook</p>
          </div>
        </div>

        <div class="song-row"
          onclick="playSpecificSong('songs/Sport/Out Of This World.mp3','Out Of This World','Sean Paul , Kes')">
          <span>▶</span>
          <div>
            <strong>Out Of This World</strong>
            <p>Sean Paul , Kes</p>
          </div>
        </div>

        <div class="song-row"
          onclick="playSpecificSong('songs/Sport/Lehra Do.mp3','Lehra Do','Arijit Singh')">
          <span>▶</span>
          <div>
            <strong>Lehra Do</strong>
            <p>Arijit Singh</p>
          </div>
        </div>

         </div>



    </div>
  `;
}









function playSpecificSong(src, title, artist) {
  audio.pause();
  audio = new Audio(src);
  audio.ontimeupdate = updateTime;

  npTitle.innerText = title;
  npArtist.innerText = artist;

  document.getElementById("nowSong").textContent = title;
  document.getElementById("nowArtist").textContent = artist;

  playSong();
}


function goToRating() {
  window.location.href = "rating.html";
}


