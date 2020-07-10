<template>
    <li><a href="#"><img :style="style" :src=this.svg></a></li>
</template>

<script>
    export default {
        name: "Button",
        props: ["svg", "opacity"],
        computed: {
          style() {
              if (this.opacity) {
                  return 'opacity: 1; fill:'
              }else{
                  return 'opacity: ' + 0.1
              }
          },
        },
    }
</script>

<style>
    li {
        list-style: none;
    }
    li a {
        position: relative;
        width: 35px;
        height: 35px;
        display: flex;
        text-align: center;
        align-content: center;
        align-items: center;
        justify-content: center;
        margin: 0 10px;
        border-radius: 50%;
        padding: 6px;
        box-sizing: border-box;
        text-decoration: none;
        box-shadow: 0 5px 10px rgba(0,0,0,0.3);
        transition: 1s;
        pointer-events: all;
        background-color: white;
        border: 1px solid #cccccc;
    }
    li a:active {
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    }

    li a .fa {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        border-radius: 50%;
        line-height: calc(35px - 12px);
        align-items: center;
        background: linear-gradient(0deg, #fff, #ddd);
    }
    li a img {
        width: 24px;
        height: 24px;
        display: block;
        opacity: 1;
    }
    li a svg {
        width: 24px;
        height: 24px;
        display: block;
    }
    li a img .enable {
        opacity: 0.1
    }
</style>