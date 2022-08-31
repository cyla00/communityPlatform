<script>

export default{
  name: 'HomeServices',
  components: {

  },
}
</script>

<template>
  <div id="home-services-wrapper">

    <div id="text-wrapper">
      <h2>Ready to have a whole new gaming experience?</h2>
      <p>That's what we are offering</p>
    </div>
    
    <div id="cards-wrapper">

        <div class="card">
          <img src="../../public/servers.png" alt="">
          <h1>Servers</h1>
          <p>
            Highly monitored servers <br> 
            to record and stream without worrying <br>
            about possible controversy.
          </p>
        </div>

        <div class="card">
          <img src="../../public/controller.png" alt="">
          <h1>Games</h1>
          <p>
            A very large variety of Games <br>
            mostly PC and cross platform <br>
            from the most popular to the least ones
          </p>
        </div>

        <div class="card">
          <img src="../../public/community.png" alt="">
          <h1>Community</h1>
          <p>
            A community like no other <br>
            as a member you can chat &amp; connect <br>
            with gamers and content creators <br>
            in real time.
          </p>
        </div>

        <div class="card">
          <img src="../../public/advertise.png" alt="">
          <h1>Advertising</h1>
          <p>
            Do you have a project in mind? <br>
            we can help you out sharing &amp; grow <br>
            your channels and projects.
          </p>
        </div>

        <div class="card">
          <img src="../../public/events.png" alt="">
          <h1>Events</h1>
          <p>
            Here is where you can take part <br>
            in unique events organised for you <br>
            and your friends.
          </p>
        </div>

        <div class="card">
          <img src="../../public/like.png" alt="">
          <h1>Have a good experience</h1>
          <p>
            Let's not forget why we are here<br>
            and that's to have the best gaming experience<br>
            with a bounch of people we enjoy to play with.
          </p>
        </div>
    </div>

      <div id="games-wrapper">
          <div class="game" id="minecraft">
            <div class="game-logo-wrapper">
              <img class="game-logo" src="../../public/minecraft-ico.png" alt="">
            </div>
          </div>

          <div class="game" id="valorant">
            <div class="game-logo-wrapper">
              <img class="game-logo" src="../../public/valorant-ico.png" alt="">
            </div>
          </div>

          <div class="game" id="apex">
            <div class="game-logo-wrapper">
              <img class="game-logo" src="../../public/apex-ico.png" alt="">
            </div>
          </div>

          <div class="game" id="cod">
            <div class="game-logo-wrapper">
              <img class="game-logo" src="../../public/cod-ico.png" alt="">
            </div>
          </div>

          <div class="game" id="gta">
            <div class="game-logo-wrapper">
              <img class="game-logo" src="../../public/gta-ico.png" alt="">
            </div>
          </div>

          <div class="game" id="lol">
            <div class="game-logo-wrapper">
              <img class="game-logo" src="../../public/lol-ico.png" alt="">
            </div>
          </div>
      </div>
      <h3 id="more-games">And many more!</h3>
  </div>
    
</template>

<style scoped>
#home-services-wrapper{
  margin: 5em 0;
}

#text-wrapper{
  font-size: 1.5em;
}
#text-wrapper p{
  font-weight: bold;
}

#cards-wrapper{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0 2em;
}

.card{
  background-color: #101010;
  margin: 1em;
  padding: 1em;
  border: solid 0.5px grey;
}
.card:hover{
  background: linear-gradient(to bottom left, #4D2E86, #0B4ECC);
}
.card h1{
  font-size: 20px;
}
.card p{
  font-size: 15px;
}

img{
  width: 6em;
  margin: 2em 0;
}

#games-wrapper{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  margin-top: 8%;
}

#minecraft{
  background-image: url('../../public/minecraft-bg.jpg');
  background-size: cover;
}
#valorant{
  background-image: url('../../public/valorant-bg.jpg');
  background-size: cover;
}
#apex{
  background-image: url('../../public/apex-bg.jpg');
  background-size: cover;
}
#cod{
  background-image: url('../../public/cod-bg.jpg');
  background-size: cover;
}
#gta{
  background-image: url('../../public/gta-bg.jpg');
  background-size: cover;
}
#lol{
  background-image: url('../../public/lol-bg.jpg');
  background-size: cover;
}
.game{
  height: 15em;
}
.game-logo-wrapper{
  height: 100%;
  width: 100%;
  background-color: rgba(153, 153, 153, 0.6);
  display: flex;
  justify-content: center;
}

.game-logo-wrapper:hover{
  transition: 0.3s;
  background: none;
}

.game-logo{
  width: 80px;
  margin: auto;
}
#more-games{
  background: linear-gradient(to bottom left, #ff00ff, #0B4ECC);
  margin: 0;
  padding: 0.5em;
  color: #ffffff;
  text-decoration: underline;
  text-transform: uppercase;
}

@media only screen and (max-width: 1280px){
  
}

@media only screen and (max-width: 960px){
  img{
    width: 5em;
    margin: 1em 0;
  }
  #cards-wrapper{
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 1em;
  }
  #text-wrapper{
  font-size: 1.2em;
}
}

@media only screen and (max-width: 650px){
  #cards-wrapper{
    display: grid;
    grid-template-columns: 1fr;
    padding: 0 1em;
  }

  #games-wrapper{
    display: none;
  }
  #more-games{
    display: none;
  }
}
</style>