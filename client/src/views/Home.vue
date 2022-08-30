<script>
import Footer from '@/components/Footer.vue'
import HomeServices from '@/components/HomeServices.vue'

export default{
  name: 'Home',
  components: {
    Footer,
    HomeServices,
  },
  data(){
    return{
      scrollPosition: null,
    }
  },
  methods: {
    updateScroll() {
       this.scrollPosition = window.scrollY
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  }
}
</script>

<template>
    <div>
      <header :class="{change_color: scrollPosition > 50}">
        <div id="logo-wrapper">
          <a href="/"><img src="https://i.ibb.co/L5qBmym/avatar-removebg-preview.png" alt=""></a>
        </div>
        <nav>
            <ul>
                <li class="link-icon-social"><a target="_blank" class="social-links" href="#"><i class='bx bxl-discord bx-sm'></i></a></li>
                <li class="link-icon-social"><a target="_blank" class="social-links" href="#"><i class='bx bxl-telegram bx-sm'></i></a></li>
                <li class="link-icon-social"><a target="_blank" class="social-links" href="#"><i class='bx bxl-youtube bx-sm'></i></a></li>
                <li class="link-icon-social"><a target="_blank" class="social-links" href="#"><i class='bx bxl-tiktok bx-sm'></i></a></li>
                <li class="link-icon-social"><a target="_blank" class="social-links" href="#"><i class='bx bxl-instagram-alt bx-sm'></i></a></li>
                <li class="link-icon-social"><a target="_blank" class="social-links" href="#"><i class='bx bxl-twitter bx-sm'></i></a></li>
                <li><a class="user-links" href="/login">Login</a></li>
                <li><a class="user-links" href="/registration">Join us!</a></li>
            </ul>
        </nav>
      </header>

        <div class="content-wrapper" id="content-1">
            <div id="page-1-text"> 
              <h1>The number one platform <br> for Gamers &amp; content Creators.</h1>
              <p>This is the platform that help gamers and content creators to find a community,<br>
                 gaming servers and services that gives them the opportunity to create<br>
                 a unique gaming experience to share with the world.
              </p>
              <div id="discover-link-wrapper">
                <a id="discover-link" href="/registration">Discover us</a>
              </div>
            </div>
            <div></div>
        </div>

        <HomeServices/>

        <div class="content-wrapper" id="content-3">
            
        </div>

        <div class="content-wrapper" id="content-4">
            
        </div>


        <Footer/>
    </div>
</template>

<style scoped>

header{
  position: fixed;
  display: flex;
  padding: 0.5em 10em;
  right: 0;
  left: 0;
  top: 0;
  background: none;
}

.change_color{
  transition: 0.4s ease;
  background: #0E0E0E;
}

img{
  width: 200px;
}

nav{
  width: 100%;
  display: flex;
  justify-content: end;
}
ul{
  display: flex;
  list-style: none;
  margin-top: auto;
  margin-bottom: auto;
}
.user-links{
  display: flex;
  width: 6em;
  margin-left: 2em;
  justify-content: center;
  padding: 0.7em;
  border: solid 1px #ffffff;
  border-radius: 20px;
  text-decoration: none;
  color: #ffffff;
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
  background: linear-gradient(to bottom left, #4D2E86, #0B4ECC);
}

.user-links:hover{
  background: linear-gradient(to bottom left, #C9AE66, #FBF3A1);
  color: #000000;
  transition: 0.1s;
  box-shadow: 0px 0px 10px 0px #F1DFF1;
}

.social-links{
  color: #ffffff;
  margin-left: 1em;
  justify-content: center;
  text-decoration: none;
}
.social-links:hover{
  color: #ff00ff;
}

.link-icon-social{
  margin: auto;
}

.content-wrapper{
  height: 100vh;
}

#content-1{
  background-image: url('../../public/bg1.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  -webkit-box-shadow: 0 0 90px 100px #060304 inset;
  -moz-box-shadow: 0 0 90px 100px #060304 inset;
  box-shadow: 0 0 90px 100px #060304 inset;
  display: grid;
  grid-template-columns: 1fr 30%;
}
#page-1-text{
  margin: auto;
  text-align: start;
  font-size: 20px;
}
#page-1-text p{
  font-weight: bold;
}
#discover-link{
  justify-content: center;
  padding: 0.7em;
  border: solid 1px #ffffff;
  border-radius: 20px;
  text-decoration: none;
  color: #000000;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  background: linear-gradient(to bottom left, #C9AE66, #FBF3A1);
}
#discover-link:hover{
  background: linear-gradient(to bottom left, #4D2E86, #0B4ECC);
  transition: 0.1s;
  box-shadow: 0px 0px 10px 0px #F1DFF1;
  color: #ffffff;
}

#content-3{
  background-image: url('../../public/bg8.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  -webkit-box-shadow: 0 0 90px 100px #060304 inset;
  -moz-box-shadow: 0 0 90px 100px #060304 inset;
  box-shadow: 0 0 90px 100px #060304 inset;
}


@media only screen and (max-width: 1280px){
  #page-1-text{
    margin: auto;
    text-align: start;
    font-size: 15px;
  }
}

@media only screen and (max-width: 960px){

  header ul{
    display: none;
  }

#content-1{
    background-image: url('../../public/bg1-res.jpg');
    background-size: cover;
    display: flex;
    justify-content: center;
  }

  #page-1-text{
    margin: auto;
    height: 20em;
    padding: 0 !important;
    text-align: center;
    padding: 2em !important;
    font-size: 13px;
  }

  #discover-link-wrapper{
    margin-top: 5em;
  }

  #discover-link{
    font-size: 30px;
    padding: 0.3em;
  }
}

</style>