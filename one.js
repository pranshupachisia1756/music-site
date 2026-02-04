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
  { src: "songs/Pehle Bhi Main.mp3", title: "Pehle Bhi Main", artist: "Vishal Mishra", artistId: "vishal" }

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

