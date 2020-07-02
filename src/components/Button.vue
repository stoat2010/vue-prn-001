<template>
    <li><a href="#"><div class="fa"><img :style="style" :src=this.svg></div></a></li>
</template>

<script>
    export default {
        name: "Button",
        props: ["svg", "opacity"],
        computed: {
          style() {
              if (this.opacity) {
                  return 'opacity: ' + 1
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
        background: #f1f1f1;
        display: block;
        text-align: center;
        margin: 0 10px;
        border-radius: 50%;
        padding: 6px;
        box-sizing: border-box;
        text-decoration: none;
        box-shadow: 0 10px 15px rgba(0,0,0,0.3);
        background: linear-gradient(0deg, #ddd, #fff);
        transition: 1s;
        pointer-events: all;
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
    li a .fa img {
        width: 24px;
        height: 24px;
        display: block;
        opacity: 1;
    }
    li a .fa svg {
        width: 24px;
        height: 24px;
        display: block;
    }
    li a .fa img .enable {
        opacity: 0.1
    }
</style>