<script>
import Footer from '@/components/Footer.vue'
import HomeServices from '@/components/HomeServices.vue'
import Homelastsektor from '@/components/Homelastsektor.vue'
const axios = require('axios')

export default{
  name: 'Home',
  components: {
    Footer,
    HomeServices,
    Homelastsektor,
  },
  data(){
    return{
      scrollPosition: null,
      logged: false,
    }
  },
  methods: {
    updateScroll() {
       this.scrollPosition = window.scrollY
    }
  },
  async mounted() {
    window.addEventListener('scroll', this.updateScroll);

    const  token  = localStorage.getItem('token')
    if(!token) return

    const tokenData = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    await axios.post('http://localhost:3000/api/token', {}, tokenData).then((res) => {
      if(res.status == 200) return this.logged = true
    }).catch((err) => {
      return this.logged = false
    })

  }
}
</script>

<template>
    <div>
      <header :class="{change_color: scrollPosition > 50}">
        <div id="logo-wrapper-res">
          <a href="/"><img src="https://i.ibb.co/vvSbVyY/icon.png" alt=""></a>
        </div>
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
                <li><a v-if="!logged" class="user-links" href="/login">Login</a></li>
                <li><a v-if="!logged" class="user-links" href="/registration">Join us!</a></li>
                <li><a v-if="logged" class="user-links" href="/dashboard">Dashboard</a></li>
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
              <div class="discover-link-wrapper">
                <a class="discover-link" href="/registration"><i class='bx bxs-rocket bx-ms'></i>get started</a>
              </div>
            </div>
            <div></div>
        </div>

        <HomeServices/>

        <div class="content-wrapper" id="content-3">
            <div id="page-3-text"> 
              <h1>What are you waiting for?</h1>
              <p>Don't miss out on the opportunity to transform gaming<br>
                 into the best experience you can make it.<br>
              </p>
              <div class="discover-link-wrapper">
                <a class="discover-link" href="/registration"><i class='bx bxs-rocket bx-ms'></i>get started</a>
              </div>
            </div>
            
        </div>

        <Homelastsektor/>


        <Footer/>
    </div>
</template>

<style scoped>

.bxs-rocket{
  margin: auto;
}

#logo-wrapper-res{
  display: none;
}

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
#content-3{
  text-align: center;
  font-size: 20px;
  color: #060304;
  font-weight: bold;
  display: flex;
}
#page-3-text{
  width: 100%;
  padding: 4em;
  margin: auto;
  background-color: rgba(0, 153, 153, 0.5);
  -webkit-box-shadow: 0 0 20px 20px #060304;
  -moz-box-shadow: 0 0 20px 20px #060304;
  box-shadow: 0 0 20px 20px #060304;
}

#page-1-text{
  margin: auto;
  text-align: start;
  font-size: 20px;
}
#page-1-text p{
  font-weight: bold;
}
.discover-link{
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
.discover-link:hover{
  background: linear-gradient(to bottom left, #4D2E86, #0B4ECC);
  transition: 0.1s;
  box-shadow: 0px 0px 10px 0px #F1DFF1;
  color: #ffffff;
}

#content-3{
  background-image: url('../../public/bg11.png');
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

  #page-1-text{
    margin-top: 1em !important;
    font-size: 1em !important;
  }

  header{
    position: relative;
    display: block;
    padding: 0 !important;
  }
  #logo-wrapper{
    display: none;
  }
  #logo-wrapper-res{
    width: 50%;
    display: block;
    margin: auto !important;
    padding-top: 2em;
  }
  #logo-wrapper-res img{
    width: 50%;
  }

  header ul{
    display: none;
  }

#content-1{
    background-image: url('../../public/bg1-res.jpg');
    background-size: cover;
    display: flex;
    justify-content: center;
    -webkit-box-shadow: 0 0 30px 30px #060304 inset;
    -moz-box-shadow: 0 0 30px 30px #060304 inset;
    box-shadow: 0 0 30px 30px #060304 inset;
  }

  #content-3{
    background-image: url('../../public/bg11-res.png');
    background-size: cover;
    display: flex;
    justify-content: center;
    -webkit-box-shadow: 0 0 30px 30px #060304 inset;
    -moz-box-shadow: 0 0 30px 30px #060304 inset;
    box-shadow: 0 0 30px 30px #060304 inset;
  }


  #page-1-text{
    margin: auto;
    height: 20em;
    text-align: center;
    padding: 2em !important;
    font-size: 1.2em;
  }

  #page-3-text{
    margin: auto;
    text-align: center;
    padding: 1em !important;
    font-size: 1.2em;
  }

  .discover-link-wrapper{
    margin-top: 5em;
  }

  .discover-link{
    font-size: 30px;
    padding: 0.3em;
  }
}

</style>