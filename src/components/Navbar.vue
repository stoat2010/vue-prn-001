<template>
    <div class="navbar">
        <div class="btns">
            <a href="#"><img src='@/assets/icons/refresh-24px.svg'></a>
            <a href="#"><img src='@/assets/icons/add_circle_outline-24px.svg'></a>
            <a href="#"><img src='@/assets/icons/note_add-24px.svg'></a>
            <hr>
            <a href="#"><img src='@/assets/icons/dashboard-24px.svg'></a>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Navbar"
    }
</script>

<style scoped>
    .navbar {
        position: fixed;
        left: 0px;
        top: 0;
        width: 48px;
        height: 100vh;
        background-color: rgb(49,51,53);
        display: flex;
        flex-direction: column;
        justify-content: start;
        vertical-align: top;
    }
    .navbar .btns {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 150px;
        margin-top: 15px;
    }
    .navbar .btns a {
        width: 36px;
        height: 36px;
        background-color:  rgb(49,51,53);
        align-items: center;
    }

    .navbar .btns a img {
        width: 36px;
        height: 36px;
        display: block;
    }
    .navbar .btns hr {
        background-color: white;
        color: white;
        width: 80%;
    }
</style>