<template>
    <div class="navbar">
        <div class="btns">
            <a href="#" v-on:click.prevent="fetchDevices()"><img src='@/assets/icons/refresh-24px.svg'></a>
            <a href="#" v-on:click.prevent="toggleBlur(getBlur)"><img src='@/assets/icons/add_circle_outline-24px.svg'></a>
            <a href="#"><img src='@/assets/icons/note_add-24px.svg'></a>
            <hr>
            <a href="#" v-on:click.prevent="toggleDash(getDash)"><img src='@/assets/icons/dashboard-24px.svg'></a>
            <a href="#"><img src='@/assets/icons/equalizer-24px.svg'></a>
            <a href="#"><img src='@/assets/icons/filter_alt-24px.svg'></a>
            <hr>
            <a href="#"><img src='@/assets/icons/settings-24px.svg'></a>

        </div>
    </div>
</template>

<script>

    import {mapActions, mapMutations,mapGetters} from "vuex";

    export default {
        name: "Navbar",
        props: {
            actions: {type: Function}
        },
        methods: {
            ...mapActions(['fetchDevices']),
            ...mapMutations(['toggleBlur', "toggleDash"])
        },
        computed: mapGetters(['getBlur', "getDash"]),
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
        justify-content: start;
        align-items: center;
        height: 150px;

    }
    .navbar .btns a {
        margin-top: 10px;
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