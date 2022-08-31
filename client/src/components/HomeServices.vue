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
}
</style>