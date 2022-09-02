<template>
    <div id="wrapper">
        <div id="text">
            <h1>404</h1>
            <p>Oops...looks like you shouldn't be here.</p>
            <p>Click <a href="/">here</a> to save yourself.</p>
        </div>
    </div>
</template>

<style scoped>
    #wrapper{
        height: 100vh;
        width: 100vw;
        background: #180B19;
        background-image: url('../../public/bg3.jpg');
        background: fill no-repeat;
        -webkit-box-shadow: 0 0 50px 50px #060304 inset;
        -moz-box-shadow: 0 0 50px 50px #060304 inset;
        box-shadow: 0 0 200px 200px #060304 inset;
        margin: 0;
        padding: 0;
    }

    #text{
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-weight: bold;
        font-family: Battle;
    }
    #text h1{
        font-size: 15em;
        margin: auto;
        background: linear-gradient(to bottom left,  #ff2a04, #880808);
        background-clip: content-box;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    #text p{
        font-size: 2em;
        margin: auto;
    }
    #text a{
        text-decoration: underline;
        color: #880808;
    }

    @font-face {
        font-family: "Battle";
        src: url('../../public/battle.ttf');
    }

    @media only screen and (max-width: 750px){

    #wrapper{
        background-image: url('../../public/bg3-res.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        -webkit-box-shadow: 0 0 200px 10px #060304 inset;
        -moz-box-shadow: 0 0 200px 10px #060304 inset;
        box-shadow: 0 0 200px 10px #060304 inset;
    }

    #text h1{
        font-size: 10em;
    }
    #text p{
        font-size: 1.2em;
    }
}
</style>