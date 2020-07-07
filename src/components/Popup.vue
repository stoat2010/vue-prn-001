<template>
    <div class="wrap" v-bind:class='{errorbg: this.popup.type}'>
        <div class="popup" v-bind:class='{error: this.popup.type}'>

            <h4>Устройство: {{this.popup.device}}</h4>
            <p>{{this.popup.message}}</p>
            <div class="btn"><a href="#" v-on:click="delPopup(popup.id)" v-bind:class='{error: this.popup.type}'>ОК</a></div>
        </div>
    </div>
</template>

<script>

    import {mapMutations} from 'vuex'

    export default {
        name: "Popup",
        props: ["popup"],
        methods: mapMutations(['delPopup']),
    }
</script>

<style scoped>

    .wrap{
        margin-bottom: 15px;
        width: 385px;
        height: 120px;

        align-items: center;
        border-radius: 5px;
        align-content: center;
        box-shadow: 10px 10px 5px #dddddd;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        background-color: rgb(38,209,152);

    }
    .popup{
        margin-left: 15px;
        width: 370px;
        height: 120px;
        background-color: white;
        align-items: center;
        border-radius: 0 5px 5px 0;
        align-content: center;
        box-shadow: 10px 10px 5px #dddddd;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        color: rgb(38,209,152);
        border: 1px solid rgb(38,209,152);
    }
    .popup .btn {
        width: 370px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
    .popup h4 {
        margin: 2px;
        padding: 0;
    }
    .popup p {
        margin: 2px;
        padding: 0;
    }
    .popup .btn a{
        width: 64px;
        height: 24px;
        background: white;
        display: block;
        text-align: center;
        margin: 0 10px;
        padding: 2px;
        border-radius: 10px;
        box-sizing: border-box;
        vertical-align: middle;
        text-decoration: none;
        pointer-events: all;
        box-shadow: 5px 5px 2px #dddddd;
    }

    .popup .btn a:active{
        box-shadow: 2px 2px 1px #dddddd;
    }
    .error {
        color: rgb(216,77,110);
        border: 1px solid rgb(216,77,110);
    }
    .errorbg {
        background-color: rgb(216,77,110);
    }
</style>